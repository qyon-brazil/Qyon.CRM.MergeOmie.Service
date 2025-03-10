import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { NetPromoterScoreVotesRepositoryGateway } from 'src/app/gateways/net-promoter-score-vote.repository.gateway';

@Injectable()
export class KnexNetPromoterScoreVoteRepository
  implements NetPromoterScoreVotesRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllNetPromoterScoreVoteClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('NET_PROMOTER_SCORE_VOTO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
