export interface DrawList {
    drawings: Draw[];
}

export interface Draw {
  id: string;
  author?: string;
  tags: string[];
  data: string; // base64
}