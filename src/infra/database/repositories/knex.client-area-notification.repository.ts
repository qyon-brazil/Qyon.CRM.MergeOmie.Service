import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientAreaNotificationsRepositoryGateway } from 'src/app/gateways/client-area-notification.repository.gateway';

@Injectable()
export class KnexClientAreaNotificationRepository
  implements ClientAreaNotificationsRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientAreaNotificationsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('NOTIFICACAO_CLIENTE_AREACLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_NOTIFICACAO_CLIENTE_AREACLIENTE');
  }
}
