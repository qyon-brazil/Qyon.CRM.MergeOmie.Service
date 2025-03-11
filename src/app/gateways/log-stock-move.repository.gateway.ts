export abstract class LogStockMoveRepositoryGateway {
    abstract changeAllLogStockMovesClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  