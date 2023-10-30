export interface Presentation {
  presentationId: string;
  pages: Page[];
}

export interface Page {
  num: number;
  urlsJson: UrlsJson;
}

export interface UrlsJson {
  thumb: string;
  text: string;
  svg: string;
  png: string;
}
