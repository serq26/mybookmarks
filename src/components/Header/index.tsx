import { Box, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";

const Header = () => {
  return (
    <Box
      style={{
        backgroundColor: "#14B8A6",
        background:
          "linear-gradient(90deg,rgba(20, 184, 166, 1) 0%, rgba(46, 143, 131, 1) 50%, rgba(51, 140, 129, 1) 52%, rgba(2, 161, 142, 1) 100%)",
      }}
      color="white"
      p={4}
    >
      <Flex align="center">
        <>
          <Icon as={FaBookmark} w={6} h={6} color="white" mr={2} />
          <Link href={"/"} color="white">
            <Heading size="lg" fontWeight="bold">
              My BookMarks
            </Heading>
          </Link>
        </>
      </Flex>
    </Box>
  );
};

export default Header;
