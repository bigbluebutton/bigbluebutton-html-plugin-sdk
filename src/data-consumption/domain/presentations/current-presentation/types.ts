import { GraphqlResponseWrapper } from '../../../../core';

export interface CurrentPresentationPageUrls {
  thumbnail: string
  png: string
  svg: string
  text: string
}

export interface CurrentPresentationPage {
  id: string
  num: number
  urlsJson: CurrentPresentationPageUrls
}

export interface CurrentPresentation {
  presentationId: string;
  currentPage: CurrentPresentationPage
}

export type UseCurrentPresentationFunction = () => GraphqlResponseWrapper<CurrentPresentation>;
