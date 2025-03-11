import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ChatMessageRepositoryGateway } from 'src/app/gateways/chat-message.repository.gateway';

@Injectable()
export class KnexChatMessageRepository implements ChatMessageRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllChatMessagesClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CHAT_MENSAGEM')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
