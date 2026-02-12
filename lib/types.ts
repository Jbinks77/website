export type Service = {
  name: string;
  description: string;
  priceFrom: number;
  duration: number;
};

export type InstagramPost = {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
  media_type?: string;
  tags?: string[];
};

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  duration: number;
  comment?: string;
  date: string;
  start: string;
  end: string;
  createdAt: string;
};
