import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ContactsRepositoryGateway } from 'src/app/gateways/contact.repository.gateway';

@Injectable()
export class KnexContactRepository implements ContactsRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllContactsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CONTATO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_CONTATO');
  }
}
