import {Component, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  RequestService,
  AuthService,
  HermesService,
  MaskRequestService
} from '../../../../../shared-ng/services/services';
import {Observable, Subscription, BehaviorSubject} from 'rxjs';
import {User} from '../../../../../shared-ng/interfaces/interfaces';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../../../shared-ng/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  // Mathew
  closeResult = '';
  fileToUpload: File = null;
  srcString: any = null;
  profile: User;
  // End Mathew

  public uploader: FileUploader = new FileUploader({url: environment.SERVER_URL + '/forms/resume/upload'});

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute,
              private as: AuthService, private hs: HermesService, private elementRef: ElementRef,
              private mrs: MaskRequestService, private modalService: NgbModal) {
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
    this.images = [];
    this.csvinput = {};
    this.csvExists = false;

    const input = document.getElementById('fileInput');
    const reader = new FileReader();
    reader.onload = () => {
      this.csvinput = this.csvToDict(reader.result);
      this.csvExists = true;
    };
    reader.readAsText(event.target.files[0]);
  }

  onFileChange(event) {
    this.images = [];

    if (event.target.files && event.target.files[0]) {
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
          this.myForm.patchValue({
            fileSource: this.images
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  handleFileInput(event: any): void {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];

        const reader = new FileReader();

        reader.onload = e => {
          this.srcString = reader.result;
          this.fileToUpload = event.target.files.item(0);
        };

        reader.readAsDataURL(file);
      }

    }
  }

  // Temporary
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  async submit() {
    console.log('Finished');
    for (const i of Object.keys(this.images)) {
      await this.postFile(this.images[i].photo, i, this.images[i].studentID).then(() => {
        const newImages = this.images;
        newImages[i].uploaded = true;
        this.images = newImages;
      });
    }
    console.log(this.images);
  }

  async postFile(fileToUpload: File, photoID: string, studentID: string) {
    const d = new Date();
    const name = `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}-ID${d.getMinutes()}${d.getSeconds()}${photoID}_${studentID}.jpeg`;
    const $uploadPhoto = await this.mrs.uploadProfilePhotoDirect(fileToUpload, name);
    $uploadPhoto.subscribe({
      error: (err) => {
        console.log('Err');
      },
      complete: () => console.log('SUCCESS')
    });
  }
}
