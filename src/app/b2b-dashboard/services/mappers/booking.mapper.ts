import { DemoBooking, RealBooking } from '../../../shared/components/table/table.types';
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

export function mapBookingData(data: RealBooking[]): DemoBooking[] {
  const checkProcessedData = data.flatMap((item) =>
    item.bookingDetails.map((b) => ({
      travelDate: new Date(b.travelDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      reference: item.reference,
      optionName: b.optionName,
      type: b.type,
      startTime: new Date(b.startTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      duration: b.duration,
      guests: `${b.guest.adult} Adult ${b.guest.child} Child ${b.guest.infant} Infant`,
      sold: { cost: b.price.cost, sale: b.price.sell },
      confirmation: b.confirmationNo,
      supplier: item.supplierDetail.map((s) => s.supplierName).join(', '),
      status: b.status,
      user: item.user,
      provider: item.agentDetail.map((a) => a.agentName).join(', '),
    })),
  );
  console.log(checkProcessedData)
  return data.flatMap((item) =>
    item.bookingDetails.map((b) => ({
      travelDate: new Date(b.travelDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      reference: item.reference,
      optionName: b.optionName,
      type: b.type,
      startTime: new Date(b.startTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      duration: b.duration,
      guests: `${b.guest.adult} Adult ${b.guest.child} Child ${b.guest.infant} Infant`,
      sold: { cost: b.price.cost, sale: b.price.sell },
      confirmation: b.confirmationNo,
      supplier: item.supplierDetail.map((s) => s.supplierName).join(', '),
      status: b.status,
      user: item.user,
      provider: item.agentDetail.map((a) => a.agentName).join(', '),
    })),
  );
}
