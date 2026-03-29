export interface Booking {
  travelDate: string;
  reference: string;
  optionName: string;
  type: string;
  startTime: string;
  duration: string;
  guests: string;
  sold: {
    cost: number;
    sale: number;
  };
  confirmation: string;
  supplier: string;
  status: 'Pending' | 'Accepted' | 'Cancelled';
  user: string;
  provider: string;
}

export interface RealBooking {
  reference: string;
  user: string;
  agentDetail: { agentId: number; agentName: string }[];
  supplierDetail: { supplierId: number; supplierName: string }[];
  bookingDetails: {
    bookingId: number;
    detailId: number;
    optionId: number;
    optionName: string;
    guestName: string;
    type: string;
    startTime: string;
    travelDate: string;
    duration: string;
    confirmationNo: string;
    guest: { adult: number; child: number; infant: number };
    price: { cost: number; sell: number };
    status: string;
  }[];
}

export interface DemoBooking {
  travelDate: string;
  reference: string;
  optionName: string;
  type: string;
  startTime: string;
  duration: string;
  guests: string;
  sold: { cost: number; sale: number };
  confirmation: string;
  supplier: string;
  status: string;
  user: string;
  provider: string;
  bookingId: number;
}
