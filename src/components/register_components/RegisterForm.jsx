import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date_picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // <-- Import toast

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("data ==> ", data);
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => {
      console.log("error ==> ", error);
      const errorMessage =
        error.response?.data?.message || "Registration failed.";
      toast.error(errorMessage);
    },
  });

  // --- This is the key change ---
  const onSubmit = (data) => {
    // Create the data object that the API expects
    const apiData = {
      ...data, // Copy all validated fields (email, password, etc.)
      name: `${data.firstName} ${data.lastName}`, // Combine the names
      birth_date: data.birth_date.toISOString().split("T")[0], // Format the date
    };

    // Remove fields that the API doesn't need
    delete apiData.firstName;
    delete apiData.lastName;
    delete apiData.confirmPassword;

    // Call the mutation with the transformed data
    mutation.mutate(apiData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 *:*:[.error]:text-sm *:*:[.error]:font-medium *:*:[.error]:text-red-400">
        <div className="flex gap-5 items-start">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              className=""
              type="text"
              id="firstName"
              placeholder=""
              {...register("firstName")} // Register the input
              disabled={mutation.isPending}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              className=""
              type="text"
              id="lastName"
              placeholder=""
              {...register("lastName")} // Register the input
              disabled={mutation.isPending}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")} // Register the input
            disabled={mutation.isPending}
            className=""
            type="email"
            id="email"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            {...register("phone_number")} // Register the input
            disabled={mutation.isPending}
            className=""
            type="text"
            id="phoneNumber"
            placeholder="09xxxxxxxx"
          />
          {errors.phone_number && (
            <p className="text-sm text-red-500">
              {errors.phone_number.message}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="address">Address</Label>
          <Input
            {...register("address")} // Register the input
            disabled={mutation.isPending}
            className=""
            type="text"
            id="address"
            placeholder=""
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="birthdate">Birthdate</Label>
          <Controller
            name="birth_date"
            control={control}
            render={({ field }) => (
              <DatePicker value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.birth_date && (
            <p className="text-sm text-red-500">{errors.birth_date.message}</p>
          )}
        </div>
        <div className="flex gap-5 items-start">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="task_capacity">Task Capacity</Label>
            <Input
              {...register("task_capacity")} // Register the input
              disabled={mutation.isPending}
              className=""
              type="number"
              id="task_capacity"
              placeholder=""
            />
            {errors.task_capacity && (
              <p className="text-sm text-red-500">
                {errors.task_capacity.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="availableHours">Available Hours</Label>
            <Input
              {...register("available_hours")} // Register the input
              disabled={mutation.isPending}
              className=""
              type="number"
              id="availableHours"
              placeholder=""
            />
            {errors.available_hours && (
              <p className="text-sm text-red-500">
                {errors.available_hours.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")} // Register the input
            disabled={mutation.isPending}
            className=""
            type="password"
            id="password"
            placeholder=""
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...register("confirmPassword")} // Register the input
            disabled={mutation.isPending}
            className=""
            type="password"
            id="confirmPassword"
            placeholder="Enter the same password again"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
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
            {mutation.isPending ? "Please Wait..." : "Create Your Account"}
          </Button>
        </div>
      </div>
    </form>
  );
}
