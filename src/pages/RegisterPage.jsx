import React from "react";

import RegisterFooter from "@/components/register_components/RegisterFooter";
import RegisterForm from "@/components/register_components/RegisterForm";
import RegisterHeader from "@/components/register_components/RegisterHeader";
import ImageSlider from "@/components/ImageSlider";

export default function RegisterPage() {
  return (
    <div className="bg-muted w-full h-screen grid place-items-center">
      <div className="bg-background w-full flex h-screen">
        <div className=" overflow-y-auto w-full flex justify-center items-start">
          <div className="flex flex-col gap-4 w-3/5 py-12 ">
            <RegisterHeader />
            <RegisterForm />
            <RegisterFooter />
          </div>
        </div>
        <div className=" bg-muted rounded-4xl m-6 relative hidden w-full md:block">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
}
