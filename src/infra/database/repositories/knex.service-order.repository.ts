import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ServiceOrderRepositoryGateway } from 'src/app/gateways/service-order.repository.gateway';

@Injectable()
export class KnexServiceOrderRepository
  implements ServiceOrderRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllServiceOrdersClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId: number;
  }): Promise<any[]> {
    return await this.db('ORDEM_SERVICO_GERADA')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
