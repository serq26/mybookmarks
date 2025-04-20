import { useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";

interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  confirmType?: "confirm" | "delete";
}

export function useConfirmDialog() {
  const { open, onOpen, onClose } = useDisclosure();
  const [resolvePromise, setResolvePromise] = useState<
    (value: boolean) => void
  >(() => () => {});
  const [dialogOptions, setDialogOptions] = useState<ConfirmDialogOptions>({
    message: "Are you sure you want to perform this action?",
    cancelText: "Cancel",
    confirmText: "Okay",
  });
  const cancelRef = useRef<HTMLButtonElement>(null);

  const confirmPopup = (options: ConfirmDialogOptions) => {
    setDialogOptions(options);
    onOpen();

    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolvePromise(true);
    onClose();
  };

  const handleCancel = () => {
    resolvePromise(false);
    onClose();
  };

  const ConfirmDialog = (
    <Dialog.Root role="alertdialog" open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner xlDown={{ padding: "0 20px" }}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{dialogOptions.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{dialogOptions.message}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  ref={cancelRef}
                  onClick={handleCancel}
                >
                  {dialogOptions.cancelText}
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bgColor={
                  dialogOptions.confirmType === "delete" ? "red" : "green"
                }
                color="white"
                variant="solid"
                onClick={handleConfirm}
                ml={3}
              >
                {dialogOptions.confirmText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={handleCancel} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );

  return { confirmPopup, ConfirmDialog };
}
