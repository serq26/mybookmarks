import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import { AddForm } from "./components/AddForm";
import { Filter } from "./components/Filter";
import List from "./components/List";
import { BookmarksProvider } from "./context/BookmarksContext";

function App() {
  return (
    <BookmarksProvider>
      <Header />
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        <GridItem colSpan={2}>
          <Flex gap="4" direction="column" alignItems="start" p={10}>
            <Flex justify={"space-between"} align={"center"} w="full">
              <Text>Filter: </Text>
              <Filter />
            </Flex>
            <List />
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <AddForm />
        </GridItem>
      </Grid>
    </BookmarksProvider>
  );
}

export default App;
