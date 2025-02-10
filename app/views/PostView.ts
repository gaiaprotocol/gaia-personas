import { el, View } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import {
  PersonaPostEntity,
  PersonaPostRepository,
  PersonaRepository
} from "gaiaprotocol";
import Layout from "./Layout.js";

export default class PostView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(".post-view");
  }

  public async changeData(
    data:
      | { walletAddress?: string; name?: string; tld?: string; id: string }
      | PersonaPostEntity,
  ) {
    this.container.clear();

    const id = typeof data.id === "string" ? parseInt(data.id) : data.id;

    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(
      this.container,
    );

    const personaOwner = "walletAddress" in data
      ? `0x${data.walletAddress}`
      : await PersonaRepository.fetchWalletAddressByName(
        `${(data as any).name}.${(data as any).tld}`,
      ) ?? "";

    const post = (data as PersonaPostEntity).created_at
      ? data as PersonaPostEntity
      : await PersonaPostRepository.fetchPost(personaOwner, id);

    loadingSpinner.remove();

    if (!post) this.container.append(el(".no-post", "Post not found"));
    else {
      this.container.append(
        //new PostDisplay(PersonaPostUtils.convertPersonaPostToSocialPost(post)),
      );
    }
  }
}
