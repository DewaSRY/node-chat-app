import { cn } from "@/lib/utils";
import React, { ComponentProps, PropsWithChildren } from "react";
import { Input } from "@mantine/core";
import useUserStore from "@/zustand/use-user-store";
import FormButtonComponent from "./form-button-component";

interface UserRegisterComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function UserRegisterComponent({
  children,

  ...resProps
}: UserRegisterComponentProps) {
  const { fetchUserRegister, isLoading } = useUserStore();
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    fetchUserRegister({
      username: formData.get("username")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    });
  }
  return (
    <div className="w-full h-full" {...resProps}>
      <h2 className="text-2xl my-10 text-white">Create an Account</h2>
      <form
        onSubmit={handleRegister}
        className={cn(
          "flex flex-col gap-2  text-gray-800 mx-auto",
          "[&>input]:p-2 [&>input]:bg-white/80 [&>input]:outline-none [&>input]:border-none"
        )}
      >
        <label htmlFor="username">
          <span className="text-gray-100">User Name</span>
          <Input
            required
            type="text"
            placeholder="Insert username "
            name="username"
            id="username"
          />
        </label>

        <label htmlFor="email">
          <span className="text-gray-100">Email</span>
          <Input
            required
            type="text"
            placeholder="Inserty Your email"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          <span className="text-gray-100">Password</span>
          <Input
            required
            type="password"
            placeholder="Password shoudl more then 8 character"
            name="password"
            id="password"
            defaultValue=""
            minLength={8}
          />
        </label>

        <FormButtonComponent isSubmited={isLoading}>
          Sing Up
        </FormButtonComponent>
      </form>
    </div>
  );
}
