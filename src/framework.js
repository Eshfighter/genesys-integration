// Framework configuration file for PureCloud Embeddable Framework

const PFE_CRMTargetOrigin = "http://localhost:4200";

window.Framework = {
  config: {
    name: "My Test App",
    clientIds: { 
      "mypurecloud.com.au": "your client id here",
      "inindca.com": "59a45af9-cfc-4f2b-9f0c-d7763dae6923" }
  },

  // callback to let CRM know framework.js successfully loaded
  initialSetup: function () {
    top.window.postMessage({ type: "[PM] Initial Setup" }, PFE_CRMTargetOrigin);
  },

  // callback to let CRM know it is time to perform a screen pop 
  screenPop: function (searchString, interaction) {
    top.window.postMessage({ type: "[PM] Screen Pop", searchString: searchString, interaction: interaction }, PFE_CRMTargetOrigin);
  },
}

// subscribe to PureCloud Embeddable Framework user status and interaction state changes
window.PureCloud.subscribe([
  {
    type: "UserAction",
    callback: function (category, data) {
      top.window.postMessage({ type: "[PM] User Status Change", category: category, data: data }, PFE_CRMTargetOrigin);
    }
  },
  {
    type: "Interaction",
    callback: function (category, interaction) {
      top.window.postMessage({ type: "[PM] Interaction State Change", category: category, interaction: interaction }, PFE_CRMTargetOrigin);
    }
  }
]);

// For CRM to execute PureCloud Embeddable Framework actions. CRM posts message and is received here.
window.addEventListener("message", function (ev) {
  if (ev.origin != PFE_CRMTargetOrigin) return;

  switch (ev.data.type) {
    case "[PM] Dial":
      window.PureCloud.clickToDial({
        number: ev.data.number,
        address: ev.data.address,
        autoPlace: ev.data.autoPlace,
        queueId: ev.data.queueId,
        attributes: ev.data.attributes
      });
      break;
    default:
      throw new Error("Invalid message received from CRM: " + JSON.stringify(ev.data));
  }
});