"use client";
import { db, storgae } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import DropZoneComponent from "react-dropzone";
import toast from "react-hot-toast";

const Dropzone = () => {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const maxSize = 20971520;

  const onDrop = (acceptedFile: File[]) => {
    acceptedFile.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading aborted");
      reader.onerror = () => console.log("file read error");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);
    // console.log(selectedFile);
    const toastId = toast.loading("Uploading...");

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fileName: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });
    console.log(docRef);

    const imageRef = ref(storgae, `users/${user.id}/files/${docRef.id}`);

    try {
      await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
          downloadUrl: downloadUrl,
        });
      });

      toast.success("Uploaded successfully", {
        id: toastId,
      });
      setLoading(false);
    } catch (error) {
      toast.error("Upload failed");
      console.log(error);
    }
  };

  return (
    <DropZoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file"}
              {isDragReject && "File type not supported, Sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large!</div>
              )}
            </div>
          </section>
        );
      }}
    </DropZoneComponent>
  );
};

export default Dropzone;
