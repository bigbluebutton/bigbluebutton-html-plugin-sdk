export interface PresentationPageUrls {
    thumbnail: string
    png: string
    svg: string
    text: string
}

export interface PresentationPage {
    id: string
    num: number
    urls: PresentationPageUrls
}

export interface Presentation {
    presentationId: string;
    currentPage: PresentationPage
}
