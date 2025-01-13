import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { PostForm } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { PersonaPostRepository } from "gaiaprotocol";
import Layout from "./Layout.js";

export default class WritePostView extends View {
  private form: PostForm;

  constructor() {
    super();
    Layout.content = this.container = el(
      ".write-post-view",
      el("header", el("h1", "Write a post")),
      el("main", this.form = new PostForm()),
      el(
        "footer",
        new Button(".post", {
          type: ButtonType.Contained,
          title: "Post",
          onClick: () => this.savePost(),
        }),
      ),
    );

    if (!WalletLoginManager.isLoggedIn()) Router.goWithoutHistory("/");
  }

  private async savePost(): Promise<void> {
    const data = this.form.getData();
    const postId = await PersonaPostRepository.writePost(
      data.title,
      data.content,
    );
    Router.go(`/post/${postId}`);
  }
}
