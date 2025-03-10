export abstract class CalendarEventRepositoryGateway {
  abstract changeAllCalendarEventsClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}
