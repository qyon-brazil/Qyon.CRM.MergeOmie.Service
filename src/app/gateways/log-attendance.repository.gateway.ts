export abstract class LogAttendanceRepositoryGateway {
    abstract changeAllLogAttendancesClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  