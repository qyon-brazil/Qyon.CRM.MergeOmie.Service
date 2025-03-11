export abstract class ClientSignRepositoryGateway {
    abstract changeAllClientSignsClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  