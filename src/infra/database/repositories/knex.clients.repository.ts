import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientsRepositoryGateway } from 'src/app/gateways/clients.repository.gateway';

@Injectable()
export class KnexClientsRepository implements ClientsRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
