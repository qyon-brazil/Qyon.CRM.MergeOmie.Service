import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { AttendanceRepositoryGateway } from 'src/app/gateways/attendance.repository.gateway';

@Injectable()
export class KnexAttendanceRepository implements AttendanceRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllAttendancesClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('ATENDIMENTO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_ATENDIMENTO');
  }
}
