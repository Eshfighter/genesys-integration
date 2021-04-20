import { Component } from '@angular/core';
import { PhoneService } from "./phone/phone.service";
import * as PMMessage from "./phone/phone.message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private phoneVisible: boolean = false;
  private log: string[] = [];

  constructor(private phoneService: PhoneService) { }

  private ngOnInit() {
    // Notifications sent from phone to CRM
    this.phoneService.notifications.subscribe((data: any) => {
      switch (data.type) {
        case PMMessage.PM_INITIAL_SETUP:
          this.phoneInitialSetupCompleted();
          break;
        case PMMessage.PM_INTERACTION_STATE_CHANGE:
          this.interactionStateChanged(data);
          break;
        case PMMessage.PM_SCREEN_POP:
          this.screenPop(data);
          break;
        case PMMessage.PM_USER_STATUS_CHANGE:
          this.userStatusChanged(data);
          break;
        default:
          throw new Error(`Invalid data from PhoneService: ${data}`);
      }
    });
  }

  private dial(input: HTMLInputElement) {
    if (input.value.trim()) this.phoneService.dial(input.value);
  }

  private interactionStateChanged(state: PMMessage.PMInteractionStateChangeMessage): void {
    this.log.unshift(`Category=${state.category}, Interaction=${JSON.stringify(state.interaction)}`);
  }

  private phoneInitialSetupCompleted() {
    this.log.unshift("Successfully loaded framework.js.");
  }

  private screenPop(data: PMMessage.PMScreenPopMessage): void {
    this.log.unshift(`SCREEN POP: SearchString=${data.searchString}, Interaction=${JSON.stringify(data.interaction)}`);
  }

  private togglePhone() {
    this.phoneVisible = !this.phoneVisible;
  }

  private userStatusChanged(status: PMMessage.PMUserStatusChangeMessage): void {
    this.log.unshift(`Category=${status.category}, Data=${JSON.stringify(status.data)}`);
  }
}