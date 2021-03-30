import {Component, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService, AuthService, HermesService} from '../../../../../shared-ng/services/services';
import {Observable, Subscription, BehaviorSubject } from 'rxjs';
import {User} from '../../../../../shared-ng/interfaces/interfaces';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: 'admin.component.html',
  providers: [RequestService]
})

export class AdminComponent implements OnInit {
  currentUser: any;
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;

  // Added
  images = [];
  csvinput = {};
  csvExists = false;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute, private rs: RequestService,
              private as: AuthService, private hs: HermesService, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }

  ngOnInit() {
    this.buildLoginLink = this.as.buildLoginLink;
    this.currentUser = {
      full_name: 'Caleb Herbel',
      photo: 'test',
      roles: 'mask-admin',
      status: 'true',
      username: 'caleb.herbel',
      wwuid: '2022977'
    };
    // this.userInfoSubscription = this.as.getUserInfo().subscribe(
    //   (data: User) => {
    //     this.currentUser = data;
    //   }
    // );
  }

  get f() {
    return this.myForm.controls;
  }

  public csvToDict(csv) {
    const lines = csv.split('\n');
    const result = {};
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const currentline = lines[i].split(',');
      const photoLine = currentline[1].split(' ');
      photoLine.map(x => {
        x.replace(/(\r\n|\n|\r)/gm, '');
        if (!Number.isInteger(x)) {
          x = parseInt(x, 10);
        }
        result[x] = currentline[0];
      });
    }
    return result; // JSON
  }

  convertFile(event) {
    const input = document.getElementById('fileInput');
    const reader = new FileReader();
    reader.onload = () => {
      this.csvinput = this.csvToDict(reader.result);
      this.csvExists = true;
    };
    reader.readAsText(event.target.files[0]);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          const photoNumber = event.target.files[i].name.split('.');
          this.images.push({
            photo: event.target.files[i].name,
            studentID: this.csvinput[photoNumber[0]],
            uploaded: false
          });
          this.myForm.patchValue({
            fileSource: this.images
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // Temporary
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  async submit() {
    console.log('Finished');
    console.log(this.images);
    for (const i of Object.keys(this.images)) {
      const newImages = this.images;
      newImages[i].uploaded = true;
      this.images = newImages;
      // Temporary
      await this.delay(1000);
    }
    console.log(this.images);
    // this.rs.post('http://localhost:8001/upload.php', this.myForm.value)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   });
  }
}
