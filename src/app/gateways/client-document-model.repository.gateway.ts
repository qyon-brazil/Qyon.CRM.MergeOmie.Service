export abstract class ClientDocumentModelRepositoryGateway {
    abstract changeAllClientDocumentModelsClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  