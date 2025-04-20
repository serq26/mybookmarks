import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import { AddForm } from "./components/AddForm";
import { Filter } from "./components/Filter";
import List from "./components/List";
import { BookmarksProvider } from "./context/BookmarksContext";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <BookmarksProvider>
      <Header />
      <Grid
        gridTemplateColumns={{
          base: "repeat(3, 1fr)",
          xlDown: "repeat(1, 1fr)",
        }}
        gap={{
          base: 6,
          xlDown: 0,
        }}
      >
        <GridItem colSpan={2} order={{ base: 1, xlDown: 2 }}>
          <Flex gap="4" direction="column" alignItems="start" p={10}>
            <Flex
              justify={"flex-end"}
              align={"center"}
              w="full"
              xlDown={{ display: "block", overflow: "scroll" }}
            >
              <Filter />
            </Flex>
            <QueryClientProvider client={queryClient}>
              <List />
            </QueryClientProvider>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          order={{ base: 2, xlDown: 1 }}
          xlDown={{ display: "flex", justifyContent: "center" }}
        >
          <AddForm />
        </GridItem>
      </Grid>
      <Toaster />
    </BookmarksProvider>
  );
}

export default App;
