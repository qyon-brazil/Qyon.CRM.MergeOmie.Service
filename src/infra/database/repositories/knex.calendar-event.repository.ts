import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CalendarEventRepositoryGateway } from 'src/app/gateways/calendar-event.repository.gateway';

@Injectable()
export class KnexCalendarEventRepository
  implements CalendarEventRepositoryGateway
{
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllCalendarEventsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('CALENDARIO_EVENTO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_CALENDARIO_EVENTO');
  }
}
