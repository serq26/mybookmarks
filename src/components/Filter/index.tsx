import { HStack, SegmentGroup } from "@chakra-ui/react";
import { BsBrowserChrome } from "react-icons/bs";
import { FaLinkedin, FaMedium, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export const Filter = () => {
  return (
    <SegmentGroup.Root colorPalette={"purple"}>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items
        items={[
          {
            value: "x",
            label: (
              <HStack>
                <FaSquareXTwitter />X
              </HStack>
            ),
          },
          {
            value: "linkedin",
            label: (
              <HStack>
                <FaLinkedin />
                Linkedin
              </HStack>
            ),
          },
          {
            value: "youtube",
            label: (
              <HStack>
                <FaYoutube />
                Youtube
              </HStack>
            ),
          },
          {
            value: "medium",
            label: (
              <HStack>
                <FaMedium />
                Medium
              </HStack>
            ),
          },
          {
            value: "other",
            label: (
              <HStack>
                <BsBrowserChrome />
                Other
              </HStack>
            ),
          },
        ]}
      />
    </SegmentGroup.Root>
  );
};
