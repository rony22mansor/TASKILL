import React from "react";
import LoginFooter from "@/components/login_components/LoginFooter";
import LoginForm from "@/components/login_components/LoginForm";
import LoginHeader from "@/components/login_components/LoginHeader";

export default function LoginPage() {
  return (
    <div className="bg-muted h-screen grid place-items-center">
      <div className="bg-card flex w-full h-full">
        <div className=" flex flex-col w-full justify-center items-center">
          <div className="flex flex-col gap-4 w-3/5 ">
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
          </div>
        </div>
        <div className="bg-muted relative hidden w-full p-10 md:block">
          <img
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            src="/placeholder.svg"
            alt=" "
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
