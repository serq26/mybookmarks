import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  useDisclosure,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";
// import { HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  const { open, onToggle } = useDisclosure();

  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex align="center">
        <>
          <Icon as={FaBookmark} w={6} h={6} color="white" mr={2} />
          <Link href={"/"} color="white">
            <Heading size="lg" fontWeight="bold">
              My BookMarks
            </Heading>
          </Link>
        </>
        <Spacer />
        {/* <Flex display={{ base: "none", md: "flex" }} gap={4}>
          <Button variant="solid" colorScheme="whiteAlpha">
            Home
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha">
            About
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha">
            Services
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha">
            Contact
          </Button>
        </Flex> */}
        <Button
          display={{ base: "inline-flex", md: "none" }}
          variant="ghost"
          onClick={onToggle}
          aria-label="Toggle Navigation"
        >
          {/* <HamburgerIcon /> */}
        </Button>
      </Flex>

      {/* Mobile menu */}
      {open && (
        <Box display={{ base: "block", md: "none" }} bg="teal.600" p={4}>
          <Button variant="solid" colorScheme="whiteAlpha" w="full">
            Home
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha" w="full">
            About
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha" w="full">
            Services
          </Button>
          <Button variant="solid" colorScheme="whiteAlpha" w="full">
            Contact
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
