import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { registerUser } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-content/10">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-primary text-center font-mono">
            ThinkBoard
          </h2>
          <p className="text-center text-base-content/70">
            Create your account to get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Name */}
            <label className="input input-bordered flex items-center gap-2">
              <User className="size-4 text-primary" />
              <input
                type="text"
                className="grow"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
