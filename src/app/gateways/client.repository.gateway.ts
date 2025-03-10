export abstract class ClientRepositoryGateway {
  abstract getAllOmieClients(): Promise<any>;
  abstract getClientsByCpfCnpj(cpfCnpj: string): Promise<any>;
  abstract deleteClientById(clientId: number): Promise<void>;
}
