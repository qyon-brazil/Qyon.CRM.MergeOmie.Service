export abstract class ClientConsumptionsRepositoryGateway {
  abstract changeAllClientConsumptionsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
