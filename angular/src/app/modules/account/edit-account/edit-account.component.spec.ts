import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountComponent } from './edit-account.component';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from '../../../data/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditAccountComponent', () => {
  let component: EditAccountComponent;
  let fixture: ComponentFixture<EditAccountComponent>;

  let accountServiceMock;

  let accountMock: Account[];

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get() {
          return 1;
        }
      }
    }
  };

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['get', 'put', 'deletePay', 'deleteProf']);

    TestBed.configureTestingModule({
      declarations: [EditAccountComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AccountService, useValue: accountServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    accountMock = [{
      id: '1',
      address: {
        id: '1',
        city: 'Dallas',
        country: 'US',
        postalCode: '12345',
        stateProvince: 'Texas',
        street: '1234 testing st.',
        unit: '24'
      },
      name: 'John Doe',
      payments: [{
        id: 1,
        cardExpirationDate: new Date('7/9/21'),
        cardName: 'Visa',
        cardNumber: '123456789123456'
      },
      {
        id: 2,
        cardExpirationDate: new Date('1/22/21'),
        cardName: 'Master',
        cardNumber: '987654321987654'
      },
      ],
      profiles: [{
        id: 1,
        email: 'JohnDoe@gmail.com',
        name: {
          id: 1,
          family: 'Doe',
          given: 'John'
        },
        phone: '1234567891',
        age: 'Adult',
        image: null
      },
      {
        id: 2,
        email: 'JaneDoe@gmail.com',
        name: {
          id: 2,
          family: 'Doe',
          given: 'Jane'
        },
        phone: '9876543219',
        age: 'Adult',
        image: null
      }]
    }];

    fixture = TestBed.createComponent(EditAccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load account on creation', () => {
    accountServiceMock.get.and.returnValue(of(accountMock));
    fixture.detectChanges();

    expect(component.data).toBe(accountMock[0]);
  });

  describe('toggleCard', () => {

    it('should show card after toggle', () => {
      component.toggleCard();

      expect(component.hideCard).toBeFalse();
      // Test the actual element
    });
  });

  describe('toggleProfile', () => {

    it('should show profile after toggle', () => {
      component.toggleProfile();

      expect(component.hideProfile).toBeFalse();
      // Test the actual element
    });
  });

  describe('isNullOrWhitespace', () => {
    it('should return false on null string', () => {

      expect(component.isNullOrWhitespace(null)).toBeFalse();
    });
    it('should return false on empty string', () => {

      expect(component.isNullOrWhitespace('')).toBeFalse();
    });
    it('should return false on string of spaces string', () => {

      expect(component.isNullOrWhitespace('  ')).toBeFalse();
    });
    it('should return true on non null/emtpy string', () => {

      expect(component.isNullOrWhitespace('null')).toBeTrue();
    });
  });

  describe('addCard', () => {
    it('should add valid card', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      const paymentCount = component.data.payments.length;
      component.addCard('TestCard', 111111111111111, new Date('12/1/2022'));

      expect(component.data.payments.length).toBe(paymentCount + 1);
    });
    it('should not add card with empty name', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      const paymentCount = component.data.payments.length;
      component.addCard('', 111111111111111, new Date('12/1/2022'));

      expect(component.data.payments.length).toBe(paymentCount);
    });
    it('should not add card with invalid number', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      const paymentCount = component.data.payments.length;
      component.addCard('TestCard', 11111111111111, new Date('12/1/2022'));

      expect(component.data.payments.length).toBe(paymentCount);
    });
    it('should not add expired card', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      const paymentCount = component.data.payments.length;
      component.addCard('TestCard', 111111111111111, new Date('12/1/1922'));

      expect(component.data.payments.length).toBe(paymentCount);
    });
  });

  describe('removeCard', () => {
    it('removes the correct card', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.removeCard(accountMock[0].payments[1]);

      expect(component.data.payments.length).toBe(1);
      expect(component.data.payments[0]).toBe(accountMock[0].payments[0]);
    });
  });

  describe('addProfile', () => {
    it('should add valid profile', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.addProfile('Tim', 'Tom', 'Adult', 'tom@tim.com', 5551234567, null);

      expect(component.data.profiles.length).toBe(3);
      expect(component.data.profiles[2].email).toBe('tom@tim.com');
    });
    it('should not add profile with empty name', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.addProfile('', 'Tom', 'Adult', 'tom@tim.com', 5551234567, null);

      expect(component.data.profiles.length).toBe(2);
    });
    it('should not add profile with duplicate names', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.addProfile('Jane', 'Doe', 'Adult', 'tom@tim.com', 5551234567, null);

      expect(component.data.profiles.length).toBe(2);
    });
    it('should not add profile with invalid phone number', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.addProfile('Tim', 'Tom', 'Adult', 'tom@tim.com', 555123457, null);

      expect(component.data.profiles.length).toBe(2);
    });
    it('should not add profile with empty email', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.addProfile('', 'Tom', 'Adult', '', 5551234567, null);

      expect(component.data.profiles.length).toBe(2);
    });
  });

  describe('removeProfile', () => {

    it('should remove correct profile', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.removeProfile(accountMock[0].profiles[0]);

      expect(component.data.profiles.length).toBe(1);
      expect(component.data.profiles[0]).toBe(accountMock[0].profiles[0]);
    });
  });

  describe('onSubmit', () => {
    it('should call put on AccountService with valid account', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      accountServiceMock.put.and.returnValue(of(accountMock));
      accountServiceMock.deleteProf.and.returnValue(of(true));
      accountServiceMock.deletePay.and.returnValue(of(true));
      fixture.detectChanges();

      component.onSubmit();

      expect(accountServiceMock.put).toHaveBeenCalled();
    });

    it('should not call put on AccountService with empty name', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      accountServiceMock.put.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.data.name = '';

      component.onSubmit();

      expect(accountServiceMock.put).toHaveBeenCalledTimes(0);
    });
    it('should not call put on AccountService with empty payments', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      accountServiceMock.put.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.data.payments = [];

      component.onSubmit();

      expect(accountServiceMock.put).toHaveBeenCalledTimes(0);
    });
    it('should not call put on AccountService with invalid address', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      accountServiceMock.put.and.returnValue(of(accountMock));
      fixture.detectChanges();

      component.data.address.street = '';

      component.onSubmit();

      expect(accountServiceMock.put).toHaveBeenCalledTimes(0);
    });
  });
});
