import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AuthComponent from "./components/auth/auth-component";
import NotificationComponent from "./components/notifications/notification-component";
import useUserStore from "./zustand/use-user-store";
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
      <AppShell.Main></AppShell.Main>
    </AppShell>
  );
}
function App() {
  const { user } = useUserStore();

  return (
    <>
      {user ? <MainApp /> : <AuthComponent />}

      <NotificationComponent />
    </>
  );
}

export default App;
