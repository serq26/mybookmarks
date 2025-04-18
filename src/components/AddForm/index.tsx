import {
  Button,
  Card,
  Field,
  Flex,
  Icon,
  Input,
  InputGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import { CustomSelect } from "../Select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoLinkOutline } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";
import { useBookmarks } from "../../context/BookmarksContext";

const formSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  link: yup.string().required("Link is required"),
  website: yup.mixed().required("Website is required"),
});

type FormValues = yup.InferType<typeof formSchema>;

export const AddForm = () => {
  const { addBookmark } = useBookmarks();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const result = await addBookmark(
      data.title,
      data.description,
      data.link,
      data.website as string
    );
    if (result.id) {
      setLoading(false);
      reset();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Card.Root maxW="sm" my={10}>
        <Card.Header>
          <Card.Title>
            <Flex align="center">
              <Icon as={FaPlusCircle} w={6} h={6} color="white" mr={2} />
              Add BookMark
            </Flex>
          </Card.Title>
          <Card.Description>
            Fill in the form below to create an bookmark
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root invalid={!!errors.title}>
              <Field.Label>Title</Field.Label>
              <Controller
                name="title"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                    placeholder="Enter title"
                  />
                )}
              />
              <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.description}>
              <Field.Label>Description</Field.Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                    placeholder="Enter description"
                  />
                )}
              />
              <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.link}>
              <Field.Label>Link</Field.Label>
              <Controller
                name="link"
                control={control}
                render={({ field }) => (
                  <InputGroup
                    startElement={
                      <Icon as={IoLinkOutline} w={6} h={6} color="gray" />
                    }
                  >
                    <Input {...field} placeholder="Enter link" />
                  </InputGroup>
                )}
              />
              <Field.ErrorText>{errors.link?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.website}>
              <Controller
                name="website"
                control={control}
                render={({ field }) => <CustomSelect {...field} />}
              />
              <Field.ErrorText>{errors.website?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="center">
          <Stack w="1/2">
            <Button
              type="submit"
              size={"lg"}
              variant="surface"
              colorPalette={"green"}
              loading={loading}
              loadingText="Saving..."
            >
              <MdBookmarkAdd />
              Add
            </Button>
          </Stack>
        </Card.Footer>
      </Card.Root>
    </form>
  );
};
