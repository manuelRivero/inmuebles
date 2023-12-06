export interface Media {
  source: string;
  type: "image" | "video";
}
export interface Property {
  media: Media[];
  id: string;
  address: string;
  salePrice: number;
  rentPrice: number;
  status: "VENDIDA" | "RENTADA" | "DISPONIBLE";
  m2: number;
}
