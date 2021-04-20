import { Component, OnInit } from '@angular/core';
import { PFE_ORIGIN, PhoneService } from "./phone.service";
import * as PMMessage from "./phone.message";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
    // subscribe to 'actions' sent from CRM, e.g., CRM invokes click-to-dial action, action is received here
    this.phoneService.actions.subscribe((data: any) => {
      switch (data.type) {
        case PMMessage.PM_DIAL:
          this.postToIFrame(data);
      }
    });
  }

  /** Posts message to iframe containing PureCloud Embeddable Framework */
  private postToIFrame(message: any): void {
    window.frames["phone"].contentWindow.postMessage(message, PFE_ORIGIN);
  }
}
