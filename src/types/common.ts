import { Quiz } from "./components/poll";

export interface WhiteboardToolbarItems {
    name: string,
    type: string,
}

export interface WhiteboardToolbarButtonObj extends WhiteboardToolbarItems {
    label: string,
    tooltip: string,
    pollInfoQuiz: Quiz,
    onClick: () => void,
}

export interface WhiteboardToolbarLoading extends WhiteboardToolbarItems {}

export interface WhiteboardToolbarSeparator extends WhiteboardToolbarItems {
    width: number;
}

export type GetWhiteboardToolbarItems = () => WhiteboardToolbarItems[];

export interface CustomWindowPlugin extends Window {
    bbb_plugins: { [key: string]: {setWhiteboardToolbarItems: (callback: GetWhiteboardToolbarItems) => void} };
}

