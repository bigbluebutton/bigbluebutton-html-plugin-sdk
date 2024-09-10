export type UseUserCameraDomElementsFunction = (
  streamIds: string[]
) => HTMLDivElement[] | undefined;

export interface UserCameraDomElementsArguments {
  streamIds: string[];
  pluginUuid: string;
}

export interface UpdatedDataForUserCameraDomElement {
  streamId: string;
  userCameraDomElement: HTMLDivElement;
}
