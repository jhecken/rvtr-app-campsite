import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Account } from '../../data/account.model';
import { Review } from '../../data/review.model';
import { Booking } from '../../data/booking.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly accountUrl$: Observable<string>;
  private readonly paymentUrl$: Observable<string>;
  private readonly profileUrl$: Observable<string>;

  /**
   * Represents the _Account Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.accountUrl$ = config.get().pipe(map((cfg) => cfg.api.account.base + cfg.api.account.uri.account));
    this.paymentUrl$ = config.get().pipe(map((cfg) => cfg.api.account.base + cfg.api.account.uri.payment));
    this.profileUrl$ = config.get().pipe(map((cfg) => cfg.api.account.base + cfg.api.account.uri.profile));
  }

  getUserId(){
    return '1';
  }

  /**
   * Represents the _Account Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<boolean> {
    return this.accountUrl$.pipe(
      concatMap((url) => this.http.delete<boolean>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _Account Service_ `get` method
   *
   * @param id string
   */
  get(id?: string): Observable<Account[]> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.accountUrl$.pipe(concatMap((url) => this.http.get<Account[]>(url, options)));
  }

  /**
   * Represents the _Account Service_ `post` method
   *
   * @param account Account
   */
  post(account: Account): Observable<boolean> {
    return this.accountUrl$.pipe(concatMap((url) => this.http.post<boolean>(url, account)));
  }

  /**
   * Represents the _Account Service_ `put` method
   *
   * @param account Account
   */
  put(account: Account): Observable<Account> {
    return this.accountUrl$.pipe(concatMap((url) => this.http.put<Account>(url, account)));
  }
  /* istanbul ignore next */
  getBookings(accountIds?: string, limit?: number): Observable<Booking[]>{
    let books: Booking[] = [];
    const bookOne: Booking = {
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
    };
    const bookTwo: Booking = {
      id: '2',
      accountId: '1',
      lodgingId: '2',
      lodging: null,
      guests: null,
      rentals: null,
      stay: {
        id: '2',
        checkIn: new Date('1/10/2020'),
        checkOut: new Date('1/15/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    };
    const bookThree: Booking = {
      id: '3',
      accountId: '2',
      lodgingId: '3',
      lodging: null,
      guests: null,
      rentals: null,
      stay: {
        id: '3',
        checkIn: new Date('2/20/2020'),
        checkOut: new Date('2/25/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    };
    const bookFour: Booking = {
      id: '4',
      accountId: '1',
      lodgingId: '4',
      lodging: null,
      guests: null,
      rentals: null,
      stay: {
        id: '4',
        checkIn: new Date('6/12/2020'),
        checkOut: new Date('6/17/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    };
    books.push(bookOne);
    books.push(bookTwo);
    books.push(bookThree);
    books.push(bookFour);

    // Represents server side sorting, filtering
    books = books.filter(booking => booking.accountId === accountIds).sort((a, b) => Number(b.id) - Number(a.id));
    // const options = id ? { params: new HttpParams().set('id', id) } : {};
    // options.params.set('limit', limit.toString());
    // options.params.set('accountId', accountId)
    // this.apiUrl$.pipe(concatMap((url) => this.http.get<Account[]>(url, options)));
    return of(books);
  }
  /* istanbul ignore next */
  getReviews(id: string): Observable<Review[]> {
    const revs: Review[] = [];
    const rOne: Review = {
      id: '1',
      accountId: '1',
      lodgingId: '1',
      lodging: {
        id: null,
        location: null,
        name: 'Hilton',
        rentals: null,
        reviews: null
      },
      comment: 'good stuff man',
      dateCreated: new Date('6/10/2020'),
      rating: 4
    };
    revs.push(rOne);
    const rTwo: Review = {
      id: '2',
      accountId: '1',
      lodgingId: '2',
      lodging: {
        id: null,
        location: null,
        name: 'Marriot',
        rentals: null,
        reviews: null
      },
      comment: 'super bad',
      dateCreated: new Date('6/10/2020'),
      rating: 1
    };
    revs.push(rTwo);
    return of(revs);
  }
}
