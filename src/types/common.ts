export interface WhiteboardToolbarItem {
    name: string,
    type: string,
}

export interface WhiteboardToolbarButtonObj extends WhiteboardToolbarItem {
    label: string,
    tooltip: string,
    onClick: () => void,
}

export interface WhiteboardToolbarLoading extends WhiteboardToolbarItem {}

export interface WhiteboardToolbarSeparator extends WhiteboardToolbarItem {
    width: number;
}

export type GetWhiteboardToolbarItems = () => WhiteboardToolbarItem[];

export type SetWhiteboardToolbarItems = (whiteboardToolbarItem: WhiteboardToolbarItem[]) => void;

export interface CustomWindowPlugin extends Window {
    bbb_plugins: { [key: string]: {
        setWhiteboardToolbarItems: SetWhiteboardToolbarItems
    }};
}

export interface CustomEventHook<T> {
    data: T
    hook: string
}

export interface CustomEventHookWrapper<T> extends Event {
    detail: CustomEventHook<T>
}
