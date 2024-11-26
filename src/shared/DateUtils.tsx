export class DateUtils {
  public static GetCurrentDateAsString(): string {
    const currentDate: Date = new Date();

    const formattedDateTime: string = currentDate.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formattedDateTime;
  }

  public static GetCurrentDate(): Date {
    return new Date();
  }

  public static GetCurrentDateISO() {
    const currentDate = new Date();

    const datePart = currentDate.toISOString().split("T")[0];

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${datePart}T${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  }
}
