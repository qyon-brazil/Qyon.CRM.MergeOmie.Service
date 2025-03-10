export abstract class TimeInChatRoomsRepositoryGateway {
  abstract changeAllTimeInChatRoomsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
