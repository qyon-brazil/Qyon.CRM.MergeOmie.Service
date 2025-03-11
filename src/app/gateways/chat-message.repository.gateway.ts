export abstract class ChatMessageRepositoryGateway {
    abstract changeAllChatMessagesClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  