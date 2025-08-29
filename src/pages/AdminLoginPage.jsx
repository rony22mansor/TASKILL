import React from "react";
import LoginFooter from "@/components/admin_login_components/LoginFooter";
import LoginForm from "@/components/admin_login_components/LoginForm";
import LoginHeader from "@/components/admin_login_components/LoginHeader";

export default function AdminLoginPage() {
  return (
    <div className="bg-background h-screen grid place-items-center">
      <div className=" flex flex-col w-1/2 justify-center items-center">
        <div className="flex flex-col gap-4 w-3/5 ">
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}
