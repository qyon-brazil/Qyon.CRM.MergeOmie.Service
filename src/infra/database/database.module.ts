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
import { ConsumptionExtractsRepositoryGateway } from 'src/app/gateways/consumption-extract.repository.gateway';
import { KnexConsumptionExtractRepository } from './repositories/knex.consumption-extract.repository';
import { RestrictClientInfosRepositoryGateway } from 'src/app/gateways/restrict-client-info.repository.gateway';
import { KnexRestrictClientInfoRepository } from './repositories/knex.restrict-client-info.repository';
import { ClientAttachmentsRepositoryGateway } from 'src/app/gateways/client-attachment.repository.gateway';
import { KnexClientAttachmentRepository } from './repositories/knex.client-attachment.repository';
import { ServiceOrderRepositoryGateway } from 'src/app/gateways/service-order.repository.gateway';
import { KnexServiceOrderRepository } from './repositories/knex.service-order.repository';
import { ProspectRepositoryGateway } from 'src/app/gateways/prospect.repository.gateway';
import { KnexProspectRepository } from './repositories/knex.prospect.repository';
import { ClientOnlineRoomRepositoryGateway } from 'src/app/gateways/client-online-room.repository.gateway';
import { KnexClientOnlineRoomRepository } from './repositories/knex.client-online-room.repository';
import { AttendanceTaskRepositoryGateway } from 'src/app/gateways/attendance-task.repository.gateway';
import { KnexAttendanceTaskRepository } from './repositories/knex.attendance-task.repository';
import { ClientsRepositoryGateway } from 'src/app/gateways/clients.repository.gateway';
import { KnexClientsRepository } from './repositories/knex.clients.repository';
import { ClientNotificationRepositoryGateway } from 'src/app/gateways/client-notification.repository.gateway';
import { KnexClientNotificationRepository } from './repositories/knex.client-notification.repository';
import { ChatMessageRepositoryGateway } from 'src/app/gateways/chat-message.repository.gateway';
import { KnexChatMessageRepository } from './repositories/knex.chat-message.repository';
import { ClientDocumentModelRepositoryGateway } from 'src/app/gateways/client-document-model.repository.gateway';
import { KnexClientDocumentModelRepository } from './repositories/knex.client-document-model.repository';
import { OfficeHoursRepositoryGateway } from 'src/app/gateways/office-hours.repository.gateway';
import { KnexOfficeHoursRepository } from './repositories/knex.office-hours.repository';
import { ClientCustomFieldRepositoryGateway } from 'src/app/gateways/client-custom-field.repository.gateway';
import { KnexClientCustomFieldRepository } from './repositories/knex.client-custom-field.repository';
import { CognitoUserRepositoryGateway } from 'src/app/gateways/cognito-user.repository.gateway';
import { KnexCognitoUserRepository } from './repositories/knex.cognito-user.repository';
import { LogStockMoveRepositoryGateway } from 'src/app/gateways/log-stock-move.repository.gateway';
import { KnexLogStockMoveRepository} from './repositories/knex.log-stock-move.repository';
import { LogAttendanceRepositoryGateway } from 'src/app/gateways/log-attendance.repository.gateway';
import { KnexLogAttendanceRepository} from './repositories/knex.log-attendance.repository';
import { ClientSignRepositoryGateway } from 'src/app/gateways/client-sign.repository.gateway';
import { KnexClientSignRepository} from './repositories/knex.client-sign.repository';
import { FileRepositoryGateway } from 'src/app/gateways/file.repository.gateway';
import { KnexFileRepository} from './repositories/knex.file.repository';
import { MoveRepositoryGateway } from 'src/app/gateways/move.repository.gateway';
import { KnexMoveRepository} from './repositories/knex.move.repository';
import { FavoriteRepositoryGateway } from 'src/app/gateways/favorite.repository.gateway';
import { KnexFavoriteRepository} from './repositories/knex.favorite.repository';

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
    {
      provide: ConsumptionExtractsRepositoryGateway,
      useClass: KnexConsumptionExtractRepository,
    },
    {
      provide: RestrictClientInfosRepositoryGateway,
      useClass: KnexRestrictClientInfoRepository,
    },
    {
      provide: ClientAttachmentsRepositoryGateway,
      useClass: KnexClientAttachmentRepository,
    },
    {
      provide: ServiceOrderRepositoryGateway,
      useClass: KnexServiceOrderRepository,
    },
    {
      provide: ProspectRepositoryGateway,
      useClass: KnexProspectRepository,
    },
    {
      provide: ClientOnlineRoomRepositoryGateway,
      useClass: KnexClientOnlineRoomRepository,
    },
    {
      provide: AttendanceTaskRepositoryGateway,
      useClass: KnexAttendanceTaskRepository,
    },
    {
      provide: AttendanceTaskRepositoryGateway,
      useClass: KnexAttendanceTaskRepository,
    },
    {
      provide: ClientsRepositoryGateway,
      useClass: KnexClientsRepository,
    },
    {
      provide: ClientNotificationRepositoryGateway,
      useClass: KnexClientNotificationRepository,
    },
    {
      provide: ChatMessageRepositoryGateway,
      useClass: KnexChatMessageRepository,
    },
    {
      provide: ClientDocumentModelRepositoryGateway,
      useClass: KnexClientDocumentModelRepository,
    },
    {
      provide: OfficeHoursRepositoryGateway,
      useClass: KnexOfficeHoursRepository,
    },
    {
      provide: ClientCustomFieldRepositoryGateway,
      useClass: KnexClientCustomFieldRepository,
    },
    {
      provide: CognitoUserRepositoryGateway,
      useClass: KnexCognitoUserRepository,
    },
    {
      provide: LogStockMoveRepositoryGateway,
      useClass: KnexLogStockMoveRepository,
    },
    {
      provide: LogAttendanceRepositoryGateway,
      useClass: KnexLogAttendanceRepository,
    },
    {
      provide: ClientSignRepositoryGateway,
      useClass: KnexClientSignRepository,
    },
    {
      provide: FileRepositoryGateway,
      useClass: KnexFileRepository,
    },
    {
      provide: MoveRepositoryGateway,
      useClass: KnexMoveRepository,
    },
    {
      provide: FavoriteRepositoryGateway,
      useClass: KnexFavoriteRepository,
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
    ConsumptionExtractsRepositoryGateway,
    RestrictClientInfosRepositoryGateway,
    ClientAttachmentsRepositoryGateway,
    ServiceOrderRepositoryGateway,
    ProspectRepositoryGateway,
    ClientOnlineRoomRepositoryGateway,
    AttendanceTaskRepositoryGateway,
    ClientsRepositoryGateway,
    ClientNotificationRepositoryGateway,
    ChatMessageRepositoryGateway,
    ClientDocumentModelRepositoryGateway,
    OfficeHoursRepositoryGateway,
    ClientCustomFieldRepositoryGateway,
    CognitoUserRepositoryGateway,
    LogStockMoveRepositoryGateway,
    LogAttendanceRepositoryGateway,
    ClientSignRepositoryGateway,
    FileRepositoryGateway,
    MoveRepositoryGateway,
    FavoriteRepositoryGateway,
  ],
})
export class DatabaseModule {}
