export abstract class ProspectRepositoryGateway {
  abstract changeAllProspectsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
