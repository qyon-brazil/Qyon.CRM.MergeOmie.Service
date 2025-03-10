import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientTagsRepositoryGateway } from 'src/app/gateways/client-tag-repository.gateway';

@Injectable()
export class KnexClientTagsRepository implements ClientTagsRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientTagsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CLIENTE_TAGS_ASSOCIADO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_TAGS_CLI');
  }
}
