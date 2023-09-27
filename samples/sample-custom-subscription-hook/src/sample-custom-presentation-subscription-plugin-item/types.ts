export interface Presentation {
  presentationId: string;
  pages: Page[];
}

export interface Page {
  num: number;
  urls: string;
}

export interface ParsedUrls {
  thumb: string;
  text: string;
  svg: string;
  png: string;
}
