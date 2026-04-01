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

// export function mapBookingData(data: RealBooking[]): DemoBooking[] {
//   return data.flatMap((item) =>
//     item.bookingDetails.map((b) => ({
//       travelDate: new Date(b.travelDate).toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       }),
//       reference: item.reference,
//       optionName: b.optionName,
//       type: b.type,
//       startTime: new Date(b.startTime).toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//       }),
//       duration: b.duration,
//       guests: `${b.guest.adult} Adult ${b.guest.child} Child ${b.guest.infant} Infant`,
//       sold: { cost: b.price.cost, sale: b.price.sell },
//       confirmation: b.confirmationNo,
//       supplier: item.supplierDetail.map((s) => s.supplierName).join(', '),
//       status: b.status,
//       user: item.user,
//       provider: item.agentDetail.map((a) => a.agentName).join(', '),
//       bookingId:b.bookingId
//     })),
//   );
// }

export function mapBookingData(data: any[]): DemoBooking[] {
  return data.flatMap((item) =>
    item.bookingDetails.map((b: any) => ({
      travelDate: new Date(b.travelDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      reference: item.reference,
      optionName: b.optionName,
      type: b.type,
      startTime: new Date(`1970-01-01T${convertTo24Hour(b.startTime)}`).toLocaleTimeString(
        'en-US',
        {
          hour: '2-digit',
          minute: '2-digit',
        },
      ),
      duration: b.duration,
      guests: `${b.guest.adult} Adult ${b.guest.child} Child ${b.guest.infant} Infant`,
      sold: { cost: b.price.cost, sale: b.price.sell },
      confirmation: b.confirmationNo,
      supplier: item.supplierDetail.map((s: any) => s.supplierName).join(', '),
      status: b.status,
      user: item.user,
      provider: item.agentDetail.map((a: any) => a.agentName).join(', '),
      bookingId: b.bookingId,
    })),
  );
}

// helper for "12:30 PM" → "12:30:00"
function convertTo24Hour(time: string): string {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${minutes}:00`;
}
