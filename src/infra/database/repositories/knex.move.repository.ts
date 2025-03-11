import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { MoveRepositoryGateway } from 'src/app/gateways/move.repository.gateway';

@Injectable()
export class KnexMoveRepository implements MoveRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllMovesClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('MOVIMENTO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
