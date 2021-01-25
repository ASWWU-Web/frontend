import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProfileSmComponent } from '../profile-sm.component';
import { UnescapePipe } from '../../../unescape';
import { RequestService } from 'src/shared-ng/services/services';
import { Component } from '@angular/core';

class MockRequestService {
}

@Component({ selector: 'app-profile-modal', template: '' })
class ProfileModalStubComponent {	
}

describe('ProfileSmComponent', () => {
  let component: ProfileSmComponent;
  let fixture: ComponentFixture<ProfileSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  declarations: [ProfileSmComponent, UnescapePipe, ProfileModalStubComponent],
	  providers: [{ provide: RequestService, useClass: MockRequestService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSmComponent);
    component = fixture.componentInstance;
  });

  it('Should display a flight', () => {
	component.searchResult = { full_name: 'tester', username: 'tester' }
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});