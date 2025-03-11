
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ProspectRepositoryGateway } from 'src/app/gateways/prospect.repository.gateway';

@Injectable()
export class KnexProspectRepository implements ProspectRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllProspectsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('PROSPECT')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}