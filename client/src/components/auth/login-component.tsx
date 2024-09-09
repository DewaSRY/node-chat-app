import { cn } from "@/lib/utils";
import React, { ComponentProps, PropsWithChildren } from "react";
import useUserStore from "@/zustand/use-user-store";
import FormButtonComponent from "./form-button-component";
import { Input } from "@mantine/core";
interface UserLoginComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {}

export default function UserLoginComponent({
  ...resProps
}: UserLoginComponentProps) {
  const { fetchUserLogin, isLoading } = useUserStore();
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    fetchUserLogin({
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    });
  }

  return (
    <div className="w-full h-full " {...resProps}>
      <h2 className="text-2xl my-10 text-white">Welcome back,</h2>
      <form
        onSubmit={handleLogin}
        className={cn(
          "flex flex-col gap-2  text-gray-800",
          "[&>input]:p-2 [&>input]:bg-white/80 [&>input]:outline-none [&>input]:border-none"
        )}
      >
        <label htmlFor="email-login">
          <span className="text-gray-100">Email</span>
          <Input
            required
            type="email"
            placeholder="Insert Email"
            name="email"
            id="email-login"
          />
        </label>
        <label htmlFor="password-login">
          <span className="text-gray-100">Password</span>
          <Input
            required
            type="password"
            placeholder="Password must be 8 character"
            name="password"
            id="password-login"
            minLength={8}
          />
        </label>

        <FormButtonComponent isSubmited={isLoading}>Login</FormButtonComponent>
      </form>
    </div>
  );
}
