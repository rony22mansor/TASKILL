import React from "react";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators"; // Adjust import path
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/authApi"; // Adjust import path
import { toast } from "react-toastify"; // <-- Import toast

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 2. TanStack Query Mutation (remains the same)
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log("data ==> ", data);
      localStorage.setItem("authToken", data.access_token);

      // Optionally, save user info too
      localStorage.setItem("user", JSON.stringify(data.employee));
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.detail || error.message;
      toast.error(errorMessage);
    },
  });

  // 3. Handle form submission
  const onSubmit = (data) => {
    // 'data' is the validated form values
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 *:*:[.error]:text-sm *:*:[.error]:font-medium *:*:[.error]:text-red-400">
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            className=""
            type="email"
            id="email"
            {...register("email")} // Register the input
            disabled={mutation.isPending}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-sm font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            className=""
            type="password"
            id="password"
            placeholder=""
            {...register("password")} // Register the input
            disabled={mutation.isPending}
          />{" "}
          {errors.password && (
            <p className="text-sm font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <Button
            size="default"
            variant="default"
            id="button"
            type="submit"
            disabled={mutation.isPending}
            className="w-full cursor-pointer"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
    </form>
  );
}
