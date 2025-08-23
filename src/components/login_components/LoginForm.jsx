import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const onSubmit = async (data) => {};

  return (
    <form>
      <div  className="space-y-5 *:*:[.error]:text-sm *:*:[.error]:font-medium *:*:[.error]:text-red-400">
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            className=""
            type="email"
            id="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="grid w-full items-center gap-1">
          <div className="flex items-end justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              onClick={(event) => {
                event.preventDefault();
              }}
              href="#"
              className="text-sm font-light hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input className="" type="password" id="password" placeholder="" />
        </div>

        <div className="flex items-center">
          <Button
            size="default"
            variant="default"
            id="button"
            type="submit"
            className="w-full cursor-pointer"
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}
