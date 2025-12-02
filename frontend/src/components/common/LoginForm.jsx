import React from "react";
import Button from "./Button";
function LoginForm() {
  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white border border-gray-200  w-[24%] p-8 shadow-lg">
      {/* Welcome header */}
      <div className="flex flex-col gap-2  font-poppins">
        <p className="font-bold text-[1.2rem] capitalize">welcome back</p>
        <p className="font-poppins text-[0.65rem] text-gray-600 ">
          Sign in to your account to continue
        </p>
      </div>

      <div className="w-full">
        <form action="" className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2 w-full">
            <p className="font-dm-sans text-[0.7rem]">Email Address</p>
            <input
              type="text"
              className="rounded-md border border-gray-300 bg-gray-50 w-full p-1"
            />
          </div>
          <div className="w-full">
            <p className="font-dm-sans text-[0.7rem]">Password</p>
            <input
              type="text"
              className="rounded-md border border-gray-300 bg-gray-50 w-full p-1"
            />
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
          <Button title="Sing in" variant="modal_primary" />
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
