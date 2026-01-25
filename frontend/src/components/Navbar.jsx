import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, LogOut } from "lucide-react";
import { logoutUser } from "../lib/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();       // backend clears cookie
      navigate("/login");       // redirect
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>

            <button onClick={handleLogout} className="btn btn-outline btn-error">
              <LogOut className="size-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
