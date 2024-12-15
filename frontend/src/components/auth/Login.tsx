import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "./AuthLayout";
import { useDispatch } from "react-redux";
import { clearStatus, showStatus } from "../../store/slices/statusSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  useEffect(() => {
    if (loading) {
      dispatch(
        showStatus({
          state: "loading",
          text: "Processing your login request...",
        })
      );
    } else if (error) {
      dispatch(showStatus({ state: "error", text: error }));
    } else {
      dispatch(clearStatus());
    }
  }, [loading, error, dispatch]);

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 overflow-y-hidden"
      >
        <div className="mt-14 h-24">
          <Link to="/">
            <img
              alt="google drive"
              src="https://www.innoscripta.com/innoscripta-logo-dark.svg"
              className="w-mx-auto"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center h-auto mt-24">
          <div className="w-full flex-1">
            <div className="mx-auto max-w-xs">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                disabled={loading}
                className="mt-5 tracking-wide font-semibold bg-red-400 text-white-500 w-full py-4 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-">
                  {loading ? "Signing in..." : "Sign In"}
                </span>
              </button>
              <p className="italic text-sm font-medium mt-2 flex justify-end">
                Not yet a user?{" "}
                <Link className="underline cursor-pointer" to="/register">
                  <span> Register</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;