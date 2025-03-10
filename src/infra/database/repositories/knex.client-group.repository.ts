import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientGroupRepositoryGateway } from 'src/app/gateways/client-group.repository.gateway';

@Injectable()
export class KnexClientGroupRepository implements ClientGroupRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientGroupsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('GRUPO_CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
