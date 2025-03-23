"use client";

import { useState, useEffect } from "react";
import { CommentCardInput } from "@/src/components/blog/commentCardInput";
import CommentCard from "@/src/components/blog/commentCard";
import { commentsFetch } from "@/src/lib/server-functions/frontend/comments-fetch";
import { ParsedCommentsSchema } from "@/src/schemas/queries/comments";
import { toast } from "sonner";
import { commentInsert } from "@/src/lib/server-functions/backend/comment-insert";

export const CommentComponent = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [comments, setComments] = useState<ParsedCommentsSchema>();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchComments();
    }
  }, []);

  const fetchComments = async () => {
    const result = await commentsFetch(slug);
    setComments(result);
  };

  const handleClick = async () => {
    if (!areaValue.trim) {
      toast.error("Není zadán komentář");
      return;
    }
    if (!slug || !user) {
      toast.error(
        "Chyba při zjištění ID článku nebo nebyl zjištěn přihlášený uživatel, nelze uložit komentář, zkuste znovu načíst stránku.",
      );
      return;
    }
    setLoading(true);
    setDisabled(true);

    const response = await commentInsert(slug, user, areaValue);
    if (!response.ok) {
      toast.error(response.message);
      setLoading(false);
      setDisabled(false);
      return;
    }
    toast.success(response.message);
    setAreaValue("");
    await fetchComments();
    setDisabled(false);
    setLoading(false);
  };
  return (
    <>
      <ul
        aria-label="Article comments"
        role="comments"
        className="flex w-full items-start flex-col justify-start"
      >
        {comments &&
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </ul>
      <CommentCardInput
        setAreaValue={setAreaValue}
        disabled={disabled}
        loading={loading}
        setDisabled={setDisabled}
        setUser={setUser}
        areaValue={areaValue}
        handleClick={handleClick}
      />
    </>
  );
};
