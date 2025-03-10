import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientConsumptionsRepositoryGateway } from 'src/app/gateways/client-consumption.repository.gateway';

@Injectable()
export class KnexClientConsumptionRepository
  implements ClientConsumptionsRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientConsumptionsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CONSUMO_CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_CONSUMO_CLIENTE');
  }
}
