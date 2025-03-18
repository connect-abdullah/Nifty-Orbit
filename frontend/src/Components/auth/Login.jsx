import  { useState } from "react";
import { loginUser } from "../../apis/api";
import { useNavigate } from "react-router-dom"; // For redirection after login

const Login = () => {
  console.log("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      
      console.log(email, password);
      const response = await loginUser(email, password);
      console.log(response);

      if (response.status === 201) {
        // Store tokens in localStorage
        localStorage.setItem("access_token", response?.data?.access_token);
        // TODO: refresh token is required from the server
        localStorage.setItem("refresh_token", response?.data?.access_token);

        setSuccess(`Login Successful! Welcome back, ${response?.data?.user?.first_name || "there"}. Redirecting...`);
        console.log("Login Successful", response?.data);

        // Redirect to homepage after a delay
        setTimeout(() => {
          navigate("/"); // Navigates to the root domain
        }, 2000);
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error); // "Invalid credentials" from Django
      } else if (err.response) {
        setError(`Login failed: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        setError("Network error: Unable to connect to the server.");
      } else {
        setError("An unexpected error occurred. Try again.");
      }
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-white/20 backdrop-blur-xl backdrop-saturate-150 border border-white/30 shadow-lg p-8 max-w-md w-full rounded-2xl">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Orbit Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

       <a href="/">  
         <button
            type="submit"
            className={`w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          </a>
          <p className="text-center text-white">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline hover:text-purple-300">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
