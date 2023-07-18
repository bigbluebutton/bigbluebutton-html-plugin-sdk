export interface Presentation {
    presentationId: string;
    currentPage: PresentationPage
}
export interface PresentationPage {
    id: string
    num: number
    urls: PresentationPageUrls
}
export interface PresentationPageUrls {
    thumbnail: string
    png: string
    svg: string
    text: string
}
