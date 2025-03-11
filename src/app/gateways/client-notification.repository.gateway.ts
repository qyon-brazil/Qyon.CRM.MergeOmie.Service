export abstract class ClientNotificationRepositoryGateway {
    abstract changeAllClientNotificationsClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }