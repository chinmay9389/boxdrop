"use client";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storgae } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();
  const [
    fileId,
    setFileId,
    fileName,
    setFileName,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isRenameModalOpen,
    setIsRenameModalOpen,
  ] = useAppStore((state) => [
    state.fileId,
    state.setFileId,
    state.fileName,
    state.setFileName,
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
  ]);

  async function deleteFile() {
    if (!user || !fileId) return;
    const toastId = toast.loading("Deleting...");

    const fileRef = ref(storgae, `users/${user.id}/files/${fileId}`);

    try {
      await deleteObject(fileRef)
        .then(async () => {
          console.log("File deleted");
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("delete success");
            toast.success("Deleted successfully", {
              id: toastId,
            });
          });
        })
        .finally(() => setIsDeleteModalOpen(false));
    } catch (error) {
      toast.error("Delete Failed", {
        id: toastId,
      });
      console.log(error);
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete the file?</DialogTitle>
          <DialogDescription>
            Note this change is permanent. Files cannot be recovered
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            className="px-3 flex-1"
            type="submit"
            variant={"destructive"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
