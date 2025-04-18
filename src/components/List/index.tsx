import { Box, Button, Card, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { getWebsiteIcon } from "../../utils";
import { useBookmarks } from "../../context/BookmarksContext";
import { useEffect, useState } from "react";
import { Bookmark } from "../../types/bookmark";
import { RiArrowRightLine, RiDeleteBinLine } from "react-icons/ri";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import { ListSkeleton } from "../Skeletons/ListSkeleton";
import { toaster } from "../ui/toaster";

const List = () => {
  const { bookmarks, loading, filter, deleteBookmark, getBookmarks } =
    useBookmarks();
  const { confirmPopup, ConfirmDialog } = useConfirmDialog();
  const [filteredData, setFilteredData] = useState<Bookmark[]>([]);

  useEffect(() => {
    const newData =
      filter.website === "all"
        ? bookmarks
        : bookmarks.filter((x) => x.website === filter.website);

    setFilteredData(newData?.length > 0 ? newData : bookmarks);
  }, [bookmarks, filter.website]);

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

  if (loading) {
    return <ListSkeleton />;
  }

  return (
    <>
      {filteredData.map((item, index) => (
        <Card.Root key={index} className={"list_card"} size="md" width={"100%"}>
          <Card.Header>
            <Flex justify={"space-between"}>
              <Heading size="md">{item.title}</Heading>
              <Icon
                className="card_icon"
                as={getWebsiteIcon(item.website)}
                w={6}
                h={6}
              />
            </Flex>
          </Card.Header>
          <Card.Body color="fg.muted">{item.description}</Card.Body>
          <Card.Footer
            justifyContent={"space-between"}
            alignItems={"center"}
            color={"gray.500"}
            fontSize={14}
            fontWeight={400}
          >
            {item.createdAt}
            <Box>
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
      {ConfirmDialog}
    </>
  );
};

export default List;
