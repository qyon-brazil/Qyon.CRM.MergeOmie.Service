import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientSignRepositoryGateway } from 'src/app/gateways/client-sign.repository.gateway';

@Injectable()
export class KnexClientSignRepository implements ClientSignRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientSignsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('ASSINATURA_CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
