export interface Draw {
  id: string; // Uuid aleatorio https://www.npmjs.com/package/uuid
  author?: string;
  tags: string[];
  data: string; // El dibujo
}

export interface DrawResponse {
  message: string;
  data?: Draw[];
  code?: string;
}
