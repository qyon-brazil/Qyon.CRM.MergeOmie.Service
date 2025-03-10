export abstract class StocksRepositoryGateway {
  abstract changeAllStocksClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
