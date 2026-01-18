
export interface BioStage {
  id: string;
  year: string;
  title: string;
  description: string;
  longText: string;
  image: string;
}

export interface Disc {
  title: string;
  year: string;
  label: string;
  image: string;
  hits: string[];
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
}

export interface Song {
  title: string;
  album: string;
  url: string;
}

export interface Achievement {
  year: string;
  title: string;
}

export interface Testimonial {
  author: string;
  role: string;
  quote: string;
}

export interface BookHighlight {
  title: string;
  description: string;
}
