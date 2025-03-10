export abstract class ConsumptionExtractsRepositoryGateway {
  abstract changeAllConsumptionExtractsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
