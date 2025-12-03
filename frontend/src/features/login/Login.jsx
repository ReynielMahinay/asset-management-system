import React from "react";
import { FiPackage } from "react-icons/fi";
import LoginForm from "../../components/common/LoginForm";

function Login() {
  return (
    <div className="flex flex-col gap-7 justify-center items-center w-full h-screen">
      <div className="space-y-5">
        <div className="flex flex-row justify-center items-center gap-2 text-midnight ">
          <div className="bg-[#155dfc] text-white p-1.5 rounded-lg">
            <FiPackage size={25} />
          </div>
          <h1 className="font-poppins font-bold text-3xl ">Assetfy</h1>
        </div>
        <p className="text-xs font-poppins  text-gray-600">
          Manage your business assets efficiently
        </p>
      </div>

      <LoginForm />

      <p className="text-[0.6rem]">© 2025 Assetfy. All rights reserved.</p>
    </div>
  );
}

export default Login;
