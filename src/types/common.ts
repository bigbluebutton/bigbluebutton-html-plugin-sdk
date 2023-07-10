import { PresentationType } from '../utils/enums/presentation';

export interface PluginItem {
    id: string
    type: string
    setItemId: (id: string) => void
}

export interface WhiteboardToolbarItem extends PluginItem{}

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
        this.type = PresentationType.PRESENTATION_TOOLBAR_BUTTON;
    }
    
    setItemId: (id: string) => void = (id: string) => {
        this.id = "WhiteboardToolbarButton_" + id;
    }
}

export class WhiteboardToolbarSpinner implements WhiteboardToolbarItem {
    id: string = "";
    type: string;

    constructor() {
        this.type = PresentationType.PRESENTATION_TOOLBAR_SPINNER;
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
        this.type = PresentationType.PRESENTATION_TOOLBAR_SEPARATOR

    }

    setItemId: (id: string) => void = (id: string) => {
        this.id = "WhiteboardToolbarSeparator_" + id;
    }
}

// export interface WhiteboardToolbarItem extends PluginItem {}

// export interface WhiteboardToolbarButton extends WhiteboardToolbarItem {
//     label: string,
//     tooltip: string,
//     onClick: () => void,
// }

// export interface WhiteboardToolbarSpinner extends WhiteboardToolbarItem {}

// export interface WhiteboardToolbarSeparator extends WhiteboardToolbarItem {
//     width: number;
// }



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
