import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DisplayReviewsComponent } from './display-reviews.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DisplayReviewsComponent', () => {
  let component: DisplayReviewsComponent;
  let fixture: ComponentFixture<DisplayReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayReviewsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
