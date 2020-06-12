import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from '../../../data/account.model';
import { ActivatedRoute } from '@angular/router';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Review } from 'src/app/data/review.model';
import { Booking } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  let mockAccountService;
  let mockRoute;
  let mockLodgingService;

  const accountMock: Account[] = [{
    id:'1',
    address: {
        id:'1',
        city:'Dallas',
        country:'US',
        postalCode:'12345',
        stateProvince:'Texas',
        street:'1234 testing st.',
        unit:'24'
    },
    name: 'John Doe',
    payments:[{
        id:'1',
        cardExpirationDate: new Date("7/9/21"),
        cardName: 'Visa',
        cardNumber: '123456789123456'
    },
    {
        id:'2',
        cardExpirationDate: new Date("1/22/21"),
        cardName: 'Master',
        cardNumber: '987654321987654'
    },
],
    profiles:[{
        id: '1',
        email:'JohnDoe@gmail.com',
        name: {
            id:'1',
            family:'Doe',
            given:'John'
        },
        phone:'1234567891',
        age:"Adult",
        image:null
    },
    {
        id: '2',
        email:'JaneDoe@gmail.com',
        name: {
            id:'2',
            family:'Doe',
            given:'Jane'
        },
        phone:'9876543219',
        age:"Adult",
        image:null
    }]}];
  const mockReviews: Review[] = [
    {
      id: "1",
      accountId: "1",
      hotelId: "1",
      comment: "good stuff man",
      dateCreated: new Date("6/10/2020"),
      rating: 4
    }
  ];
  const mockBookings: Booking[] = [
    {
      id: "1",
      accountId: "1",
      lodgingId: "1",
      guests: null,
      rentals: null,
      stay: {
        id: "1",
        checkIn: new Date("1/10/2020"),
        checkOut: new Date("1/15/2020"),
        dateCreated: null,
        dateModified: null
      },
      status: null
    }
  ];
  const mockLodging: Lodging[] = [
    {
      id: "1",
      location: null,
      name: 'name',
      rentals: [],
      reviews: []
    }
  ]
  // beforeEach(async(() => {

  //   TestBed.configureTestingModule({
  //     declarations: [AccountComponent],
  //     providers:[
  //       { provide: AccountService, useValue: mockAccountService },
  //       { provide: ActivatedRoute, useValue: mockRoute },
  //       { provide: LodgingService, useValue: mockLodgingService }
  //     ],
  //     schemas:[NO_ERRORS_SCHEMA]
  //   }).compileComponents();
  // }));

  beforeEach(() => {
    mockAccountService =  jasmine.createSpyObj(['get', 'getBookings', 'dummyGetReveiws']);
    mockRoute =           jasmine.createSpyObj(['snapshot']);
    mockLodgingService =  jasmine.createSpyObj(['get']);

    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: LodgingService, useValue: mockLodgingService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockAccountService.get.and.returnValue(of(accountMock));
    mockAccountService.dummyGetReveiws.and.returnValue(of(mockReviews));
    mockAccountService.getBookings.and.returnValue(of(mockBookings));

    mockLodgingService.get.and.returnValue(of(mockLodging));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
