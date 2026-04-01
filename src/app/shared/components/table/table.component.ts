import { Component, input, output, signal, computed, model, effect, inject } from '@angular/core';
import { Booking, DemoBooking, RealBooking } from './table.types';
import { ModalComponent } from '../modal/modal.component';
import { IconButtonPopup } from '../button/icon-button-popup/icon-button-popup';
import { MultiSelect, MultiSelectOption } from '../select/multi-select/multi-select.component';
import { NotificationIconComponent } from '../../../../icons/NotificationIcon';
import { EmailIconComponent } from '../../../../icons/EmailIcon';
import { WhatsappIconComponent } from '../../../../icons/WhatsappIcon';
import { LogsView } from '../composit/logs-view/logs-view';
import { Remarks } from '../composit/remarks/remarks';
import { WhatsappReminder } from '../macro/whatsapp-reminder/whatsapp-reminder';
import { EmailReminder } from '../macro/email-reminder/email-reminder';
import { mapBookingData } from '../../../b2b-dashboard/services/mappers/booking.mapper';
import { BookingDetailsFacade } from '../../../b2b-dashboard/services/facades/bookingDetails.facade';
import { identifierToKeywordKind } from 'typescript';
import { SupplierDetails } from "../composit/supplier-details/supplier-details";

type ModalType = 'whatsapp-reminder' | 'email-reminder' | 'log' | 'remarks' | 'supplierDetails' | null;

