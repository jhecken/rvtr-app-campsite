import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/data/booking.model';
import { AccountService } from 'src/app/services/account/account.service';
import { map } from 'rxjs/operators';
import { LodgingService } from 'src/app/services/lodging/lodging.service';

@Component({
  selector: 'uic-display-bookings',
  templateUrl: './display-bookings.component.html',
  styleUrls: ['./display-bookings.component.scss']
})
export class DisplayBookingsComponent implements OnInit {

  // properties
  bookings: Booking[];

  // functions
  // http get to call the most 2 recent bookings and related lodging information from the booking service.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard.
  // Bookings will be sorted on the API end. using account id.
  getBookings() {
    this.accountService.getBookings(this.accountService.getUserId())
      .pipe(map(bookings => bookings.slice(0, 2)))
      .subscribe(resultBookings => {
        this.bookings = resultBookings;
        this.bookings.forEach(booking =>
          this.lodgingService.get(booking.lodgingId.toString())
                             .subscribe(lodging =>
                                booking.lodging = lodging[0]));
      });
  }

  constructor(
    private readonly accountService: AccountService,
    private readonly lodgingService: LodgingService
    ) { }

  ngOnInit(): void {
    this.getBookings();
  }

}
