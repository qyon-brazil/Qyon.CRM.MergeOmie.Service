import { Injectable, Logger } from '@nestjs/common';
import { AttendanceRepositoryGateway } from 'src/app/gateways/attendance.repository.gateway';
import { CalendarEventRepositoryGateway } from 'src/app/gateways/calendar-event.repository.gateway';
import { ClientRepositoryGateway } from 'src/app/gateways/client.repository.gateway';
import { ClientTagsRepositoryGateway } from 'src/app/gateways/client-tag-repository.gateway';
import { ContactsRepositoryGateway } from 'src/app/gateways/contact.repository.gateway';
import { NetPromoterScoreVotesRepositoryGateway } from 'src/app/gateways/net-promoter-score-vote.repository.gateway';
import { StocksRepositoryGateway } from 'src/app/gateways/stock.repository.gateway';
import { ClientEmailAccountConfigRepositoryGateway } from 'src/app/gateways/client-email-account-config.repository.gateway';
import { ClientGroupRepositoryGateway } from 'src/app/gateways/client-group.repository.gateway';
import { SuggestionsRepositoryGateway } from 'src/app/gateways/suggestion.repository.gateway';
import { ProposalsRepositoryGateway } from 'src/app/gateways/proposal.repository.gateway';
import { TimeInChatRoomsRepositoryGateway } from 'src/app/gateways/time-in-chat-room.repository.gateway';
import { ChatControlsRepositoryGateway } from 'src/app/gateways/chat-control.repository.gateway';
import { ClientAreaNotificationsRepositoryGateway } from 'src/app/gateways/client-area-notification.repository.gateway';
import { ClientConsumptionsRepositoryGateway } from 'src/app/gateways/client-consumption.repository.gateway';
import { ConsumptionExtractsRepositoryGateway } from 'src/app/gateways/consumption-extract.repository.gateway';
import { RestrictClientInfosRepositoryGateway } from 'src/app/gateways/restrict-client-info.repository.gateway';
import { ClientAttachmentsRepositoryGateway } from 'src/app/gateways/client-attachment.repository.gateway';
import { ServiceOrderRepositoryGateway } from 'src/app/gateways/service-order.repository.gateway';
import { ProspectRepositoryGateway } from 'src/app/gateways/prospect.repository.gateway';
import { ClientOnlineRoomRepositoryGateway } from 'src/app/gateways/client-online-room.repository.gateway';
import { AttendanceTaskRepositoryGateway } from 'src/app/gateways/attendance-task.repository.gateway';
import { ClientNotificationRepositoryGateway } from 'src/app/gateways/client-notification.repository.gateway';
import { ChatMessageRepositoryGateway } from 'src/app/gateways/chat-message.repository.gateway';
import { OfficeHoursRepositoryGateway } from 'src/app/gateways/office-hours.repository.gateway';
import { ClientCustomFieldRepositoryGateway } from 'src/app/gateways/client-custom-field.repository.gateway';
import { CognitoUserRepositoryGateway } from 'src/app/gateways/cognito-user.repository.gateway';
import { LogStockMoveRepositoryGateway } from 'src/app/gateways/log-stock-move.repository.gateway';
import { LogAttendanceRepositoryGateway } from 'src/app/gateways/log-attendance.repository.gateway';
import { ClientSignRepositoryGateway } from 'src/app/gateways/client-sign.repository.gateway';
import { FileRepositoryGateway } from 'src/app/gateways/file.repository.gateway';
import { MoveRepositoryGateway } from 'src/app/gateways/move.repository.gateway';
import { FavoriteRepositoryGateway } from 'src/app/gateways/favorite.repository.gateway';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    private readonly clientRepository: ClientRepositoryGateway,
    private readonly attendanceRepository: AttendanceRepositoryGateway,
    private readonly calendarEventRepository: CalendarEventRepositoryGateway,
    private readonly clientTagsRepository: ClientTagsRepositoryGateway,
    private readonly stockRepository: StocksRepositoryGateway,
    private readonly netPromoterScoreVoteRepository: NetPromoterScoreVotesRepositoryGateway,
    private readonly contactRepository: ContactsRepositoryGateway,
    private readonly clientEmailAccountConfig: ClientEmailAccountConfigRepositoryGateway,
    private readonly clientGroupRepository: ClientGroupRepositoryGateway,
    private readonly suggestionRepository: SuggestionsRepositoryGateway,
    private readonly proposalRepository: ProposalsRepositoryGateway,
    private readonly timeInChatRepository: TimeInChatRoomsRepositoryGateway,
    private readonly chatControlRepository: ChatControlsRepositoryGateway,
    private readonly clientAreaNotificationRepository: ClientAreaNotificationsRepositoryGateway,
    private readonly clientConsumptionRepository: ClientConsumptionsRepositoryGateway,
    private readonly consumptionExtractRepository: ConsumptionExtractsRepositoryGateway,
    private readonly restrictClientInfoRepository: RestrictClientInfosRepositoryGateway,
    private readonly clientAttachmentRepository: ClientAttachmentsRepositoryGateway,
    private readonly serviceOrdersRepository: ServiceOrderRepositoryGateway,
    private readonly prospectRepository: ProspectRepositoryGateway,
    private readonly clientOnlineRoomRepository: ClientOnlineRoomRepositoryGateway,
    private readonly attendanceTaskRepository: AttendanceTaskRepositoryGateway,
    private readonly clientNotificationRepository: ClientNotificationRepositoryGateway,
    private readonly chatMessageRepository: ChatMessageRepositoryGateway,
    private readonly officeHoursRepository: OfficeHoursRepositoryGateway,
    private readonly clientCustomFieldRepository: ClientCustomFieldRepositoryGateway,
    private readonly cognitoUserRepository: CognitoUserRepositoryGateway,
    private readonly logStockMoveRepository: LogStockMoveRepositoryGateway,
    private readonly logAttendanceRepository: LogAttendanceRepositoryGateway,
    private readonly clientSignRepository: ClientSignRepositoryGateway,
    private readonly fileRepository: FileRepositoryGateway,
    private readonly moveRepository: MoveRepositoryGateway,
    private readonly favoriteRepository: FavoriteRepositoryGateway,
  ) {}

  async getDuplicatesClients() {
    this.logger.log('[getDuplicatesClients]: execute');

    const data = await this.clientRepository.getAllOmieClients();

    const duplicates: Record<string, { omieClient: any; interns: any }> = {};
    console.log(
      data
        .sort((a, b) => a.CPFCNPJ.length - b.CPFCNPJ.length)
        .map((a) => a.CPFCNPJ),
    );

    let duplicatesCount = 0;

    for (let i = 0; i < data.length; i++) {
      const omieClient = data[i];

      this.logger.log(
        `[getDuplicatesClients][${omieClient.CPFCNPJ}]: searching...`,
      );

      const notOmieClients = await this.clientRepository
        .getClientsByCpfCnpj(omieClient.CPFCNPJ)
        .then((clients) => clients.filter((client) => client.APP_KEY === null));

      if (notOmieClients.length > 0 && !!omieClient.CPFCNPJ) {
        duplicates[omieClient.CPFCNPJ] = {
          omieClient: omieClient,
          interns: notOmieClients,
        };
        this.logger.log(
          `[getDuplicatesClients][${omieClient.CPFCNPJ}]: ${notOmieClients.length} found${notOmieClients.length > 1 ? 's' : ''}`,
        );
        duplicatesCount += notOmieClients.length;
      } else {
        this.logger.log(
          `[getDuplicatesClients][${omieClient.CPFCNPJ}]: no duplicates`,
        );
      }
    }

    this.logger.log(
      `[getDuplicatesClients]: ${duplicatesCount} item${duplicatesCount > 1 ? 's' : ''}.`,
    );

    return duplicates;
  }

  async changeAllAttendancesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllAttendancesClient]: changing all attendances of ${oldClientId} to ${newClientId}`,
    );

    const attendanceIds =
      await this.attendanceRepository.changeAllAttendancesClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllAttendancesClient]: ${attendanceIds.length} attendances => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllCalendarEventsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllCalendarEventClient]: changing all calendar events of ${oldClientId} to ${newClientId}`,
    );

    const calendarEventIds =
      await this.calendarEventRepository.changeAllCalendarEventsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllCalendarEventClient]: ${calendarEventIds.length} calendar events => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientTagsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientTagsClient]: changing all client tags of ${oldClientId} to ${newClientId}`,
    );

    const clientTagsIds =
      await this.clientTagsRepository.changeAllClientTagsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllClientTagsClient]: ${clientTagsIds.length} client tags => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllStocksClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllStocksClient]: changing all stocks of ${oldClientId} to ${newClientId}`,
    );

    const stockIds = await this.stockRepository.changeAllStocksClient({
      newClientId,
      oldClientId,
    });

    this.logger.log(
      `[changeAllStocksClient]: ${stockIds.length} stocks => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllNetPromoterScoreVotesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllNetPromoterScoreVotesClient]: changing all net promoter score votes of ${oldClientId} to ${newClientId}`,
    );

    const voteIds =
      await this.netPromoterScoreVoteRepository.changeAllNetPromoterScoreVoteClient(
        {
          newClientId,
          oldClientId,
        },
      );

    this.logger.log(
      `[changeAllNetPromoterScoreVotesClient]: ${voteIds.length} net promoter score votes => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllContactsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllContactsClient]: changing all contacts of ${oldClientId} to ${newClientId}`,
    );

    const contactIds = await this.contactRepository.changeAllContactsClient({
      newClientId,
      oldClientId,
    });

    this.logger.log(
      `[changeAllContactsClient]: ${contactIds.length} contacts => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientEmailAccountConfigsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientEmailAccountConfigsClient]: changing all email configurations of ${oldClientId} to ${newClientId}`,
    );

    const emailConfigIds =
      await this.clientEmailAccountConfig.changeAllClientEmailAccountConfigsClient(
        {
          newClientId,
          oldClientId,
        },
      );

    this.logger.log(
      `[changeAllClientEmailAccountConfigsClient]: ${emailConfigIds.length} email configurations => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientGroupsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientGroupsClient]: changing all client groups of ${oldClientId} to ${newClientId}`,
    );

    const clientGroupIds =
      await this.clientGroupRepository.changeAllClientGroupsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllClientGroupsClient]: ${clientGroupIds.length} client groups => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllSuggestionsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllSuggestionsClient]: changing all suggestions of ${oldClientId} to ${newClientId}`,
    );

    const suggestionIds =
      await this.suggestionRepository.changeAllSuggestionsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllSuggestionsClient]: ${suggestionIds.length} suggestions => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllProposalsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllProposalsClient]: changing all proposals of ${oldClientId} to ${newClientId}`,
    );

    const proposalIds = await this.proposalRepository.changeAllProposalsClient({
      newClientId,
      oldClientId,
    });

    this.logger.log(
      `[changeAllProposalsClient]: ${proposalIds.length} proposals => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllTimeInChatRoomClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllTimeInChatRoomClient]: changing all time in chat room of ${oldClientId} to ${newClientId}`,
    );

    const chatTimeRoomIds =
      await this.timeInChatRepository.changeAllTimeInChatRoomsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllTimeInChatRoomClient]: ${chatTimeRoomIds.length} time in chat room => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllChatControlClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllChatControlClient]: changing all chat control of ${oldClientId} to ${newClientId}`,
    );

    const chatControlIds =
      await this.chatControlRepository.changeAllChatControlsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllChatControlClient]: ${chatControlIds.length} chat control => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientAreaNotificationClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientAreaNotificationClient]: changing all client area notifications of ${oldClientId} to ${newClientId}`,
    );

    const clientAreaNotificationIds =
      await this.clientAreaNotificationRepository.changeAllClientAreaNotificationsClient(
        {
          newClientId,
          oldClientId,
        },
      );

    this.logger.log(
      `[changeAllClientAreaNotificationClient]: ${clientAreaNotificationIds.length} client area notifications => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientConsumptionClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientConsumptionClient]: changing all client consumptions of ${oldClientId} to ${newClientId}`,
    );

    const clientConsumptionIds =
      await this.clientConsumptionRepository.changeAllClientConsumptionsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllClientConsumptionClient]: ${clientConsumptionIds.length} client consumptions => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllConsumptionExtractClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllConsumptionExtractClient]: changing all consumption extracts of ${oldClientId} to ${newClientId}`,
    );

    const consumptionExtractIds =
      await this.consumptionExtractRepository.changeAllConsumptionExtractsClient(
        {
          newClientId,
          oldClientId,
        },
      );

    this.logger.log(
      `[changeAllConsumptionExtractClient]: ${consumptionExtractIds.length} consumption extracts => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllRestrictClientInfoClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllRestrictClientInfoClient]: changing all restrict client infos of ${oldClientId} to ${newClientId}`,
    );

    const restrictClientInfoIds =
      await this.restrictClientInfoRepository.changeAllRestrictClientInfosClient(
        {
          newClientId,
          oldClientId,
        },
      );

    this.logger.log(
      `[changeAllRestrictClientInfoClient]: ${restrictClientInfoIds.length} restrict client infos => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientAttachmentClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientAttachmentClient]: changing all client attachments of ${oldClientId} to ${newClientId}`,
    );

    const clientAttachmentIds =
      await this.clientAttachmentRepository.changeAllClientAttachmentsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllClientAttachmentClient]: ${clientAttachmentIds.length} client attachments => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllServiceOrdersClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllServiceOrdersClient]: changing all service orders of ${oldClientId} to ${newClientId}`,
    );

    const serviceOrdersIds =
      await this.serviceOrdersRepository.changeAllServiceOrdersClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllServiceOrdersClient]: ${serviceOrdersIds.length} service orders => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllProspectsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllProspectsClient]: changing all prospects of ${oldClientId} to ${newClientId}`,
    );

    const prospectsIds = await this.prospectRepository.changeAllProspectsClient(
      {
        newClientId,
        oldClientId,
      },
    );

    this.logger.log(
      `[changeAllProspectsClient]: ${prospectsIds.length} prospects => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientOnlineRoomsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientOnlineRoomsClient]: changing all client online rooms of ${oldClientId} to ${newClientId}`,
    );

    const clientOnlineRoomsIds =
      await this.clientOnlineRoomRepository.changeAllClientOnlineRoomsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllClientOnlineRoomsClient]: ${clientOnlineRoomsIds.length} client online rooms => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllAttendanceTasksClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllAttendanceTasksClient]: changing all attendance tasks of ${oldClientId} to ${newClientId}`,
    );

    const attendanceTasksIds =
      await this.attendanceTaskRepository.changeAllAttendanceTasksClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllAttendanceTasksClient]: ${attendanceTasksIds.length} attendance tasks => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientNotificationsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientNotificationsClient]: changing all client notificatons of ${oldClientId} to ${newClientId}`,
    );

    const clientNotificatonsIds =
      await this.clientNotificationRepository.changeAllClientNotificationsClient(
        {
          newClientId,
          oldClientId,
        },
      );

    this.logger.log(
      `[changeAllClientNotificationsClient]: ${clientNotificatonsIds.length} client notificatons => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllChatMessagesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllChatMessagesClient]: changing all chat messages of ${oldClientId} to ${newClientId}`,
    );

    const chatMessagesIds =
      await this.chatMessageRepository.changeAllChatMessagesClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllChatMessagesClient]: ${chatMessagesIds.length} chat messages => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllOfficeHoursClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllOfficeHoursClient]: changing all office hours of ${oldClientId} to ${newClientId}`,
    );

    const officeHoursIds =
      await this.officeHoursRepository.changeAllOfficeHoursClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllOfficeHoursClient]: ${officeHoursIds.length} office hours => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientCustomFieldsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientCustomFieldsClient]: changing all client custom fields of ${oldClientId} to ${newClientId}`,
    );

    const clientCustomFieldsIds =
      await this.clientCustomFieldRepository.changeAllClientCustomFieldsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllClientCustomFieldsClient]: ${clientCustomFieldsIds.length} client custom fields => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllCognitoUsersClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllCognitoUsersClient]: changing all cognito users of ${oldClientId} to ${newClientId}`,
    );

    const cognitoUsersIds =
      await this.cognitoUserRepository.changeAllCognitoUsersClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllCognitoUsersClient]: ${cognitoUsersIds.length} cognito users => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllLogStockMovesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllLogStockMovesClient]: changing all log stock moves of ${oldClientId} to ${newClientId}`,
    );

    const logStockMovesIds =
      await this.logStockMoveRepository.changeAllLogStockMovesClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllLogStockMovesClient]: ${logStockMovesIds.length} log stock moves => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllLogAttendancesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllLogAttendancesClient]: changing all log attendances of ${oldClientId} to ${newClientId}`,
    );

    const logAttendancesIds =
      await this.logAttendanceRepository.changeAllLogAttendancesClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllLogAttendancesClient]: ${logAttendancesIds.length} log attendances => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllClientSignsClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllClientSignsClient]: changing all client signs of ${oldClientId} to ${newClientId}`,
    );

    const clientSignsIds =
      await this.clientSignRepository.changeAllClientSignsClient({
        newClientId,
        oldClientId,
      });

    this.logger.log(
      `[changeAllClientSignsClient]: ${clientSignsIds.length} client signs => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllFilesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllFilesClient]: changing all files of ${oldClientId} to ${newClientId}`,
    );

    const filesIds = await this.fileRepository.changeAllFilesClient({
      newClientId,
      oldClientId,
    });

    this.logger.log(
      `[changeAllFilesClient]: ${filesIds.length} files => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllMovesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllMovesClient]: changing all moves of ${oldClientId} to ${newClientId}`,
    );

    const movesIds = await this.moveRepository.changeAllMovesClient({
      newClientId,
      oldClientId,
    });

    this.logger.log(
      `[changeAllMovesClient]: ${movesIds.length} moves => ${newClientId}`,
    );

    return { message: 'ok' };
  }

  async changeAllFavoritesClient({
    oldClientId,
    newClientId,
  }: {
    oldClientId: number;
    newClientId: number;
  }) {
    this.logger.log(
      `[changeAllFavoritesClient]: changing all favorites of ${oldClientId} to ${newClientId}`,
    );

    const favoritesIds = await this.favoriteRepository.changeAllFavoritesClient(
      {
        newClientId,
        oldClientId,
      },
    );

    this.logger.log(
      `[changeAllFavoritesClient]: ${favoritesIds.length} favorites => ${newClientId}`,
    );

    return { message: 'ok' };
  }
}
