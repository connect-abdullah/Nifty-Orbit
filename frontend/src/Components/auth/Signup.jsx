import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection after signup
import { registerUser } from "../../apis/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // For navigation

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // console.log("formData", formData);
      const response = await registerUser(formData);
      // console.log("response", response);
      if (response.status === 201) {
        // Store tokens in localStorage (or use context/redux for state management)

        // TODO : TOKEN SHOULD BE SRETURNED FROM THE BACKEND


        // localStorage.setItem("access_token", response?.data?.access);
        // localStorage.setItem("refresh_token", response?.data?.refresh);

        setSuccess(`Signup successful! Welcome, ${response?.data?.first_name}. Redirecting to login...`);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
 
      setTimeout(() => {
            navigate("/"); // Navigates to the root domain
          }, 2000);
      }
    } catch (err) {
      // Handle specific errors from Django SignupSerializer
      if (err.response?.data) {
        const errors = err.response.data;
        if (errors.password) {
          setError(errors.password[0]); // e.g., "Passwords do not match."
        } else if (errors.email) {
          setError(errors.email[0]); // e.g., "Email already exists."
        } else {
          setError("Signup failed. Please check your details.");
        }
      } else {
        setError("An unexpected error occurred. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
 
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-white/20 backdrop-blur-xl backdrop-saturate-150 border border-white/30 shadow-lg p-8 max-w-md w-full rounded-2xl">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Orbit Signup</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            {
              label: "First Name",
              type: "text", 
              name: "first_name",
              placeholder: "Enter your first name"
            },
            {
              label: "Last Name", 
              type: "text",
              name: "last_name",
              placeholder: "Enter your last name"
            },
            {
              label: "Email",
              type: "email",
              name: "email", 
              placeholder: "Enter your email"
            },
            {
              label: "Password",
              type: "password",
              name: "password",
              placeholder: "Enter your password"
            },
            {
              label: "Confirm Password",
              type: "password", 
              name: "confirm_password",
              placeholder: "Confirm your password"
            }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-white">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-purple-600 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={field.placeholder}
                required
                disabled={loading}
              />
            </div>
          ))}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;