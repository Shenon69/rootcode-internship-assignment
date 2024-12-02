import axios from "axios";
import { IProfile } from "@/types/profile";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL!;
axios.defaults.baseURL = BASE_URL;

export const getUserDetails = async (): Promise<IProfile | null> => {
  try {
    const response = await axios.get('/users/1');
    const apiData = response.data;

    return apiData;
  } catch (e) {
    console.error("Error fetching user data:", e);
    return null;
  }
};
