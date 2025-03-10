import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { TimeInChatRoomsRepositoryGateway } from 'src/app/gateways/time-in-chat-room.repository.gateway';

@Injectable()
export class KnexTimeInChatRoomRepository
  implements TimeInChatRoomsRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllTimeInChatRoomsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CHAT_TEMPO_SALA')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_CHAT_TEMPO');
  }
}
