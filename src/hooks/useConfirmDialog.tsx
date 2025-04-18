import { useRef, useState } from "react";
import { Button, CloseButton, Dialog, Portal, useDisclosure } from "@chakra-ui/react";

export function useConfirmDialog() {
    const { open, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => () => { });
    const [dialogOptions, setDialogOptions] = useState<{ title?: string; message?: string }>({});

    const confirm = (options: { title?: string; message?: string }) => {
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
        <Dialog.Root role="alertdialog" 
            open={open}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Open Dialog
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{dialogOptions.title || "Onay"}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                {dialogOptions.message || "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?"}
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" ref={cancelRef} onClick={handleCancel}>Vazgeç</Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="green" onClick={handleConfirm} ml={3}>Onayla</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );

    return { confirm, ConfirmDialog };
}
