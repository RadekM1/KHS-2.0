"use client";

import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { useSession } from "next-auth/react";
import { SpinnerSmallWhite } from "../spinners/spinnerSmallWhite";
import { sendImgToGoogle } from "@/src/lib/server-functions/backend/google-cloud/google-img-transfer";
import { updateAvatarInSql } from "@/src/lib/server-functions/backend/users/avatar-update";
import { toast } from "sonner";
import { shiftCharsBy4 } from "@/src/lib/functions/avatar-name-encrypt";
import { avatarSharpOptim } from "@/src/lib/server-functions/backend/img-optimize/avatar";

export default function AvatarCrop() {
  const [previewImage, setPreviewImage] = useState(
    "https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png",
  );
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<AvatarEditor>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session, update } = useSession();

  interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
      files: FileList;
    };
  }

  const handleImageChange = async (e: FileInputEvent): Promise<void> => {
    setLoading(true);
    const file: File = e.target.files[0];
    const maxFileSize: number = 10 * 1024 * 1024;

    if (file) {
      if (file.size > maxFileSize) {
        toast.error(
          "Velikost souboru je větší než maximální povolená hranice 10 mb",
        );
        setLoading(false);
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSave = async () => {
    if (!session?.user?.email) {
      toast.error("nepodařilo se ověřit uživatele (email)");
      setLoading(false);
      return;
    }
    setLoading(true);

    const canvas = editorRef.current!.getImage();
    const blobAvatarEditor = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob!);
        },
        "image/jpeg",
        0.7,
      );
    });

    const imageFile = new File([blobAvatarEditor], "avatar.jpg", {
      type: "image/jpeg",
    });

    const optimizedResponse = await avatarSharpOptim(imageFile);
    if (!optimizedResponse.ok || !optimizedResponse.file) {
      toast.error("chyba při optimalizaci obrázku");
      setLoading(false);
      return;
    }

    const trimmedEmail = session.user.email;
    const avatarName = shiftCharsBy4(trimmedEmail);
    const fileName = `${avatarName}.jpg`;
    const avatarToSql = `https://storage.googleapis.com/khs-zlin/avatars/${fileName}`;
    const success = await sendImgToGoogle(
      optimizedResponse.file,
      fileName,
      "avatar",
    );
    const userToSql = session?.user.email;

    if (!success.ok) {
      toast.error(success.message);
      setLoading(false);
      return;
    }
    await update({ avatar: avatarToSql });
    const response = await updateAvatarInSql(avatarToSql, userToSql);
    if (!response.ok) {
      setLoading(false);
      toast.error(response.message);
      return;
    }
    toast.success("Avatar aktualizován");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        onClick={handleUploadClick}
        className="mt-4 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 dark:bg-orange-800 dark:hover:bg-orange-900"
      >
        Nahrát Obrázek
      </button>
      <div className="mt-4 w-full max-w-xs">
        <AvatarEditor
          ref={editorRef}
          image={previewImage}
          width={400}
          crossOrigin="anonymous"
          height={400}
          borderRadius={200}
          border={50}
          color={[255, 255, 255, 0.6]}
          scale={scale}
          rotate={0}
          style={{ width: "100%", height: "auto", maxWidth: "100%" }}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="scale" className="mr-2">
          Zoom:
        </label>
        <input
          id="scale"
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
      </div>
      <button
        onClick={handleSave}
        className="mt-4 flex items-center justify-center rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:bg-orange-300 dark:bg-orange-800 dark:hover:bg-orange-900"
        disabled={loading}
      >
        {loading ? <SpinnerSmallWhite /> : "Uložit Avatar"}
      </button>
    </div>
  );
}
