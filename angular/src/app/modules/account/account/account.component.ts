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
  reviews: Review[];

  // functions
  // http get to call the most 2 recent bookings and related lodging information from the booking service.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard.
  // Bookings will be sorted on the API end. using account id.
  getBookings() {
    this.accountService.getBookings(this.data.id.toString())
      .pipe(map(bookings => bookings.slice(0, 2)))
      .subscribe(resultBookings => {
        this.bookings = resultBookings;
        this.bookings.forEach(booking =>
          this.lodgingService.get(booking.lodgingId.toString())
                             .subscribe(lodging =>
                                booking.lodging = lodging[0]));
      });
  }

  // http get to call the most recent 2 reviews by the account from the review service. using account id.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard
  getReviews() {
    this.accountService.getReviews(this.data.id.toString())
    .pipe(map(reviews => reviews.slice(0, 2)))
    .subscribe(val => this.reviews = val);
  }

  // http get to retrieve account information from account service using account id
  getAccount() {
    const userId = this.accountService.getUserId();
    // const userId = +this.route.snapshot.paramMap.get('id');
    this.accountService.get(userId).subscribe(data => {
      this.data = data[0];
      this.getReviews();
      this.getBookings();
    });
  }

  constructor(private readonly accountService: AccountService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly lodgingService: LodgingService,
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }
}
