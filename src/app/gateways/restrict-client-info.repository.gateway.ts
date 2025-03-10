export abstract class RestrictClientInfosRepositoryGateway {
  abstract changeAllRestrictClientInfosClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
