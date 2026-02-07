import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectMenu } from './multi-select-menu';

describe('MultiSelectMenu', () => {
  let component: MultiSelectMenu;
  let fixture: ComponentFixture<MultiSelectMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
