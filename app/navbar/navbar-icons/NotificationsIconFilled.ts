import { DomNode } from "@common-module/app";

export default class NotificationsIconFilled extends DomNode {
  constructor() {
    super(".icon.notifications.filled");
    const svgHeight = 24;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