@Component({
  selector: 'app-table',
  imports: [
    ModalComponent,
    IconButtonPopup,
    MultiSelect,
    NotificationIconComponent,
    EmailIconComponent,
    WhatsappIconComponent,
    LogsView,
    Remarks,
    WhatsappReminder,
    EmailReminder,
    SupplierDetails
],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  columns = input<{ key: string; label: string }[]>([]);
  columnVisibility = input<Record<string, boolean>>({});
  selectedReferences = new Set<string>();
  selectionChange = output<string[]>();
  referenceDetailsModalOpen = signal<boolean>(false);
  sliderSelectedDate = input<Date | null>(null);
  activeStatus = input<string | null>(null);
  statusWiseRowCountChange = output<Record<string, number>>();
  tableTravelStatus = output<string>();
  openDetail = output<string>();
  bookingData = input<RealBooking[]>([]);
  showOptionHeaderSelect = signal(false);
  selectedOptions = signal<string[]>([]);

  bookingDetailsFacade = inject(BookingDetailsFacade);

  tableStatus(status: string): void {
    this.tableTravelStatus.emit(status);
  }

  constructor() {
    console.log('Slider selected date in table component:', this.sliderSelectedDate());
    console.log('DemoData', this.bookingData());
    effect(() => {
      console.log(this.bookingData());
    });
  }

  realBookingData = [
    {
      reference: 'AGT30697803250276',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 21,
          supplierName: 'Ossama Said',
        },
      ],
      bookingDetails: [
        {
          bookingId: 1,
          detailId: 1,
          optionId: 5,
          optionName: 'Sunset Luxury Yacht Tour with Barbeque Meal',
          guestName: 'Mr. vijay test',
          type: 'Sharing',
          startTime: '12:30 PM',
          travelDate: '2025-09-25T00:00:00',
          duration: '2 Hours',
          confirmationNo: 'Test123',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 10.0,
            sell: 20.0,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT30697803250435',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 12,
          supplierName: 'Resort World One',
        },
      ],
      bookingDetails: [
        {
          bookingId: 2,
          detailId: 2,
          optionId: 6,
          optionName: 'Yacht Private',
          guestName: 'Mr. vijay test',
          type: 'Private',
          startTime: '05:30 PM',
          travelDate: '2025-08-07T00:00:00',
          duration: '5 Hours',
          confirmationNo: 'Test1456',
          guestInfo: '5 Adult,2 Child,0 Infant',
          guest: {
            adult: 5,
            child: 2,
            infant: 0,
          },
          price: {
            cost: 110.0,
            sell: 120.0,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT306972303250210',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 3,
          detailId: 3,
          optionId: 13,
          optionName: 'Yacht Sharing trip',
          guestName: 'Mr. Vijay Test',
          type: 'Sharing',
          startTime: '04:30 PM',
          travelDate: '2025-08-07T00:00:00',
          duration: '2 Hours',
          confirmationNo: 'hipi',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 10.25,
            sell: 10.25,
          },
          status: 'Cancelled',
        },
      ],
    },
    {
      reference: 'AGT306972703250726',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 78,
          supplierName: 'Jhonathan Herrera',
        },
      ],
      bookingDetails: [
        {
          bookingId: 4,
          detailId: 4,
          optionId: 22,
          optionName: 'Test Sharing Yacht',
          guestName: 'Ms. Khushbu Patel',
          type: 'Sharing',
          startTime: '12:00 AM',
          travelDate: '2025-07-10T22:30:00',
          duration: '2 Hours',
          confirmationNo: 'AR-122323',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 0.42,
            sell: 0.43,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT306972803250815',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 5,
          detailId: 5,
          optionId: 14,
          optionName: 'Yacht Trip Private Test',
          guestName: 'Ms. Kamini Test',
          type: 'Private',
          startTime: '10:00 AM',
          travelDate: '2025-10-15T00:00:00',
          duration: '1 Hours',
          confirmationNo: '12112sdd12211',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 50.0,
            sell: 67.5,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT306972903250193',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 6,
          detailId: 6,
          optionId: 25,
          optionName: 'Private only Yacht test',
          guestName: 'Ms. Kamini Test',
          type: 'Private',
          startTime: '04:30 PM',
          travelDate: '2025-08-05T00:00:00',
          duration: '5 Hours',
          confirmationNo: 'testph',
          guestInfo: '1 Adult,1 Child,1 Infant',
          guest: {
            adult: 1,
            child: 1,
            infant: 1,
          },
          price: {
            cost: 25.0,
            sell: 25.0,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT30697104250292',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 85,
          supplierName: 'Vijay',
        },
      ],
      bookingDetails: [
        {
          bookingId: 7,
          detailId: 7,
          optionId: 13,
          optionName: 'Yacht Sharing trip 1',
          guestName: 'Ms. Kamini Test',
          type: 'Sharing',
          startTime: '01:00 AM',
          travelDate: '2025-06-25T00:00:00',
          duration: '6 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 7.7,
            sell: 10.25,
          },
          status: 'Pending',
        },
      ],
    },
    {
      reference: 'AGT30697104250455',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 8,
          detailId: 8,
          optionId: 19,
          optionName: 'Yacht Sharing trip 2',
          guestName: 'Ms. Kamini Test',
          type: 'Sharing',
          startTime: '02:00 AM',
          travelDate: '2025-08-05T00:00:00',
          duration: '1 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,1 Child,1 Infant',
          guest: {
            adult: 1,
            child: 1,
            infant: 1,
          },
          price: {
            cost: 31.55,
            sell: 31.55,
          },
          status: 'Pending',
        },
        {
          bookingId: 9,
          detailId: 9,
          optionId: 14,
          optionName: 'Yacht Trip Private Test',
          guestName: 'Ms. Kamini Test',
          type: 'Private',
          startTime: '12:00 AM',
          travelDate: '2025-08-12T00:00:00',
          duration: '1 Hours',
          confirmationNo: '',
          guestInfo: '6 Adult,0 Child,0 Infant',
          guest: {
            adult: 6,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 50.0,
            sell: 50.0,
          },
          status: 'Pending',
        },
      ],
    },
    {
      reference: 'AGT30697104250888',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 78,
          supplierName: 'Jhonathan Herrera',
        },
        {
          supplierId: 85,
          supplierName: 'Vijay',
        },
        {
          supplierId: 83,
          supplierName: 'Yacht For Testing',
        },
      ],
      bookingDetails: [
        {
          bookingId: 10,
          detailId: 10,
          optionId: 20,
          optionName: 'Yacht Sharing trip 3',
          guestName: 'Ms. Kamini Test',
          type: 'Sharing',
          startTime: '03:00 AM',
          travelDate: '2025-12-05T00:00:00',
          duration: '0 Hours',
          confirmationNo: '',
          guestInfo: '2 Adult,0 Child,0 Infant',
          guest: {
            adult: 2,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 23.9,
            sell: 24.5,
          },
          status: 'Cancelled',
        },
        {
          bookingId: 11,
          detailId: 11,
          optionId: 14,
          optionName: 'Yacht Trip Private Test',
          guestName: 'Ms. Kamini Test',
          type: 'Private',
          startTime: '12:00 AM',
          travelDate: '2025-08-07T00:00:00',
          duration: '1 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 49.9,
            sell: 50.0,
          },
          status: 'Pending',
        },
        {
          bookingId: 12,
          detailId: 12,
          optionId: 25,
          optionName: 'Private only Yacht test',
          guestName: 'Ms. Kamini Test',
          type: 'Private',
          startTime: '06:00 PM',
          travelDate: '2025-08-07T00:00:00',
          duration: '2 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 9.0,
            sell: 10.0,
          },
          status: 'Pending',
        },
      ],
    },
    {
      reference: 'AGT30697204250192',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 13,
          detailId: 13,
          optionId: 23,
          optionName: 'Test Private Yacht',
          guestName: 'Ms. Khushbu Patel',
          type: 'Private',
          startTime: '12:00 AM',
          travelDate: '2025-07-15T00:00:00',
          duration: '2 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 4.29,
            sell: 4.5,
          },
          status: 'Pending',
        },
      ],
    },
    {
      reference: 'AGT30697204250274',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 14,
          detailId: 14,
          optionId: 23,
          optionName: 'Test Private Yacht',
          guestName: 'Ms. Khushbu Patel',
          type: 'Private',
          startTime: '03:10 AM',
          travelDate: '2026-02-27T00:00:00',
          duration: '2 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 4.29,
            sell: 4.63,
          },
          status: 'Cancelled',
        },
      ],
    },
    {
      reference: 'AGT30697204250295',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 15,
          detailId: 15,
          optionId: 23,
          optionName: 'Test Private Yacht',
          guestName: 'Ms. Khushbu Patel',
          type: 'Private',
          startTime: '04:00 PM',
          travelDate: '2025-08-08T00:00:00',
          duration: '3 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 6.44,
            sell: 6.95,
          },
          status: 'Cancelled',
        },
      ],
    },
    {
      reference: 'AGT30697204250373',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 40055,
          agentName: 'KAMINIRK',
        },
      ],
      supplierDetail: [
        {
          supplierId: 78,
          supplierName: 'Jhonathan Herrera',
        },
      ],
      bookingDetails: [
        {
          bookingId: 16,
          detailId: 16,
          optionId: 23,
          optionName: 'Test Private Yacht',
          guestName: 'Ms. Khushbu Patel',
          type: 'Private',
          startTime: '12:00 AM',
          travelDate: '2025-07-19T00:00:00',
          duration: '3 Hours',
          confirmationNo: '878',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 6.42,
            sell: 6.89,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT33868204250816',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 43233,
          agentName: 'vijay',
        },
      ],
      supplierDetail: [
        {
          supplierId: 84,
          supplierName: 'Yacht Module Test',
        },
      ],
      bookingDetails: [
        {
          bookingId: 17,
          detailId: 17,
          optionId: 23,
          optionName: 'Test Private Yacht',
          guestName: 'Ms. Khushbu Patel',
          type: 'Private',
          startTime: '12:00 AM',
          travelDate: '2025-07-16T00:00:00',
          duration: '3 Hours',
          confirmationNo: 'Ar-TEST001212',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 6.44,
            sell: 7.08,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT069241404250655',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 15679,
          agentName: 'Ahmed Yaqoob',
        },
      ],
      supplierDetail: [
        {
          supplierId: 78,
          supplierName: 'Jhonathan Herrera',
        },
      ],
      bookingDetails: [
        {
          bookingId: 18,
          detailId: 18,
          optionId: 5,
          optionName: 'Sunset Luxury Yacht Tour with Barbeque Meal',
          guestName: 'Mr. adnantest test',
          type: 'Sharing',
          startTime: '05:30 PM',
          travelDate: '2025-08-07T00:00:00',
          duration: '2 Hours',
          confirmationNo: 'AR-08979789689768',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 128.9,
            sell: 130.0,
          },
          status: 'Accepted',
        },
      ],
    },
    {
      reference: 'AGT069241404250666',
      user: 'RaynaB2B',
      agentDetail: [
        {
          agentId: 15679,
          agentName: 'Ahmed Yaqoob',
        },
      ],
      supplierDetail: [
        {
          supplierId: 78,
          supplierName: 'Jhonathan Herrera',
        },
      ],
      bookingDetails: [
        {
          bookingId: 19,
          detailId: 19,
          optionId: 6,
          optionName: 'Yacht Private',
          guestName: 'Mr. adnantest test',
          type: 'Private',
          startTime: '12:00 PM',
          travelDate: '2025-04-24T00:00:00',
          duration: '3 Hours',
          confirmationNo: '',
          guestInfo: '1 Adult,0 Child,0 Infant',
          guest: {
            adult: 1,
            child: 0,
            infant: 0,
          },
          price: {
            cost: 450.0,
            sell: 495.0,
          },
          status: 'Cancelled',
        },
      ],
    },
  ];

  //    showing accept modal to save
  activeModal = signal<ModalType>(null);

  // demo data for showing the multiselect
  countryOptions: MultiSelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Brazil', value: 'br' },
    { label: 'India', value: 'in' },
    { label: 'China', value: 'cn' },
  ];

  // 🔹 Sorting state signals
  currentSortKey = signal<string>('travelDate');
  currentSortType = signal<'asc' | 'desc'>('asc');

  // 🔹 Map display labels to actual property keys
  private readonly keyMap: Record<string, string> = {
    'Travel Date': 'travelDate',
    Reference: 'reference',
    'Option Name': 'optionName',
    Type: 'type',
    'Start Time': 'startTime',
    Duration: 'duration',
    Guests: 'guests',
    Confirmation: 'confirmation',
    Supplier: 'supplier',
    Status: 'status',
    User: 'user',
    Provider: 'provider',
  };

  // updateStatusCounts(data: any[]): void {
  //   const counts: Record<string, number> = {};

  //   for (const row of data) {
  //     counts[row.status] = (counts[row.status] || 0) + 1;
  //   }

  //   this.statusWiseRowCountChange.emit(counts);
  // }

  updateStatusCounts(data: any[]) {
    const counts: Record<string, number> = {
      Pending: 0,
      Accepted: 0,
      Rejected: 0,
      Cancelled: 0,
      All: data.length, // 👈 always original length
    };

    for (const row of data) {
      if (counts[row.status] !== undefined) {
        counts[row.status]++;
      }
    }

    this.statusWiseRowCountChange.emit(counts);
  }

  // 🔹 Computed signal for sorted and filtered bookings
  bookings = computed(() => {
    const key = this.currentSortKey();
    const sortingType = this.currentSortType();
    const filterDate = this.sliderSelectedDate();
    const activeStatus = this.activeStatus();

    const direction = sortingType === 'asc' ? 1 : -1;
    const actualKey = this.keyMap[key] || key;
    console.log('booking data', this.bookingData());

    const processedData = mapBookingData(this.realBookingData);
    // const processedData = this.realBookingData

    console.log('processedData', processedData);

    let data = [...processedData];

    this.updateStatusCounts(data);

    // 🔹 Optional date filter (travelDate only)
    if (filterDate) {
      const targetDate = this.normalizeDate(filterDate);
      data = data.filter((booking) => {
        const bookingDate = this.normalizeDate(booking.travelDate);
        return bookingDate === targetDate;
      });
    }

    // 🔹 Optional status filter
    if (activeStatus && activeStatus !== 'All') {
      data = data.filter((booking) => booking.status === activeStatus);
      // this.statusWiseRowCountChange.emit(data.length);
    }

    // Sorting with type-safe key access
    data.sort((a, b) => {
      const valueA = a[actualKey as keyof typeof a];
      const valueB = b[actualKey as keyof typeof b];

      // Handle null/undefined values
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // Special handling for travelDate (format: "13 Oct 2024")
      if (actualKey === 'travelDate') {
        const dateA = new Date(valueA as string);
        const dateB = new Date(valueB as string);
        return (dateA.getTime() - dateB.getTime()) * direction;
      }

      // Special handling for duration (format: "4 Hours")
      if (actualKey === 'duration') {
        const numA = parseInt(String(valueA).split(' ')[0], 10);
        const numB = parseInt(String(valueB).split(' ')[0], 10);
        return (numA - numB) * direction;
      }

      // Special handling for nested sold object
      if (actualKey === 'cost' || actualKey === 'sale') {
        const soldA = (a as any).sold;
        const soldB = (b as any).sold;
        const numA = soldA?.[actualKey] ?? 0;
        const numB = soldB?.[actualKey] ?? 0;
        return (numA - numB) * direction;
      }

      // Date comparison
      if (valueA instanceof Date && valueB instanceof Date) {
        return (valueA.getTime() - valueB.getTime()) * direction;
      }

      // Number comparison
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * direction;
      }

      // Boolean comparison
      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        return (Number(valueA) - Number(valueB)) * direction;
      }

      // Default: Case-insensitive string comparison with locale support
      return (
        String(valueA).toLowerCase().localeCompare(String(valueB).toLowerCase(), undefined, {
          numeric: true,
          sensitivity: 'base',
        }) * direction
      );
    });

    return data;
  });

  isVisible(key: string): boolean {
    return this.columnVisibility()[key] !== false;
  }

  visibleColumnCount(): number {
    return this.columns().filter((col) => this.isVisible(col.key)).length;
  }

  // Date normalizer for filtering
  private normalizeDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  // 🔹 Method to trigger sorting (called from template)
  onSortColumn(key: string, sortingType: 'asc' | 'desc' = 'asc'): void {
    this.currentSortKey.set(key);
    this.currentSortType.set(sortingType);
  }

  getStatusClass(status: string): string {
    const map = {
      Pending: 'bg-orange-100 text-orange-600',
      Accepted: 'bg-green-100 text-green-600',
      Cancelled: 'bg-red-100 text-red-600',
    };
    return map[status as keyof typeof map] || '';
  }

  onReferenceDetails(booking: Booking): void {
    console.log('Reference details clicked:', booking);
    // Will open modal later
  }

  //for reference row Details modal operation
  isModalOpen = signal(false);
  isSubmitting = signal(false);

  remarks = signal<string>('');

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  // for the details button
  onDetailsButtonClick(ref: string, id: number) {
    this.bookingDetailsFacade.loadBookingDetails(id);
    this.openDetail.emit(ref);
  }

  submitModal(): void {
    console.log('submitted');
    this.isSubmitting.set(true);

    //for loading data
    setTimeout(() => {
      console.log('Submitted Remarks:', this.remarks());
      this.isSubmitting.set(false);
      this.isModalOpen.set(false);
    }, 1500);
  }

  //for table column supplier details modal operation
  isSupplierModalOpen = signal(false);
  isSupplierModalSubmitting = signal(false);
  supplierRemarks = signal<string>('Supplier');

  openSupplierDetailsModal(): void {
    console.log('checked');
    this.isSupplierModalOpen.set(true);
  }

  closeSupplierDetailsModal(): void {
    this.isSupplierModalOpen.set(false);
  }

  submitSupplierModalDetails(): void {
    console.log('submitted');
    this.isSubmitting.set(true);

    //for loading data
    setTimeout(() => {
      console.log('Submitted Remarks:', this.remarks());

      this.isSupplierModalSubmitting.set(false);
      this.isSupplierModalOpen.set(false);
    }, 1500);
  }

  isRowSelected(reference: string): boolean {
    return this.selectedReferences.has(reference);
  }

  toggleRowSelection(booking: DemoBooking, event: Event): void {
    // Prevent triggering row selection when clicking buttons
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }

    if (this.selectedReferences.has(booking.reference)) {
      this.selectedReferences.delete(booking.reference);
    } else {
      this.selectedReferences.add(booking.reference);
    }

    this.emitSelectionChange();
  }

  // for showing log details
  onLogClick(bookingId: number) {
    this.bookingDetailsFacade.loadLogs(bookingId);
    console.log('log details', this.bookingDetailsFacade.logDetails());
    this.activeModal.set('log');
  }

  // for showing remarks details
  onRemarksClick(bookingId: number) {
    this.bookingDetailsFacade.loadLogs(bookingId);
    console.log('log details', this.bookingDetailsFacade.logDetails());
    this.activeModal.set('remarks');
  }

  selectAll(): void {
    this.bookings().forEach((booking) => {
      this.selectedReferences.add(booking.reference);
    });
    this.emitSelectionChange();
  }

  deselectAll(): void {
    this.selectedReferences.clear();
    this.emitSelectionChange();
  }
  // for opening the option name
  selectedHeaderPos = { top: 0, left: 0 };
  openOptionHeaderSelect(event: MouseEvent) {
    event.stopPropagation(); // prevent sort clicks
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    // Save header coordinates
    this.selectedHeaderPos = { top: rect.bottom, left: rect.left };

    this.showOptionHeaderSelect.set(true);
  }

  closeOptionHeaderSelect() {
    this.showOptionHeaderSelect.set(false);
  }

  onCountrySelection(event: any) {
    console.log('Selected country:', event);
    this.showOptionHeaderSelect.set(false);
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.deselectAll();
    } else {
      this.selectAll();
    }
  }

  isAllSelected(): boolean {
    return this.bookings().length > 0 && this.selectedReferences.size === this.bookings().length;
  }

  getSelectedCount(): number {
    return this.selectedReferences.size;
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(Array.from(this.selectedReferences));
  }
}
