import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ChatControlsRepositoryGateway } from 'src/app/gateways/chat-control.repository.gateway';

@Injectable()
export class KnexChatControlRepository
  implements ChatControlsRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllChatControlsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CHAT_CONTROLE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('SESSIONID');
  }
}
