import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { FileRepositoryGateway } from 'src/app/gateways/file.repository.gateway';

@Injectable()
export class KnexFileRepository implements FileRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllFilesClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('ARQUIVO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
