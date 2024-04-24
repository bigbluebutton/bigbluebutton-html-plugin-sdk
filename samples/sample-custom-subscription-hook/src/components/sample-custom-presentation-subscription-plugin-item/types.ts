export interface UrlsJson {
  thumb: string;
  text: string;
  svg: string;
  png: string;
}

export interface Page {
  num: number;
  urlsJson: UrlsJson;
}

export interface Presentation {
  presentationId: string;
  pages: Page[];
}

export interface PresentationFromGraphqlWrapper {
  pres_presentation: Presentation[];
}
