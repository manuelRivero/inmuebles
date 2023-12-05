export interface Media {
  src: string;
  type: "image" | "video";
}
export interface Property {
  media: Media[];
  id: string;
  address: string;
  salePrice: number;
  rentPrice: number;
  status: "vendida" | "rentada";
  m2: number;
}
