import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';
import { AccountService } from 'src/app/services/account/account.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Profile } from '../../../data/profile.model';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';




describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let httpTestingController: HttpTestingController;
  let accountServiceMock: AccountService;

  let profileMock: Profile[];

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
    // accountServiceMock = jasmine.createSpyObj(['getProfiles']);
    // (<jasmine.Spy>accountServiceMock.getFileReference).and.returnValue({
    //   getUserId: () => of(null)
    // });
    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],

      providers: [AccountService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;

       // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.inject(HttpTestingController);
    accountServiceMock = TestBed.inject(AccountService);
  }));

  beforeEach(() => {
    profileMock = [
      {
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
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // xit('should load profile on creation', () => {
  //   accountServiceMock.get.and.returnValue(of(profileMock));
  //   fixture.detectChanges();

  //   expect(component).toBe(profileMock);
  // });

  describe('toggleProfile', () => {

    it('should show profile after toggle', () => {
      component.toggleProfile();

      expect(component.hideProfile).toBeFalse();
      // Test the actual element
    });
  });

  describe('isNullOrWhitespace', () => {
    it('should return true on null string', () => {

      expect(component.isNullOrWhitespace(null)).toBeTrue();
    });
    it('should return true on empty string', () => {

      expect(component.isNullOrWhitespace('')).toBeTrue();
    });
    it('should return true on string of spaces string', () => {

      expect(component.isNullOrWhitespace('  ')).toBeTrue();
    });
    it('should return false on non null/emtpy string', () => {

      expect(component.isNullOrWhitespace('null')).toBeFalse();
    });
  });

  xdescribe('addProfile', () => {
    it('should add valid profile', () => {
      // accountServiceMock.get.and.returnValue(of());
      fixture.detectChanges();
      component.newProfile =  {
        id: 1,
        accountId: 1,
        email: 'tom@tim.com',
        name: {
          id: 0,
          family: 'tim',
          given: 'tom'
        },
        phone: '5551234567',
        age: 'Adult',
        image: null
      };
      component.addProfile();

      expect(component.profiles.length).toBe(3);
      expect(component.profiles[2].email).toBe('tom@tim.com');
    });
  });
});
  // describe('removeProfile', () => {
  //   it('should remove correct profile', () => {
  //     accountServiceMock.get.and.returnValue(of(profileMock));
  //     fixture.detectChanges();
  //     component.removeProfile(profileMock[0].profiles[0]);
  //     expect(component.data.profiles.length).toBe(1);
  //     expect(component.data.profiles[0]).toBe(profileMock[0].profiles[0]);
  //   });
  // });
  // describe('onSubmit', () => {
  //   it('should call put on AccountService with valid account', () => {
  //     accountServiceMock.get.and.returnValue(of(profileMock));
  //     accountServiceMock.put.and.returnValue(of(profileMock));
  //     fixture.detectChanges();
  //     component.onSubmit();
  //     expect(accountServiceMock.put).toHaveBeenCalled();
  //   });
  // });
