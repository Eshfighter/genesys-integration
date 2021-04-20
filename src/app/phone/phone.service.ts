import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import * as PMMessage from "./phone.message";

export const PFE_ORIGIN = "https://apps.mypurecloud.com.au";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private actionSource = new Subject();
  private actions$ = this.actionSource.asObservable();
  private notificationSource = new Subject();
  private notifications$ = this.notificationSource.asObservable();

  constructor() {
    // Notifications received from phone, here we forward it to CRM
    window.addEventListener("message", (ev: MessageEvent) => {
      if (ev.origin != PFE_ORIGIN) return;

      switch (ev.data.type) {
        case PMMessage.PM_INITIAL_SETUP:
          this.notificationSource.next(ev.data);
          break;
        case PMMessage.PM_INTERACTION_STATE_CHANGE:
          this.notificationSource.next(ev.data);
          break;
        case PMMessage.PM_SCREEN_POP:
          this.notificationSource.next(ev.data);
          break;
        case PMMessage.PM_USER_STATUS_CHANGE:
          this.notificationSource.next(ev.data);
          break;
        default:
          throw new Error(`Invalid data from window.postMessage: ${JSON.stringify(ev)}`);
      }
    });
  }

  public get actions() { return this.actions$; }
  public get notifications() { return this.notifications$; }

  /** For CRM to invoke a click-to-dial action */
  public dial(phoneNumber: string): void {
    let dialMessage = PMMessage.CreatePMDialMessage();
    dialMessage.number = phoneNumber;
    dialMessage.autoPlace = true;
    this.actionSource.next(dialMessage);
  }
}