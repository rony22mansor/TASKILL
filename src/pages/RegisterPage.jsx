import React from "react";

import RegisterFooter from "@/components/register_components/RegisterFooter";
import RegisterForm from "@/components/register_components/RegisterForm";
import RegisterHeader from "@/components/register_components/RegisterHeader";

export default function RegisterPage() {
  return (
    <div className="bg-muted w-full h-screen grid place-items-center">
      <div className="bg-card w-full flex h-screen">
        <div className=" overflow-y-auto w-full flex justify-center items-start">
          <div className="flex flex-col gap-4 w-3/5 py-12 ">
            <RegisterHeader />
            <RegisterForm />
            <RegisterFooter />
          </div>
        </div>
        <div className="bg-muted  relative hidden w-full md:block">
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
