import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientNotificationRepositoryGateway } from 'src/app/gateways/client-notification.repository.gateway';

@Injectable()
export class KnexClientNotificationRepository implements ClientNotificationRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientNotificationsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('NOTIFICACAO_CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
