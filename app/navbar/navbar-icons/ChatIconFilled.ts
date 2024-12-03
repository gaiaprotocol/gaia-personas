import { DomNode } from "@common-module/app";

export default class ChatIconFilled extends DomNode {
  constructor() {
    super(".icon.chat.filled");
    const svgHeight = 24;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm160-320h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
