import {Component, OnInit, ElementRef} from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { RequestService, AuthService, HermesService } from '../../../../../../shared-ng/services/services';

import { User } from '../../../../../../shared-ng/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-create',
  templateUrl: 'admin-create.component.html',
  providers: [ RequestService ]
})

export class AdminCreateComponent implements OnInit {
  currentUser: any;
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;
  newApplication: FormGroup;
  departments: any = [
    'Atlas',
    'Collegian',
    'Department Head',
    'Executive',
    'Global Service',
    'Marketing',
    'Mountain Ash',
    'Outdoors',
    'Photo',
    'Senate',
    'Social',
    'Spiritual',
    'Tread Shed',
    'Video',
    'Web'
  ];
  visibilityOptions: any = [
    {name : 'Hidden',  value : false},
    {name : 'Visible', value : true}
  ];
  featuredOptions: any = [
    {name : 'Not Featured', value : false},
    {name : 'Featured', value : true}
  ];

  constructor(private rs: RequestService, private elementRef: ElementRef,
              private as: AuthService, private hs: HermesService) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit() {
    this.buildLoginLink = this.as.buildLoginLink;
    this.userInfoSubscription = this.as.getUserInfo().subscribe(
      (data: User) => {
        this.currentUser = data;
      }
    );
    this.hs.sendHeaderTitle('Create Job');

    this.newApplication = new FormGroup({
      'jobName' : new FormControl('', Validators.required),
      'jobDesc' : new FormControl('', Validators.required),
      'owner' : new FormControl('', Validators.required),
      'department' : new FormControl('', Validators.required),
      'visibility' : new FormControl('', Validators.required),
      'featured' : new FormControl('', Validators.required),
      'imgLink' : new FormControl(''),
      'questions' : new FormArray([
        new FormGroup({
          question : new FormControl('')
        })
      ])
    });
  }

  // getter functions
  get jobName() { return this.newApplication.get('jobName'); }
  get jobDesc() { return this.newApplication.get('jobDesc'); }
  get owner() { return this.newApplication.get('owner'); }
  get department() { return this.newApplication.get('department'); }
  get visibility() { return this.newApplication.get('visibility'); }
  get featured() { return this.newApplication.get('featured'); }
  get imgLink() { return this.newApplication.get('imgLink'); }
  get questions() { return this.newApplication.get('questions') as FormArray; }

  // change dept using select dropdown
  changeDept(e) {
    this.department.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // change visibility using select dropdown
  changeVis(e) {
    this.visibility.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // change featured using select dropdown
  changeFeat(e) {
    this.featured.setValue(e.target.value, {
      onlySelf: true
    })
  }
  
  addQuestion() {
    const group  = new FormGroup({
      question : new FormControl('')
    });
    this.questions.push(group);
  }
  
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  submitForm() {
    const data = {
      job_name: this.jobName.value,
      job_description: this.jobDesc.value,
      owner: this.owner.value,
      department: this.department.value,
      visibility: this.visibility.value,
      featured: this.featured.value,
      image: this.imgLink.value,
      questions: this.questions.value
    };

    this.rs.post('/forms/job/new', data, null, 'urlencoded').subscribe((responseData) => {
      if (responseData.status === 'submitted') {
        this.jobName.setValue('');
        this.jobDesc.setValue('');
        this.owner.setValue('');
        this.department.setValue('');
        this.visibility.setValue('');
        this.featured.setValue('');
        this.imgLink.setValue('');
        while(this.questions.length !== 0) {
          this.questions.removeAt(0);
        }
      } else {
        window.alert('failed to submit');
      }
    }, (error) => {
      window.alert(error.error.status);
    });
  }

}
