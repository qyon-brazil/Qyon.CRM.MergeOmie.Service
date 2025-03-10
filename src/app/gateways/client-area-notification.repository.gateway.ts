export abstract class ClientAreaNotificationsRepositoryGateway {
  abstract changeAllClientAreaNotificationsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
