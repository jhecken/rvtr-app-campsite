import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from '../../../data/account.model';
import { ActivatedRoute } from '@angular/router';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Review } from 'src/app/data/review.model';
import { Booking } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';
import { of } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  let accountServiceMock;
  let lodgingServiceMock;
  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get() {
          return 1;
        }
      }
    }
  };

  let accountMock: Account[];
  let reviewsMock: Review[];
  let bookingsMock: Booking[];
  let lodgingMock: Lodging[];

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['get', 'getBookings', 'getReviews', 'getUserId']);
    lodgingServiceMock = jasmine.createSpyObj(['get']);

    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: LodgingService, useValue: lodgingServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
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
    reviewsMock = [
      {
        id: '1',
        accountId: '1',
        lodgingId: '1',
        lodging: null,
        comment: 'good stuff man',
        dateCreated: new Date('6/10/2020'),
        rating: 4
      }
    ];
    bookingsMock = [
      {
        id: '1',
        accountId: '1',
        lodgingId: '1',
        lodging: null,
        guests: null,
        rentals: null,
        stay: {
          id: '1',
          checkIn: new Date('1/10/2020'),
          checkOut: new Date('1/15/2020'),
          dateCreated: null,
          dateModified: null
        },
        status: null
      }
    ];
    lodgingMock = [
      {
        id: '1',
        location: null,
        name: 'name',
        rentals: [],
        reviews: []
      }
    ];
  });

  it('should create', () => {
    reviewsMock = [];
    bookingsMock = [];

    accountServiceMock.get.and.returnValue(of(accountMock));
    accountServiceMock.getReviews.and.returnValue(of(reviewsMock));
    accountServiceMock.getBookings.and.returnValue(of(bookingsMock));
    accountServiceMock.getUserId.and.returnValue(1);

    lodgingServiceMock.get.and.returnValue(of(lodgingMock));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should not call lodging service if 0 reviews and bookings', () => {
    reviewsMock = [];
    bookingsMock = [];

    accountServiceMock.get.and.returnValue(of(accountMock));
    accountServiceMock.getReviews.and.returnValue(of(reviewsMock));
    accountServiceMock.getBookings.and.returnValue(of(bookingsMock));
    accountServiceMock.getUserId.and.returnValue(1);

    lodgingServiceMock.get.and.returnValue(of(lodgingMock));

    fixture.detectChanges();

    expect(lodgingServiceMock.get).toHaveBeenCalledTimes(0);
  });
});
