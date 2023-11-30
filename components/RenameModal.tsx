"use client";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

const RenameModal = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
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

  const renameFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading("Renaming...");
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      fileName: input,
    });
    toast.success("Renamed successfully", { id: toastId });
    setInput("");
    setIsRenameModalOpen(false);
  };
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename File</DialogTitle>
          <Input
            id="link"
            defaultValue={fileName}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />

          <div className="flex justify-end space-x-2 py-3">
            <Button
              size="sm"
              className="px-3"
              variant={"ghost"}
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              size="sm"
              className="px-3"
              type="submit"
              onClick={() => renameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
