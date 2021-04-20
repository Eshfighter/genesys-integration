// Message format to and from PureCloud Embeddable Framework

export const PM_DIAL = "[PM] Dial";
export const PM_INITIAL_SETUP = "[PM] Initial Setup";
export const PM_INTERACTION_STATE_CHANGE = "[PM] Interaction State Change";
export const PM_SCREEN_POP = "[PM] Screen Pop";
export const PM_USER_STATUS_CHANGE = "[PM] User Status Change";

export interface PMMessage {
  type: string;
}

export interface PMDialMessage extends PMMessage {
  number: string;
  address: string;
  autoPlace: boolean;
  queueId: string;
  attributes: {};
}

export interface PMInitialSetupMessage extends PMMessage {
}

export interface PMInteractionStateChangeMessage extends PMMessage {
  category: string;
  interaction: {};
}

export interface PMScreenPopMessage extends PMMessage {
  searchString: string;
  interaction: {};
}

export interface PMUserStatusChangeMessage extends PMMessage {
  category: string;
  data: {};
}

export const CreatePMDialMessage = (): PMDialMessage => ({ type: PM_DIAL, number: "", address: "", autoPlace: true, queueId: "", attributes: {} });
//export const CreatePMInitialSetupMessage = (): PMInitialSetupMessage => ({ type: PM_INITIAL_SETUP });
//export const CreatePMScreenPopMessage = (): PMScreenPopMessage => ({ type: PM_SCREEN_POP });