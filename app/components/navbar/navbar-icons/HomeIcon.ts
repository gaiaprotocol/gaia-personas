import { DomNode } from "@common-module/app";

export default class HomeIcon extends DomNode {
  constructor() {
    super(".icon.home");
    const svgHeight = 24;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
