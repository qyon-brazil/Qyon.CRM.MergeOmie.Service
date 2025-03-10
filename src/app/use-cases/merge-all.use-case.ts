import { ClientService } from 'src/infra/database/services/client.service';
import { Injectable, Logger } from '@nestjs/common';
import { ClientRepositoryGateway } from '../gateways/client.repository.gateway';

@Injectable()
export class MergeAllUseCase {
  private readonly logger = new Logger(MergeAllUseCase.name);

  constructor(
    private readonly clientService: ClientService,
    private readonly clientRepository: ClientRepositoryGateway,
  ) {}

  async execute() {
    const duplicates = await this.clientService.getDuplicatesClients();

    const cnpjs = Object.keys(duplicates);

    let clientIds = [];
    for (const cnpj of cnpjs) {
      const omieClient = duplicates[cnpj].omieClient;

      const newClientId = omieClient.CD_CLIENTE;

      this.logger.log(`[${cnpj}]: Started`);

      for (const internalClient of duplicates[cnpj].interns) {
        const oldClientId = internalClient.CD_CLIENTE;

        this.logger.log(
          `[${cnpj}]: Merging client ${internalClient.CD_CLIENTE}`,
        );

        await this.clientService.changeAllAttendancesClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllCalendarEventsClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllClientTagsClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllStocksClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllNetPromoterScoreVotesClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllContactsClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllClientEmailAccountConfigsClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllClientGroupsClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllSuggestionsClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllTimeInChatRoomClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllChatControlClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllClientAreaNotificationClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllClientConsumptionClient({
          newClientId,
          oldClientId,
        });

        await this.clientService.changeAllConsumptionExtractClient({
          newClientId,
          oldClientId,
        });

        clientIds.push(oldClientId);

        this.logger.log(
          `[${cnpj}]: client ${internalClient.CD_CLIENTE} has been merged`,
        );
      }

      this.logger.log(`[${cnpj}]: Finished`);
    }

    // for (const clientId of clientIds) {
    //   await this.clientRepository.deleteClientById(clientId);
    //   this.logger.log(`[${clientId}]: has been deleted`);
    // }

    this.logger.log(clientIds.join(','));
  }
}
