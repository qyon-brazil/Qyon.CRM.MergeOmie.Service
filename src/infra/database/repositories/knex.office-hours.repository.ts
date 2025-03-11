import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { OfficeHoursRepositoryGateway } from 'src/app/gateways/office-hours.repository.gateway';

@Injectable()
export class KnexOfficeHoursRepository implements OfficeHoursRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllOfficeHoursClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('HORARIO_EXPEDIENTE')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
