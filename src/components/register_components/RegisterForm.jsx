import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date_picker";

export default function RegisterForm() {
  const onSubmit = async (data) => {};

  return (
    <form>
      <div className="space-y-5 *:*:[.error]:text-sm *:*:[.error]:font-medium *:*:[.error]:text-red-400">
        <div className="flex gap-5 items-start">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input className="" type="text" id="firstName" placeholder="" />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input className="" type="text" id="lastName" placeholder="" />
          </div>
        </div>
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
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            className=""
            type="text"
            id="phoneNumber"
            placeholder="09xxxxxxxx"
          />
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="address">Address</Label>
          <Input className="" type="text" id="address" placeholder="" />
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="birthdate">Birthdate</Label>
          <DatePicker />
        </div>
        <div className="flex gap-5 items-start">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="taskCapacity">Task Capacity</Label>
            <Input
              className=""
              type="number"
              id="taskCapacity"
              placeholder=""
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="availableHours">Available Hours</Label>
            <Input
              className=""
              type="number"
              id="availableHours"
              placeholder=""
            />
          </div>
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="password">Password</Label>
          <Input className="" type="password" id="password" placeholder="" />
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            className=""
            type="password"
            id="confirmPassword"
            placeholder="Enter the same password again"
          />
        </div>
        <div className="flex items-center">
          <Button
            size="default"
            variant="default"
            id="button"
            type="submit"
            className="w-full cursor-pointer"
          >
            Create The Account
          </Button>
        </div>
      </div>
    </form>
  );
}
