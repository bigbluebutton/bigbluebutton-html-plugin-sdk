export type UseUserCameraDomElementsFunction = (
  streamIds: string[]
) => HTMLDivElement[] | undefined;

export interface UserCameraDomElementsArguments {
  streamIds: string[];
}

export interface UpdatedEventDetailsForUserCameraDomElement {
  streamId: string;
  userCameraDomElement: HTMLDivElement;
}
