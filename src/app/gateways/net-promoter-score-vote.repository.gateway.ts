export abstract class NetPromoterScoreVotesRepositoryGateway {
  abstract changeAllNetPromoterScoreVoteClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
