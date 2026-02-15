import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { CalenderComponent } from '../../calender/calender.component';
import { TimeInput } from '../../input/time-input/time-input';

@Component({
  selector: 'app-update-travel-date',
  imports: [CommonModule, ReactiveFormsModule, CalenderComponent, TimeInput, ButtonComponent],
  templateUrl: './update-travel-date.html',
  styleUrl: './update-travel-date.css',
})
export class UpdateTravelDate {
  // Input to receive initial data
  data = input<any>({
    billNumber: '0802251314',
    productName: 'From Dubai Marina Sightseeing Yacht',
    currentTravelDate: '12 Feb 2025',
    startTime: '08:00 AM',
    duration: '2 Hours',
    yachtType: 'Private Yacht',
    cDeskNumber: '9876566316516541132',
  });
  closeUpdateTravelDate = output<void>();

  // @Input() data: any = {
  //   billNumber: '0802251314',
  //   productName: 'From Dubai Marina Sightseeing Yacht',
  //   currentTravelDate: '12 Feb 2025',
  //   startTime: '08:00 AM',
  //   duration: '2 Hours',
  //   yachtType: 'Private Yacht',
  //   cDeskNumber: '9876566316516541132',
  // };

  travelForm = new FormGroup({
    cDeskNumber: new FormControl(this.data().cDeskNumber),
    supplierFailed: new FormControl(false),
    modifyDate: new FormControl('2024-10-13'),
    startTime: new FormControl(''),
  });

  constructor() {
    // Logic to disable CDesk Number when toggle is ON
    this.travelForm.get('supplierFailed')?.valueChanges.subscribe((failed) => {
      const cDesk = this.travelForm.get('cDeskNumber');
      failed ? cDesk?.disable() : cDesk?.enable();
    });
  }

  onClose(){
    this.closeUpdateTravelDate.emit();
  }

  onSave() {
    console.log('update travel date')
    this.onClose()
    console.log('Form Submitted:', this.travelForm.getRawValue());
  }
}
