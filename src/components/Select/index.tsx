"use client";

import {
  HStack,
  Icon,
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react";
import React from "react";
import { BsBrowserChrome } from "react-icons/bs";
import { FaLinkedin, FaMedium, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<{
    name: string;
    icon: React.ReactNode;
  }>;
  const { name, icon } =
    items.length > 0 ? items[0] : { name: "Select website", icon: null };
  return (
    <Select.ValueText placeholder="Select website">
      <HStack>
        {icon}
        {name}
      </HStack>
    </Select.ValueText>
  );
};

export const CustomSelect = ({ ...props }) => {
  return (
    <Select.Root
      collection={websites}
      size="lg"
      positioning={{ sameWidth: true }}
      onValueChange={(e) => props.onChange(e.value[0])}
      onInteractOutside={props.onBlur}
    >
      <Select.HiddenSelect />
      <Select.Label>Website</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {websites.items.map((item) => (
            <Select.Item item={item} key={item.id} justifyContent="flex-start">
              {item.icon}
              {item.name}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};

const websites = createListCollection({
  items: [
    {
      name: "X",
      id: "website_x",
      icon: <Icon as={FaSquareXTwitter} w={6} h={6} />,
    },
    {
      name: "Linkedin",
      id: "website_linkedin",
      icon: <Icon as={FaLinkedin} w={6} h={6} />,
    },
    {
      name: "Youtube",
      id: "website_youtube",
      icon: <Icon as={FaYoutube} w={6} h={6} />,
    },
    {
      name: "Medium",
      id: "website_medium",
      icon: <Icon as={FaMedium} w={6} h={6} />,
    },
    {
      name: "Other",
      id: "website_other",
      icon: <Icon as={BsBrowserChrome} w={6} h={6} />,
    },
  ],
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
});
