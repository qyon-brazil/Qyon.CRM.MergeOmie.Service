export abstract class ServiceOrderRepositoryGateway {
  abstract changeAllServiceOrdersClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
