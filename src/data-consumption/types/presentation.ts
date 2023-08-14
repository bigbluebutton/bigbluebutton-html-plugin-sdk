export interface CurrentPresentationPageUrls {
    thumbnail: string
    png: string
    svg: string
    text: string
}

export interface CurrentPresentationPage {
    id: string
    num: number
    urls: CurrentPresentationPageUrls
}

export interface CurrentPresentation {
    presentationId: string;
    currentPage: CurrentPresentationPage
}
