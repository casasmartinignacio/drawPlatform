export interface Draw {
  id: string; 
  author?: string;
  tags: string[];
  data: string; 
}

export interface DrawResponse {
  message: string;
  data?: Draw[];
  code?: string;
}

export const drawingsService = {
  getAll: async (): Promise<DrawResponse> => {
    const res = await fetch("/api/drawings");
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },

  create: async (draw: Draw): Promise<DrawResponse> => {
    const res = await fetch("/api/drawings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draw),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },
};
