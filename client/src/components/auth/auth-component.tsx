import { ComponentProps, PropsWithChildren } from "react";

import { Tabs } from "@mantine/core";

import UserLoginComponent from "./login-component";
import UserRegisterComponent from "./register-component";

interface AuthComponentProps extends ComponentProps<"div">, PropsWithChildren {}

export default function AuthComponent({
  children,
  ...resProps
}: AuthComponentProps) {
  return (
    <div {...resProps} className="w-screen h-screen py-[8vh] ">
      <Tabs defaultValue="login" className="max-w-[800px] mx-auto">
        <Tabs.List>
          <Tabs.Tab value="login">Login</Tabs.Tab>
          <Tabs.Tab value="register">Register</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="login">
          <UserLoginComponent />
        </Tabs.Panel>
        <Tabs.Panel value="register">
          <UserRegisterComponent />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
