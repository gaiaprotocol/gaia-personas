import { el, View } from "@common-module/app";
import Layout from "./Layout.js";

export default class WritePostView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(".write-post-view", "Write a post");
  }
}
