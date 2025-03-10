import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { EnvConfig } from '../configuration';
import { ClientRepositoryGateway } from 'src/app/gateways/client.repository.gateway';
import { KnexClientRepository } from './repositories/knex.client.repository';
import { AttendanceRepositoryGateway } from 'src/app/gateways/attendance.repository.gateway';
import { KnexAttendanceRepository } from './repositories/knex.attendance.repository';
import { CalendarEventRepositoryGateway } from 'src/app/gateways/calendar-event.repository.gateway';
import { KnexCalendarEventRepository } from './repositories/knex.calendar-event.repository';
import { ClientTagsRepositoryGateway } from 'src/app/gateways/client-tag-repository.gateway';
import { KnexClientTagsRepository } from './repositories/knex.client-tags.repository';
import { StocksRepositoryGateway } from 'src/app/gateways/stock.repository.gateway';
import { KnexStockRepository } from './repositories/knex.stock.repository';
import { NetPromoterScoreVotesRepositoryGateway } from 'src/app/gateways/net-promoter-score-vote.repository.gateway';
import { KnexNetPromoterScoreVoteRepository } from './repositories/knex.net-promotor-score-vote.repository';
import { ContactsRepositoryGateway } from 'src/app/gateways/contact.repository.gateway';
import { KnexContactRepository } from './repositories/knex.contact.repository';
import { ClientEmailAccountConfigRepositoryGateway } from 'src/app/gateways/client-email-account-config.repository.gateway';
import { KnexClientEmailAccountConfigRepository } from './repositories/knex.client-email-account-config.repository';
import { ClientGroupRepositoryGateway } from 'src/app/gateways/client-group.repository.gateway';
import { KnexClientGroupRepository } from './repositories/knex.client-group.repository';
import { ClientAreaNotificationsRepositoryGateway } from 'src/app/gateways/client-area-notification.repository.gateway';
import { KnexClientAreaNotificationRepository } from './repositories/knex.client-area-notification.repository';
import { SuggestionsRepositoryGateway } from 'src/app/gateways/suggestion.repository.gateway';
import { KnexSuggestionRepository } from './repositories/knex.suggestion.repository';
import { ProposalsRepositoryGateway } from 'src/app/gateways/proposal.repository.gateway';
import { KnexProposalRepository } from './repositories/knex.proposal.repository';
import { TimeInChatRoomsRepositoryGateway } from 'src/app/gateways/time-in-chat-room.repository.gateway';
import { KnexTimeInChatRoomRepository } from './repositories/knex.time-in-chat-room.repository';
import { ChatControlsRepositoryGateway } from 'src/app/gateways/chat-control.repository.gateway';
import { KnexChatControlRepository } from './repositories/knex.chat-control.repository';
import { ClientConsumptionsRepositoryGateway } from 'src/app/gateways/client-consumption.repository.gateway';
import { KnexClientConsumptionRepository } from './repositories/knex.client-consumption.repository';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mssql',
        connection: {
          host: EnvConfig.DB_ADDRESS,
          password: EnvConfig.DB_PASSWORD,
          user: EnvConfig.DB_USER,
          port: EnvConfig.DB_PORT,
          database: EnvConfig.DB_DATABASE,
        },
      },
    }),
  ],
  providers: [
    {
      provide: ClientRepositoryGateway,
      useClass: KnexClientRepository,
    },
    {
      provide: AttendanceRepositoryGateway,
      useClass: KnexAttendanceRepository,
    },
    {
      provide: CalendarEventRepositoryGateway,
      useClass: KnexCalendarEventRepository,
    },
    {
      provide: ClientTagsRepositoryGateway,
      useClass: KnexClientTagsRepository,
    },
    {
      provide: StocksRepositoryGateway,
      useClass: KnexStockRepository,
    },
    {
      provide: NetPromoterScoreVotesRepositoryGateway,
      useClass: KnexNetPromoterScoreVoteRepository,
    },
    {
      provide: ContactsRepositoryGateway,
      useClass: KnexContactRepository,
    },
    {
      provide: ClientEmailAccountConfigRepositoryGateway,
      useClass: KnexClientEmailAccountConfigRepository,
    },
    {
      provide: ClientGroupRepositoryGateway,
      useClass: KnexClientGroupRepository,
    },
    {
      provide: ChatControlsRepositoryGateway,
      useClass: KnexChatControlRepository,
    },
    {
      provide: TimeInChatRoomsRepositoryGateway,
      useClass: KnexTimeInChatRoomRepository,
    },
    {
      provide: ProposalsRepositoryGateway,
      useClass: KnexProposalRepository,
    },
    {
      provide: SuggestionsRepositoryGateway,
      useClass: KnexSuggestionRepository,
    },
    {
      provide: ClientAreaNotificationsRepositoryGateway,
      useClass: KnexClientAreaNotificationRepository,
    },
    {
      provide: ClientConsumptionsRepositoryGateway,
      useClass: KnexClientConsumptionRepository,
    },
  ],
  exports: [
    ClientRepositoryGateway,
    AttendanceRepositoryGateway,
    CalendarEventRepositoryGateway,
    ClientTagsRepositoryGateway,
    StocksRepositoryGateway,
    NetPromoterScoreVotesRepositoryGateway,
    ContactsRepositoryGateway,
    ClientEmailAccountConfigRepositoryGateway,
    ClientGroupRepositoryGateway,
    ChatControlsRepositoryGateway,
    TimeInChatRoomsRepositoryGateway,
    ProposalsRepositoryGateway,
    SuggestionsRepositoryGateway,
    ClientAreaNotificationsRepositoryGateway,
    ClientConsumptionsRepositoryGateway,
  ],
})
export class DatabaseModule {}
