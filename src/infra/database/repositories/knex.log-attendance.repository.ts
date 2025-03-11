import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { LogAttendanceRepositoryGateway } from 'src/app/gateways/log-attendance.repository.gateway';

@Injectable()
export class KnexLogAttendanceRepository implements LogAttendanceRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllLogAttendancesClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('ATENDIMENTO_LOG')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
