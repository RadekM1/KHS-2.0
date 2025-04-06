"use client";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Delta from "quill-delta";
import { toast } from "sonner";

interface ArticleSimpleEditorProps {
  editorContent: string;
  setEditorContent: (content: string) => void;
  setTextFromEditor: (text: string) => void;
}

export const ArticleSimpleEditor = ({
  editorContent,
  setEditorContent,
  setTextFromEditor,
}: ArticleSimpleEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "code-block",
    "list",
    "link",
  ];

  const { quill, quillRef } = useQuill({ modules, formats });

  useEffect(() => {
    if (quill && editorContent !== undefined) {
      const currentContents = quill.root.innerHTML;
      if (currentContents !== editorContent) {
        quill.clipboard.dangerouslyPasteHTML(editorContent);
      }
    }
  }, [quill, editorContent]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const newContent = quill.root.innerHTML;
        const newPlainText = quill.getText();
        setEditorContent(newContent);
        setTextFromEditor(newPlainText);
      });

      quill.clipboard.addMatcher("IMG", () => {
        toast.error(
          "Vkládání obrázků do textu není povoleno, nahrajte prosím fotky jako přílohy fotogalerie",
        );
        return new Delta();
      });

      quill.clipboard.addMatcher("VIDEO", () => {
        toast.error(
          "Vkládání videí do textu není povoleno, pouze odkaz na videa (např youtube)",
        );
        return new Delta();
      });
    }
  }, [quill, setEditorContent]);

  useEffect(() => {
    if (quill) {
      quill.setContents([]);
    }
  }, [quill]);

  return (
    <div className="w-full py-10 min-h-64  dark:text-white">
      <div className="dark:text-white" ref={quillRef} />
    </div>
  );
};
