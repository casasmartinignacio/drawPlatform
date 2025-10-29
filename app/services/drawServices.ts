import axios from "axios" 
import {Draw, DrawResponse} from "@/types/common"

export const drawingsService = {
  getAll: async (): Promise<DrawResponse> => {
    const res = await axios.get("/api/drawings");
    if (res.status != 200) throw new Error(res.data.message);
    return res.data;
  },

  create: async (draw: Draw): Promise<DrawResponse> => {
    const res = await axios.post("/api/drawings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draw),
    });
    if (res.status != 201) throw new Error(res.data.message);
    return res.data;
  },
};
