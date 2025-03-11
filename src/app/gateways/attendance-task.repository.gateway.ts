export abstract class AttendanceTaskRepositoryGateway {
    abstract changeAllAttendanceTasksClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  