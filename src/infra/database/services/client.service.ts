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
}
