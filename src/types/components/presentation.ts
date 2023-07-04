export interface CurrentPresentation {
    isCurrentPage: boolean;
    num: number;
    pageId: string,
    presentationId: string
    slideRevealed: boolean,
    urls: Urls,
}

export interface Urls {
    png: string,
    svg: string,
    text: string,
    thumb: string,
}


