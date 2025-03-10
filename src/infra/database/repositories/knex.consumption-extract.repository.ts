import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ConsumptionExtractsRepositoryGateway } from 'src/app/gateways/consumption-extract.repository.gateway';

@Injectable()
export class KnexConsumptionExtractRepository
  implements ConsumptionExtractsRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllConsumptionExtractsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CONSUMO_EXTRATO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_CONSUMO_EXTRATO');
  }
}
