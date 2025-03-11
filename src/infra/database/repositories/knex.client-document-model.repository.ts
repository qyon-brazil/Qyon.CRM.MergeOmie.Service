import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientDocumentModelRepositoryGateway } from 'src/app/gateways/client-document-model.repository.gateway';

@Injectable()
export class KnexClientDocumentModelRepository implements ClientDocumentModelRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllClientDocumentModelsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('MODELO_DOCUMENTO_CLIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
