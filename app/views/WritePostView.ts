import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { PostForm } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import Layout from "./Layout.js";

export default class WritePostView extends View {
  private form: PostForm;

  constructor() {
    super();
    Layout.content = this.container = el(
      ".write-post-view",
      el("header", el("h1", "Write a post")),
      el("main", this.form = new PostForm()//new UserImageUploadForm()
      ),
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
    /*const data = this.form.getData();
    const postId = await PersonaPostRepository.writePost(
      data.title,
      data.content,
    );

    const walletAddress = WalletLoginManager.getLoggedInAddress()!;
    const user = await SocialCompConfig.fetchUser(walletAddress);
    const walletAddressOrName = user.name.includes(".")
      ? user.name
      : walletAddress;

    Router.go(`/${walletAddressOrName}/post/${postId}`);*/
  }
}
