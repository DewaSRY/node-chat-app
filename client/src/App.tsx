import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AuthComponent from "./components/auth/auth-component";
import NotificationComponent from "./components/notifications/notification-component";
import useUserStore from "./zustand/use-user-store";
// import TextFormComponent from "./components/chat/text-form-component";
import ChatComponent from "./components/chat/chat-component";
import { useEffect } from "react";
function MainApp() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <AppShell.Navbar p="md"></AppShell.Navbar>
      <AppShell.Main>
        <ChatComponent />
      </AppShell.Main>
    </AppShell>
  );
}
function App() {
  const { user, fetchSigin } = useUserStore();

  useEffect(() => {
    fetchSigin();
  }, []);

  return (
    <>
      {user ? <MainApp /> : <AuthComponent />}
      <NotificationComponent />
    </>
  );
}

export default App;
