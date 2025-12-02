import React from "react";
import { FiPackage } from "react-icons/fi";
import LoginForm from "../../components/common/LoginForm";

function Login() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full h-screen">
      <div className="flex flex-row justify-center items-center gap-2 text-midnight ">
        <div className="bg-[#3B82F6] text-white p-1.5 rounded-lg">
          <FiPackage size={25} />
        </div>
        <h1 className="font-poppins font-bold text-3xl ">Assetfy</h1>
      </div>
      <p className="text-xs font-dm-sans font-light">
        Manage your business assets efficiently
      </p>

      <LoginForm />

      <p className="text-[0.6rem]">© 2025 Assetfy. All rights reserved.</p>
    </div>
  );
}

export default Login;
