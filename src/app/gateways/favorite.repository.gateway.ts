export abstract class FavoriteRepositoryGateway {
    abstract changeAllFavoritesClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  