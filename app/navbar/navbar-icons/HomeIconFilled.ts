import { DomNode } from "@common-module/app";

export default class HomeIconFilled extends DomNode {
  constructor() {
    super(".icon.home.filled");
    const svgHeight = 24;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
