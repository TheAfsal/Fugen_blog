import { Pool } from "mysql2/promise";
import { BaseRepository } from "../../domain/interface/BaseRepository";

export abstract class BaseMySQLRepository<T, ID>
  implements BaseRepository<T, ID>
{
  constructor(protected db: Pool, protected tableName: string) {}

  async create(entity: T): Promise<T> {
    const [result] = await this.db.query(
      `INSERT INTO ${this.tableName} SET ?`,
      entity
    );
    return { ...entity, id: (result as any).insertId };
  }

  async findById(id: ID): Promise<T | null> {
    const [rows] = await this.db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return (rows as T[])[0] || null;
  }

  async findAll(): Promise<T[]> {
    const [rows] = await this.db.query(`SELECT * FROM ${this.tableName}`);
    return rows as T[];
  }

  async update(id: ID, entity: Partial<T>): Promise<T> {
    await this.db.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [
      entity,
      id,
    ]);
    return this.findById(id) as Promise<T>;
  }

  async delete(id: ID): Promise<void> {
    await this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}
