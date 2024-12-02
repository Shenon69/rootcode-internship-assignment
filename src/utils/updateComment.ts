import axios from "axios";
import { IComment } from "@/types/comment";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const updateComment = async (
  commentId: number,
  updatedData: Partial<IComment>
): Promise<IComment | null> => {
  try {
    const response = await axios.put(`/comments/${commentId}`, updatedData);
    return response.data;
  } catch (e) {
    console.error("Error updating comment:", e);
    return null;
  }
};
