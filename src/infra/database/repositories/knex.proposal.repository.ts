import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ProposalsRepositoryGateway } from 'src/app/gateways/proposal.repository.gateway';

@Injectable()
export class KnexProposalRepository implements ProposalsRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllProposalsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('PROPOSTA')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_PROPOSTA');
  }
}
