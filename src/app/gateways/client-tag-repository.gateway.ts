export abstract class ClientTagsRepositoryGateway {
  abstract changeAllClientTagsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
