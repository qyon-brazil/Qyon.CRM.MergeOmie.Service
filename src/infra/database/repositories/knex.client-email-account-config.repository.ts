import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientEmailAccountConfigRepositoryGateway } from 'src/app/gateways/client-email-account-config.repository.gateway';

@Injectable()
export class KnexClientEmailAccountConfigRepository
  implements ClientEmailAccountConfigRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientEmailAccountConfigsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CONFIGURACAO_EMAIL_CONTA_USUARIO_CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_CONFIGURACAO_EMAIL_CONTA_USUARIO_CLIENTE');
  }
}
