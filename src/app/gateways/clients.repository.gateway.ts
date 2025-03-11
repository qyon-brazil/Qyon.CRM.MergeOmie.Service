export abstract class ClientsRepositoryGateway {
    abstract changeAllClientsClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  