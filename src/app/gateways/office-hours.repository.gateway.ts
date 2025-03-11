export abstract class OfficeHoursRepositoryGateway {
    abstract changeAllOfficeHoursClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  