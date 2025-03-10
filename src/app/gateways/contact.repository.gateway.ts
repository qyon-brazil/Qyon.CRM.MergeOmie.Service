export abstract class ContactsRepositoryGateway {
  abstract changeAllContactsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
