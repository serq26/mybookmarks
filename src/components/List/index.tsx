import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Link,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { getWebsiteIcon } from "../../utils";
import { useBookmarks } from "../../context/BookmarksContext";
import { useEffect, useState } from "react";
import { Bookmark } from "../../types/bookmark";
import { RiArrowRightLine, RiDeleteBinLine } from "react-icons/ri";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";

const List = () => {
  const { bookmarks, loading, filter, deleteBookmark } = useBookmarks();
  const { confirm } = useConfirmDialog();
  const [filteredData, setFilteredData] = useState<Bookmark[]>([]);

  useEffect(() => {
    const newData =
      filter.website === "all"
        ? bookmarks
        : bookmarks.filter((x) => x.website === filter.website);

    setFilteredData(newData?.length > 0 ? newData : bookmarks);
  }, [bookmarks, filter.website]);

  const handleDeleteItem = async (documentId: string) => {
    const confirmed = await confirm({
      title: "Silme işlemi",
      message: "Bu öğeyi silmek istediğinizden emin misiniz?",
    });
    if (confirmed) {
      console.log("Silme işlemi onaylandı.");
      // Silme işlemini yap
    } else {
      console.log("Kullanıcı vazgeçti.");
    }
    console.log("document => ", documentId);
    return;
    await deleteBookmark(documentId);
  };

  if (loading) {
    return (
      <>
        {[1, 2, 3].map((item) => (
          <Card.Root
            key={item}
            className="list_card"
            size="md"
            width="100%"
            mb={4}
          >
            <Card.Header>
              <Flex justify="space-between">
                <Skeleton height="20px" width="60%" />
                <Skeleton boxSize={6} borderRadius="full" />
              </Flex>
            </Card.Header>
            <Card.Body>
              <SkeletonText mt="4" noOfLines={3} />
            </Card.Body>
            <Card.Footer justifyContent="end">
              <Skeleton height="10px" width="30%" />
            </Card.Footer>
          </Card.Root>
        ))}
      </>
    );
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
    </>
  );
};

export default List;
