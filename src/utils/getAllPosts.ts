import axios from "axios";
import { IPost } from "@/types/post";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const getAllPosts = async (): Promise<IPost[]> => {
  try {
    const response = await axios.get("/posts");
    const apiData = response.data;

    return apiData;

  } catch (e) {
    console.error("Error fetching posts:", e);
    return [];
  }
};
