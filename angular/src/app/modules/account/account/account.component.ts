import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { Account } from '../../../data/account.model';
import { Review } from '../../../data/review.model';
import { Booking } from '../../../data/booking.model';
import { ActivatedRoute } from '@angular/router';
import { LodgingService } from 'src/app/services/lodging/lodging.service';

import { map } from 'rxjs/operators';


@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  // properties
  data: Account;
  bookings: Booking[];
  bookingLocations: string[] = [];
  reviews: Review[];
  reviewLocations: string[] = [];

  // functions
  // http get to call the most 2 recent bookings information from the booking service.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard.
  // Bookings will be sorted on the API end. using account id.
  getBookings() {
    this.accountService.getBookings(this.data.id.toString())
                       .pipe(map(bookings => bookings.slice(0, 2)))
                       .subscribe(books => this.bookings = books);
    if (this.bookings.length >= 1) {
      for (const booking of this.bookings){
        this.lodgingService.get(booking.lodgingId.toString())
          .subscribe(lodge => this.bookingLocations.push(lodge[0].name));
      }
    }
  }

  // http get to call the most recent reviews by the account from the review service. using account id.
  getReviews() {
    this.accountService.dummyGetReviews('hi').subscribe(val => this.reviews = val);
    if (this.reviews.length >= 1) {
      for (const review of this.reviews) {
        this.lodgingService.get(review.hotelId.toString())
          .subscribe(lodge => this.reviewLocations.push(lodge[0].name));
      }
    }
  }

  // http get to retrieve account information from account service using account id
  getAccount() {
    const userId = this.accountService.getUserId();
    // const userId = +this.route.snapshot.paramMap.get('id');
    this.accountService.get(userId).subscribe(data => {
      this.data = data[0];
      this.obscure();
      this.getReviews();
      this.getBookings();
    });
  }

  // hashing the credit card number displayed.
  obscure() {
    for (const payment of this.data.payments) {
      payment.cardNumber = `***********${payment.cardNumber.substring(11, 16)}`;
    }
  }

  constructor(private readonly accountService: AccountService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly lodgingService: LodgingService,
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }
}
