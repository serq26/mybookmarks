import { Card, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FirebaseItem, getItems } from "../../firebaseService";
import { getWebsiteIcon } from "../../utils";

const List = () => {
  const [items, setItems] = useState<FirebaseItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("An error occurred while retrieving data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {items.map((item, index) => (
        <Link key={index} href={item.link} width={"100%"} target="_blank">
          <Card.Root className={"list_card"} size="md" width={"100%"}>
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
              justifyContent={"end"}
              color={"gray.500"}
              fontSize={14}
              fontWeight={400}
            >
              {item.createdAt}
            </Card.Footer>
          </Card.Root>
        </Link>
      ))}
    </>
  );
};

export default List;
