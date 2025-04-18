import { HStack, SegmentGroup } from "@chakra-ui/react";
import { BsBrowserChrome } from "react-icons/bs";
import { FaLinkedin, FaMedium, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdClearAll } from "react-icons/md";
import { useBookmarks } from "../../context/BookmarksContext";

export const Filter = () => {
  const { filterBookmarks } = useBookmarks();

  return (
    <SegmentGroup.Root
      defaultValue={"all"}
      onValueChange={(e) => filterBookmarks("website", e.value as string)}
    >
      <SegmentGroup.Indicator style={{ background: "green" }} />
      <SegmentGroup.Items
        items={[
          {
            value: "all",
            label: (
              <HStack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <MdClearAll />
                All
              </HStack>
            ),
          },
          {
            value: "website_x",
            label: (
              <HStack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FaSquareXTwitter />X
              </HStack>
            ),
          },
          {
            value: "website_linkedin",
            label: (
              <HStack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FaLinkedin />
                Linkedin
              </HStack>
            ),
          },
          {
            value: "website_youtube",
            label: (
              <HStack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FaYoutube />
                Youtube
              </HStack>
            ),
          },
          {
            value: "website_medium",
            label: (
              <HStack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FaMedium />
                Medium
              </HStack>
            ),
          },
          {
            value: "website_other",
            label: (
              <HStack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
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
