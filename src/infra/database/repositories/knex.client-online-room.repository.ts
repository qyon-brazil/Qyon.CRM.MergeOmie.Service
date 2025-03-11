import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientOnlineRoomRepositoryGateway } from 'src/app/gateways/client-online-room.repository.gateway';

@Injectable()
export class KnexClientOnlineRoomRepository implements ClientOnlineRoomRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientOnlineRoomsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('SALA_ONLINE_CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}