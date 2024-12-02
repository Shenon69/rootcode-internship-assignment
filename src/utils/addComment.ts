import axios from "axios";
import { IComment } from "@/types/comment";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const addComment = async (
  commentData: Omit<IComment, "id">
): Promise<IComment | null> => {
  try {
    const response = await axios.post("/comments", commentData);
    return response.data;
  } catch (e) {
    console.error("Error adding comment:", e);
    return null;
  }
};
