export abstract class ProposalsRepositoryGateway {
  abstract changeAllProposalsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
