export abstract class MoveRepositoryGateway {
    abstract changeAllMovesClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  