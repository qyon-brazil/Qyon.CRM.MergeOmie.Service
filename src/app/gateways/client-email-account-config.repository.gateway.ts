export abstract class ClientEmailAccountConfigRepositoryGateway {
  abstract changeAllClientEmailAccountConfigsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
