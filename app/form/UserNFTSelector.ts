import { DomNode } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { GaiaProtocolConfig, NFTList, OpenSeaNFTData } from "gaiaprotocol";

export default class UserNFTSelector extends DomNode<HTMLDivElement, {
  changeSelectedNFT: (nft: OpenSeaNFTData | undefined) => void;
  changeSelectedNFTs: (nfts: OpenSeaNFTData[]) => void;
}> {
  private next: string | undefined;
  private loading = false;

  private nftList: NFTList | undefined;

  constructor(private selectMode: "single" | "multiple") {
    super(".user-nft-selector");
    this.loadNFTs();
  }

  public getSelectedNFTs(): OpenSeaNFTData[] {
    return this.nftList?.getSelectedNFTs() ?? [];
  }

  public getSelectedNFT(): OpenSeaNFTData | undefined {
    return this.nftList?.getSelectedNFT();
  }

  public async loadNFTs(): Promise<void> {
    new AppCompConfig.LoadingSpinner().appendTo(this);
    this.loading = true;

    const data = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<{
      nfts: OpenSeaNFTData[];
      next?: string;
    }>("get-user-nfts", {});

    this.loading = false;
    this.next = data.next;

    this.clear().append(
      this.nftList = new NFTList({ data, selectMode: this.selectMode }),
    );
    this.nftList.on(
      "changeSelectedNFT",
      (nft) => this.emit("changeSelectedNFT", nft),
    );
    this.nftList.on(
      "changeSelectedNFTs",
      (nfts) => this.emit("changeSelectedNFTs", nfts),
    );
    this.nftList.on("remove", () => this.nftList = undefined);
  }

  public async loadMoreNFTs(): Promise<void> {
    if (!this.loading && this.next) {
      const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);
      this.loading = true;

      const data = await GaiaProtocolConfig.supabaseConnector.callEdgeFunction<{
        nfts: OpenSeaNFTData[];
        next?: string;
      }>("get-user-nfts", { next: this.next });

      this.loading = false;
      this.next = data.next;

      loadingSpinner.remove();

      this.nftList?.addNFTs(data.nfts);
    }
  }
}
