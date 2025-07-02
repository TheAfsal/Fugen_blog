import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/user.api";
import { setCredentials } from "../store/slices/authSlice";
import { AxiosError } from "axios";
import {
  AuthenticateFormData,
  AuthenticateSchema,
} from "@/types/schema/AuthenticateSchema";
import { Button } from "./ui/button";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: AuthenticateFormData = { email, password };
      const result = AuthenticateSchema.safeParse(data);
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      const { user } = await registerUser(email, password);
      dispatch(setCredentials({ user }));
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30 p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <Button className="w-full" onClick={handleSubmit}>
          <Link to="/login">Register</Link>
        </Button>
      </form>
    </div>
  );
};
