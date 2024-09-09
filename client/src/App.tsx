import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
function App() {
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

export default App;
