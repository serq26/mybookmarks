import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getWebsiteIcon } from "../../utils";
import { useBookmarks } from "../../context/BookmarksContext";
import { useEffect } from "react";
import { RiArrowRightLine, RiDeleteBinLine } from "react-icons/ri";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import { ListSkeleton } from "../Skeletons/ListSkeleton";
import { toaster } from "../ui/toaster";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getItems } from "../../firebaseService";
import { DocumentSnapshot } from "firebase/firestore";

const List = () => {
  const { filter, deleteBookmark, getBookmarks } = useBookmarks();
  const { confirmPopup, ConfirmDialog } = useConfirmDialog();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["items", filter],
    queryFn: ({ pageParam }) =>
      getItems({
        filter,
        lastVisible: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.lastVisible : undefined;
    },
    initialPageParam: null as DocumentSnapshot | null,
  });
  const allItems = data?.pages.flatMap((page) => page.items) || [];

  useEffect(() => {}, [filter.website]);

  const handleDeleteItem = async (documentId: string) => {
    const confirmed = await confirmPopup({
      title: "Delete Bookmark",
      message: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmType: "delete",
    });
    if (confirmed) {
      const response = await deleteBookmark(documentId);
      if (response) {
        getBookmarks();
        toaster.success({
          title: `Bookmark was deleted.`,
          type: "success",
          duration: 5000,
          closable: true,
        });
      } else {
        toaster.error({
          title: `Bookmark cannot delete!`,
          type: "remove",
          duration: 5000,
          closable: true,
        });
      }
    }
  };

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (error) {
    return (
      <Box width={"full"} textAlign="center" mt={8}>
        <Text color="red.500">Error loading items: {error.message}</Text>
      </Box>
    );
  }

  console.log("all => ", allItems);

  return (
    <>
      {allItems.map((item, index) => (
        <Card.Root key={index} className={"list_card"} size="md" width={"100%"}>
          <Card.Header>
            <Flex justify={"space-between"}>
              <Heading size="md">{item.title}</Heading>
              <Link href={item.link} target="_blank" color="white">
                <Icon
                  className="card_icon"
                  as={getWebsiteIcon(item.website)}
                  w={6}
                  h={6}
                />
              </Link>
            </Flex>
          </Card.Header>
          <Card.Body color="fg.muted">{item.description}</Card.Body>
          <Card.Footer
            justifyContent={"space-between"}
            alignItems={"center"}
            color={"gray.500"}
            fontSize={14}
            fontWeight={400}
            xlDown={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            {item.createdAt}
            <Box xlDown={{ display: "flex" }}>
              <Button
                colorPalette={"red"}
                color={"red.400"}
                variant="solid"
                mr={4}
                onClick={() => handleDeleteItem(item.id)}
              >
                <RiDeleteBinLine /> Delete
              </Button>
              <Button colorPalette="teal" variant="outline">
                <Link href={item.link} target="_blank" color={"teal.400"}>
                  Go to Website <RiArrowRightLine />
                </Link>
              </Button>
            </Box>
          </Card.Footer>
        </Card.Root>
      ))}
      {isFetchingNextPage && <Spinner size="xl" mx="auto" my={4} />}
      {hasNextPage && !isFetchingNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          color="teal"
          mt={4}
          mx="auto"
          loading={isFetchingNextPage}
        >
          Load More
        </Button>
      )}
      {!hasNextPage && allItems.length > 0 && (
        <Box
          width={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={4}
        >
          <Image src="/the-end.gif" />
        </Box>
      )}
      {ConfirmDialog}
    </>
  );
};

export default List;
