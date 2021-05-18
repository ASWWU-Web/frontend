import {Component, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  RequestService,
  AuthService,
  HermesService,
  MaskRequestService
} from '../../../../../shared-ng/services/services';
import { Subscription} from 'rxjs';
import {User} from '../../../../../shared-ng/interfaces/interfaces';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../../../shared-ng/environments/environment';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: 'admin.component.html',
  providers: [RequestService],
  styleUrls: ['admin.styles.css']
})

export class AdminComponent implements OnInit {
  currentUser: any;
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;

  // Added
  images = [];
  csvinput = {};
  csvExists = false;
  permissions = false;
  hasCSVError = true;
  csvError = [];
  hasFileError = false;
  readyForUpload = false;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  public uploader: FileUploader = new FileUploader({url: environment.SERVER_URL + '/forms/resume/upload'});
  constructor(private route: ActivatedRoute,
              private as: AuthService, private hs: HermesService, private elementRef: ElementRef,
              private mrs: MaskRequestService) {
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
    this.setPermissions();
  }

  public setPermissions() {
    this.mrs.post('/verify/mask-permissions', {}).subscribe(
      (data: boolean) => {
          this.permissions = data['permission'];
      }, () => {
        this.permissions = false;
      });
  }

  public csvToDict(csv) {
    const lines = csv.split('\n');
    const result = {};

    for (let i = 1; i < lines.length; i++) {
      const currentline = lines[i].split(',');
      const photoLine = currentline[1].split(' ');
      this.hasCSVError = false;
      photoLine.map(x => {
        x.replace(/(\r\n|\n|\r)/gm, '');
        const currentPhoto = x;
        if (!/\S/.test(x) || x === '') {
          // Do Nothing empty spaces
        } else if (!Number.isInteger(x)) {
          try {
            if (isNaN(parseInt(x, 10)) || parseFloat(x) % 1 !== 0) {
              throw new Error('Not Whole Number');
            } else {
              x = parseInt(x, 10);
            }
          } catch (e) {
            this.csvError.push('Photo: ' + currentPhoto + ' is currently failing.');
            this.hasCSVError = true;
          }
        }
        result[x] = currentline[0];
      });
    }
    return result; // JSON
  }

  convertFile(event) {
    this.images = [];
    this.csvinput = {};
    this.csvExists = false;

    const reader = new FileReader();
    reader.onload = () => {
      this.csvinput = this.csvToDict(reader.result);
      this.csvExists = true;
    };
    reader.readAsText(event.target.files[0]);
  }

  onFileChange(event) {
    this.images = [];
    this.hasFileError = false;
    this.readyForUpload = false;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length <= 50) {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          const reader = new FileReader();

          reader.onload = e => {
            const photoNumber = event.target.files[i].name.split('.');

            this.images.push({
              srcString: reader.result,
              photo: event.target.files.item(i),
              studentID: this.csvinput[photoNumber[0]],
              uploaded: false
            });
          };
          reader.readAsDataURL(file);
        }
        this.readyForUpload = true;
      } else {
        this.hasFileError = true;
      }
    }
  }

  async submit() {
    for (const i of Object.keys(this.images)) {
      await this.postFile(this.images[i].photo, i, this.images[i].studentID);
    }
  }

  async postFile(fileToUpload: File, photoID: string, studentID: string) {
    const d = new Date();
    const name = `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}-ID${d.getMinutes()}${d.getSeconds()}${photoID}_${studentID}.jpeg`;
    const $uploadPhoto = await this.mrs.uploadProfilePhotoDirect(fileToUpload, name);
    $uploadPhoto.subscribe({
      next: () => {
        const newImages = this.images;
        newImages[photoID].uploaded = true;
        this.images = newImages;
      },
      error: () => console.log('Error'),
      complete: () => console.log('SUCCESS')
    });
  }
}
