import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ClientRepositoryGateway } from 'src/app/gateways/client.repository.gateway';

@Injectable()
export class KnexClientRepository implements ClientRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async getAllOmieClients() {
    const omieClients = await this.db
      .select('*')
      .from('CLIENTE')
      .whereRaw("[APP_KEY] IS NOT NULL AND LEN(COALESCE([CPFCNPJ], '')) > 0");
    return omieClients;
  }

  async getClientsByCpfCnpj(cpfCnpj: string): Promise<any> {
    const clients = await this.db
      .select('*')
      .from('CLIENTE')
      .where('CPFCNPJ', '=', cpfCnpj);

    return clients;
  }

  async deleteClientById(clientId: number): Promise<void> {
    await this.db.delete().from('CLIENTE').where('CD_CLIENTE', '=', clientId);
  }
}
