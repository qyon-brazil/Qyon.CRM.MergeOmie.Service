import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { RestrictClientInfosRepositoryGateway } from 'src/app/gateways/restrict-client-info.repository.gateway';

@Injectable()
export class KnexRestrictClientInfoRepository
  implements RestrictClientInfosRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllRestrictClientInfosClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CLIENTE_INFO_RESTRITA')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_CLIENTE_INFO_RESTRITA');
  }
}
