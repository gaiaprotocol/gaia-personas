import { el, View } from "@common-module/app";
import { PostForm } from "@common-module/social-components";
import Layout from "./Layout.js";

export default class WritePostView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(
      ".write-post-view",
      el("header", el("h1", "Write a post")),
      new PostForm(),
    );
  }
}
