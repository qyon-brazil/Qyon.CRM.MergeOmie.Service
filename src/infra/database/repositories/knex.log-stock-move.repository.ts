import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { LogStockMoveRepositoryGateway } from 'src/app/gateways/log-stock-move.repository.gateway';

@Injectable()
export class KnexLogStockMoveRepository implements LogStockMoveRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllLogStockMovesClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('LOG_MOV_ESTOQUE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
