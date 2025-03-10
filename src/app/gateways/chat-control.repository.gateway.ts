export abstract class ChatControlsRepositoryGateway {
  abstract changeAllChatControlsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
