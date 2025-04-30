import {
  Box,
  Collapsible,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import Header from "./components/Header";
import { AddForm } from "./components/AddForm";
import { Filter } from "./components/Filter";
import List from "./components/List";
import { BookmarksProvider } from "./context/BookmarksContext";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FaPlusCircle } from "react-icons/fa";

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
          <Flex gap="4" direction="column" alignItems="start" padding={"20px"}>
            <Flex
              justify={"space-between"}
              align={"center"}
              w="full"
              xlDown={{ display: "block", overflow: "scroll" }}
            >
              <Text mr={4} fontWeight={"bold"}>
                Filter:
              </Text>
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
          <Collapsible.Root
            mt={5}
            display={{ base: "block", md: "none" }}
            unmountOnExit
          >
            <Collapsible.Trigger paddingY="3" width={"full"}>
              <Icon as={FaPlusCircle} w={6} h={6} color="white" mr={2} /> Add
              Bookmark
            </Collapsible.Trigger>
            <Collapsible.Content>
              <AddForm />
            </Collapsible.Content>
          </Collapsible.Root>
          <Box lgDown={{ display: "none" }}>
            <AddForm />
          </Box>
        </GridItem>
      </Grid>
      <Toaster />
    </BookmarksProvider>
  );
}

export default App;
