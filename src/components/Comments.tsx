"use client"

import { IComment } from "@/types/comment";
import { getComments } from "@/utils/getComments";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";
import { addComment } from "@/utils/addComment";
import { updateComment } from "@/utils/updateComment";

export default function Comments({ pid }: { pid: number }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<IComment | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");

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

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const tempId = Date.now();
      const newCommentData: Omit<IComment, "id"> = {
        postId: pid,
        name: "New User",
        body: newComment,
        email: "newuser@example.com",
      };

      try {
        setComments([...comments, { id: tempId, ...newCommentData }]);

        const createdComment = await addComment(newCommentData);

        if (createdComment) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === tempId ? createdComment : comment
            )
          );
        } else {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== tempId)
          );
        }

        setNewComment("");
      } catch (e) {
        console.error("Error adding comment:", e);
      }
    }
  };

  const handleEditComment = (comment: IComment) => {
    setEditingComment(comment);
    setEditedCommentText(comment.body);
  };

  const handleUpdateComment = async () => {
    if (editedCommentText.trim() && editingComment) {
      const updatedComment: IComment = {
        ...editingComment,
        body: editedCommentText,
      };

      try {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editingComment.id ? updatedComment : comment
          )
        );

        const serverUpdatedComment = await updateComment(
          editingComment.id,
          { body: editedCommentText }
        );

        if (serverUpdatedComment) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === editingComment.id ? serverUpdatedComment : comment
            )
          );
        } else {
          console.warn("Update failed on the server, keeping optimistic changes.");
        }

        setEditingComment(null);
        setEditedCommentText("");
      } catch (e) {
        console.error("Error updating comment:", e);
      }
    }
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
              <div key={comment.id} className="flex gap-1 items-start justify-between">
                <div className="flex gap-1">
                  <span className="text-black font-bold">
                    {comment.name.split(" ")[0]}
                  </span>
                  <p className="text-gray-900">{comment.body}</p>
                </div>
                <button
                  onClick={() => handleEditComment(comment)}
                  className="text-gray-600 text-sm pl-1"
                >
                  Edit
                </button>
              </div>
            ))
          )}

          {!editingComment && (
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Add a new comment..."
              />
              <button
                onClick={handleAddComment}
                className="mt-2 bg-black text-white p-2 rounded"
              >
                Add Comment
              </button>
            </div>
          )}

          {editingComment && (
            <div className="mt-4">
              <textarea
                value={editedCommentText}
                onChange={(e) => setEditedCommentText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Edit your comment..."
              />
              <button
                onClick={handleUpdateComment}
                className="mt-2 bg-black text-white p-2 rounded"
              >
                Update Comment
              </button>
              <button
                onClick={() => setEditingComment(null)}
                className="mt-2 ml-2 bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
