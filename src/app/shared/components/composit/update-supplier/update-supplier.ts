import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-supplier.html',
})
export class UpdateSupplier {
  // Input signals for initial data
  referenceNumber = input<string>('AGT43536801250534');
  optionName = input<string>('From Dubai Marina Sightseeing Yacht');
  currentSupplier = input<string>('Dutch Oriental');
  currentCost = input<number>(400);
  currentSale = input<number>(600);
  currentLocation = input<string>(
    'ACICO Business Park Building, Office # 703, 704, 705, Port Saeed Road, Deira, Behind Nissan Showroom.',
  );

  // Form State Signals
  newSupplier = signal<string>('');
  newCost = signal<number | null>(null);
  newLocation = signal<string>('');

  // Events
  onSave = output<any>();
  onClose = output<void>();

  // Computed signal for validation error
  costError = computed(() => {
    const cost = this.newCost();
    return cost !== null && cost > this.currentCost();
  });

  handleSave() {
    if (this.costError()) return;
    this.onSave.emit({
      supplier: this.newSupplier(),
      cost: this.newCost(),
      location: this.newLocation(),
    });
    this.onClose.emit();
  }

  clearCost() {
    this.newCost.set(null);
  }
}
