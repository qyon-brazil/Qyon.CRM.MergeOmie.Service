import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { AttendanceTaskRepositoryGateway } from 'src/app/gateways/attendance-task.repository.gateway';

@Injectable()
export class KnexAttendanceTaskRepository implements AttendanceTaskRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllAttendanceTasksClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('TAREFA_ATENDIMENTO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}
