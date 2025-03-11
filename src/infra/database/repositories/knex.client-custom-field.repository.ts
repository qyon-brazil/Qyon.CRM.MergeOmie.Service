import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientCustomFieldRepositoryGateway } from 'src/app/gateways/client-custom-field.repository.gateway';

@Injectable()
export class KnexClientCustomFieldRepository implements ClientCustomFieldRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientCustomFieldsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CLIENTE-CAMPO_CUSTOMIZADO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
