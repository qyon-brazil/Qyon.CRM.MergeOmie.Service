import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientAttachmentsRepositoryGateway } from 'src/app/gateways/client-attachment.repository.gateway';

@Injectable()
export class KnexClientAttachmentRepository
  implements ClientAttachmentsRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientAttachmentsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CLIENTE_ANEXO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
