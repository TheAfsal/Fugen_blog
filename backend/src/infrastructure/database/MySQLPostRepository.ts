import { Pool } from "mysql2/promise";
import { Post } from "../../domain/entities/Post";
import { PostRepository } from "../../domain/interface/PostRepository";
import { BaseMySQLRepository } from "./BaseMySQLRepository";

export class MySQLPostRepository
  extends BaseMySQLRepository<Post, string>
  implements PostRepository
{
  constructor(db: Pool) {
    super(db, "posts");
  }

  async findByAuthorId(authorId: string): Promise<Post[]> {
    const [rows] = await this.db.query(
      `SELECT * FROM posts WHERE authorId = ?`,
      [authorId]
    );
    return rows as Post[];
  }
}
