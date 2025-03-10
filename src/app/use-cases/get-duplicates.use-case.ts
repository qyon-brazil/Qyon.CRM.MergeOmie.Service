import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/infra/database/services/client.service';

@Injectable()
export class GetDuplicatesUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute() {
    return this.clientService.getDuplicatesClients();
  }
}
