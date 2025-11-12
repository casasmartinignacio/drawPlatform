import axios from "axios" 
import {Draw, DrawResponse} from "@/types/common"

export const drawingsService = {
  getAll: async (): Promise<DrawResponse> => {
    const res = await axios.get("/api/drawings");
    return res.data;
  },

  create: async (draw: Draw): Promise<DrawResponse> => {
    const res = await axios.post("/api/drawings", draw);
    return res.data;
  },
};
