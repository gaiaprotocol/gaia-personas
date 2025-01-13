import { el, View } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { PostDisplay } from "@common-module/social-components";
import {
  PersonaPostEntity,
  PersonaPostRepository,
  PersonaPostUtils,
} from "gaiaprotocol";
import Layout from "./Layout.js";

export default class PostView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(".post-view");
  }

  public async changeData(data: { id: string } | PersonaPostEntity) {
    const id = typeof data.id === "string" ? parseInt(data.id) : data.id;

    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(
      this.container,
    );

    const post = (data as PersonaPostEntity).created_at
      ? data as PersonaPostEntity
      : await PersonaPostRepository.fetchPost(id);

    loadingSpinner.remove();

    if (!post) this.container.append(el(".no-post", "Post not found"));
    else {
      this.container.append(
        new PostDisplay(PersonaPostUtils.convertPersonaPostToSocialPost(post)),
      );
    }
  }
}
