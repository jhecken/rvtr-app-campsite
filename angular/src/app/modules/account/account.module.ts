import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AccountComponent } from './account/account.component';
import { DisplayReviewsComponent } from './display-reviews/display-reviews.component';
import { DisplayBookingsComponent } from './display-bookings/display-bookings.component';

@NgModule({
  declarations: [AccountComponent, EditAccountComponent, DisplayReviewsComponent, DisplayBookingsComponent],
  imports: [
    AccountRoutingModule, FormsModule, CommonModule
  ]
})
export class AccountModule { }
