import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { StocksRepositoryGateway } from 'src/app/gateways/stock.repository.gateway';

@Injectable()
export class KnexStockRepository implements StocksRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllStocksClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('ESTOQUE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_ESTOQUE');
  }
}
