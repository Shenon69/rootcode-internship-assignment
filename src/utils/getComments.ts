import axios from "axios";
import { IComment } from "@/types/comment";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const getComments = async (id: number): Promise<IComment[]> => {
  try {
    const response = await axios.get(`/posts/${id}/comments`);
    const apiData = response.data;

    return apiData;

  } catch (e) {
    console.error("Error fetching posts:", e);
    return [];
  }
};
