import { Card, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

export const ListSkeleton = () => {
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
};
