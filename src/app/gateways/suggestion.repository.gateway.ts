export abstract class SuggestionsRepositoryGateway {
  abstract changeAllSuggestionsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
