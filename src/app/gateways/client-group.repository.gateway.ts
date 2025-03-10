export abstract class ClientGroupRepositoryGateway {
  abstract changeAllClientGroupsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
