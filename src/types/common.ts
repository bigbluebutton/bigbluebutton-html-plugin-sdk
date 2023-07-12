import { WhiteboardToolbarItemType } from '../index';

export interface PluginProvidedUiItemDescriptor {
    id: string
    type: string
    setItemId: (id: string) => void
}

export interface WhiteboardToolbarItem extends PluginProvidedUiItemDescriptor{}

export interface WhiteboardToolbarButtonProps {
    label: string,
    tooltip: string,
    onClick: () => void,
}

export class WhiteboardToolbarButton implements WhiteboardToolbarItem {
    id: string = "";
    type: string;
    label: string;
    tooltip: string;
    onClick: () => void;
    constructor({label = "", tooltip = "", onClick = () => {}}: WhiteboardToolbarButtonProps) {
        this.label = label;
        this.tooltip = tooltip;
        this.onClick = onClick;
        this.type = WhiteboardToolbarItemType.BUTTON;
    }
    
    setItemId: (id: string) => void = (id: string) => {
        this.id = "WhiteboardToolbarButton_" + id;
    }
}

export class WhiteboardToolbarSpinner implements WhiteboardToolbarItem {
    id: string = "";
    type: string;

    constructor() {
        this.type = WhiteboardToolbarItemType.SPINNER;
    }

    setItemId: (id: string) => void = (id: string) => {
        this.id = "WhiteboardToolbarSpinner_" + id;
    }
}

export interface WhiteboardToolbarSeparatorProps {
    width: number
}
export class WhiteboardToolbarSeparator implements WhiteboardToolbarItem {
    id: string = "";
    type: string;
    width: number;
    constructor({width}: WhiteboardToolbarSeparatorProps) {
        this.width = width;
        this.type = WhiteboardToolbarItemType.SEPARATOR

    }

    setItemId: (id: string) => void = (id: string) => {
        this.id = "WhiteboardToolbarSeparator_" + id;
    }
}

export type SetWhiteboardToolbarItems = (whiteboardToolbarItem: WhiteboardToolbarItem[]) => void;

export interface PluginBrowserWindow extends Window {
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
