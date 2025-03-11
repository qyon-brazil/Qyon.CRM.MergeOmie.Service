export abstract class ClientCustomFieldRepositoryGateway {
    abstract changeAllClientCustomFieldsClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  