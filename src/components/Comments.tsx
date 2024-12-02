"use client"

import { IComment } from "@/types/comment";
import { getComments } from "@/utils/getComments";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";

export default function Comments({ pid }: { pid: number }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async (postId: number) => {
    setIsLoading(true);
    try {
      const commentsData = await getComments(postId);
      setComments(commentsData);
    } catch (e) {
      console.error("Error fetching comments:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments(pid);
    }
    setShowComments(!showComments);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={toggleComments}
        className="flex gap-1 items-center"
        disabled={isLoading}
      >
        <MessageCircleMore color="black" size={24} />
        <span className="text-black">
          {isLoading
            ? "Loading..."
            : showComments
              ? "Close Comments"
              : "View Comments"}
        </span>
      </button>

      {showComments && (
        <div className="flex flex-col gap-4 border border-black rounded-lg p-4">
          {comments.length === 0 ? (
            <p className="text-gray-900">No comments available.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-1">
                <span className="text-black font-bold">
                  {comment.name.split(" ")[0]}
                </span>
                <p className="text-gray-900">{comment.body}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
