import { formatDateToYYYYMMDD } from '../../helper/b2b-dashboard.helper';

interface Booking {
  bookingDetails: {
    startTime: string;
  }[];
}

export function availableDates(data: Booking[]): string[] {
  return data.flatMap(
    (item) => item.bookingDetails?.map((b) => formatDateToYYYYMMDD(b.startTime)) ?? [],
  );
}
