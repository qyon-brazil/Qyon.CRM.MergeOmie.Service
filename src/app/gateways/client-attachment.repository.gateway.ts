export abstract class ClientAttachmentsRepositoryGateway {
  abstract changeAllClientAttachmentsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
