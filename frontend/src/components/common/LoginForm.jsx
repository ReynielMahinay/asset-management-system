import React, { useState } from "react";
import Button from "./Button";
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { loginUser, fetchProfile } from "../../api/accounts";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Step 2: Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { ok, data } = await loginUser(username, password);

    if (!ok) {
      alert(data?.message || "Login failed");
      return;
    }

    setToken(data.token);
    alert("Login successful!");

    const profile = await fetchProfile(data.token);
    console.log("Protected /me response:", profile);
  };

  return (
    <div className="flex flex-col gap-7 rounded-xl bg-white border border-gray-200  w-[410px] p-8 shadow-lg ">
      {/* Welcome header */}
      <div className="flex flex-col gap-2  font-poppins">
        <p className="font-bold text-[1.4rem] capitalize">welcome back</p>
        <p className="text-[0.7rem] text-gray-600 ">
          Sign in to your account to continue
        </p>
      </div>

      <div className="w-full">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 ">
          {/* Email addresss input field */}
          <div className="flex flex-col space-y-1 w-full">
            <label
              htmlFor="email"
              className="block font-poppins text-[0.7rem] text-gray-700 font-medium"
            >
              Email Address
            </label>
            <div className="relative">
              <MdOutlineMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="email"
                type="text"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-md border bg-gray-50 text-sm border-gray-300 text-gray-900 placeholder-gray-400  focus:ring-blue-600 focus:outline-none focus:ring-1 pl-9 h-10 w-full"
              />
            </div>
          </div>

          {/* password input field */}
          <div className="flex flex-col space-y-1 w-full">
            <label
              htmlFor="password"
              className="block font-poppins text-[0.7rem] text-gray-700 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-gray-300 bg-gray-50 w-full pl-9 h-10 text-sm text-gray-900 placeholder-gray-400
                focus:ring-blue-600 focus:outline-none focus:ring-1 "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-center items-center gap-1">
              <input type="checkbox" />
              <p className="font-dm-sans normal-case text-[0.7rem]">
                Remember me
              </p>
            </div>

            <a
              href=""
              className="text-blue-600 font-dm-sans capitalize text-[0.7rem]"
            >
              forgot password?
            </a>
          </div>
          <button type="submit">Login</button>
          {/* <Button title="Sign in" variant="modal_primary" className="h-50" /> */}
        </form>

        {/* Diveder for signup/singin options */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-600 font-poppins text-[0.7rem]">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="flex flex-row w-full gap-2">
            <Button title="Google" variant="login_options" />
            <Button title="Github" variant="login_options" />
          </div>

          <p className="font-poppins text-[0.65rem] text-center text-gray-600">
            Don't have an account?
            <span> </span>
            <a href="" className="text-blue-600 font-bold">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
