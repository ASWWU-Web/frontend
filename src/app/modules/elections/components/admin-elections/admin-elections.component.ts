import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ElectionsRequestService } from "src/shared-ng/services/services";
import { AbstractControl } from "@angular/forms";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { AdminElectionsCandidateModalComponent } from "../admin-candidates/admin-elections-candidate-modal.component";
import {
  Candidate,
  Election,
  Position,
} from "src/shared-ng/interfaces/elections";

@Component({
  selector: "[elections-row]",
  templateUrl: "./admin-elections-row.component.html",
  styleUrls: ["./admin-elections.component.css"],
})
export class AdminElectionsRowComponent implements OnInit {
  @Input() rowData: Election;
  @Input() positions: Position[];
  rowFormGroup: UntypedFormGroup;
  candidates: Candidate[];

  constructor(
    private modalService: NgbModal,
    private ers: ElectionsRequestService,
  ) {}

  ngOnInit() {
    // initialize class members
    // this.newRowData = Object.assign({}, this.rowData);
    this.candidates = [];
    this.rowFormGroup = new UntypedFormGroup({
      name: new UntypedFormControl(this.rowData.name, [Validators.required]),
      election_type: new UntypedFormControl(this.rowData.election_type, [
        Validators.required,
      ]),
      start: new UntypedFormControl(this.rowData.start, [
        Validators.required,
        this.dateValidator,
      ]),
      end: new UntypedFormControl(this.rowData.end, [
        Validators.required,
        this.dateValidator,
      ]),
      max_votes: new UntypedFormControl(this.rowData.max_votes, [
        Validators.required,
      ]),
    });
    // get candidates for this row
    if (this.rowData.id !== "") {
      const candidatesObservable = this.ers.listCandidates(this.rowData.id);
      candidatesObservable.subscribe(
        (data) => {
          this.candidates = data;
        },
        (err) => {
          window.alert("Unable to get candidates\n" + err.error.status);
        },
      );
    }
  }

  dateValidator(control: AbstractControl): Record<string, any> | null {
    const validRegex =
      /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{1,6})$/;
    // const validRegex = /^.?$/;
    const groups: RegExpExecArray = validRegex.exec(control.value);
    const groupsArray: string[] = [];
    for (const key in groups) {
      if (groups.hasOwnProperty(key)) {
        const element = groups[key];
        groupsArray.push(element);
      }
    }
    const fullValid = validRegex.test(control.value);
    const rangeValid =
      Number(groupsArray[2]) <= 12 &&
      Number(groupsArray[3]) <= 31 &&
      Number(groupsArray[4]) <= 24 &&
      Number(groupsArray[5]) <= 60 &&
      Number(groupsArray[6]) <= 60;
    return rangeValid && fullValid
      ? null
      : { invalidDate: { value: control.value } };
  }

  saveRow() {
    // Note: formData is in the same shape as what the server expects for a POST request (essentially an elections object without the id member)
    // this is not type safe, but we are doing it becuase the server will complain if an id is included in a post request
    const formData = Object.assign({}, this.rowFormGroup.value);
    const newElection: boolean = this.rowData.id.length === 0;
    let saveObservable: Observable<any>;

    if (newElection) {
      formData["show_results"] = null;
      saveObservable = this.ers.createElection(formData);
    } else {
      formData["id"] = this.rowData.id;
      formData["show_results"] = null;
      saveObservable = this.ers.updateElection(formData, this.rowData.id);
    }
    saveObservable.subscribe(
      (data) => {
        this.rowData = Object.assign({}, data);
        this.rowFormGroup.markAsPristine();
      },
      (err) => {
        window.alert("Unable to save.\n" + err.error.status);
      },
    );
  }

  openCandidatesModal() {
    const electionID = this.rowData.id;
    const election_type = this.rowData.election_type;
    const candidateData = this.candidates;
    const positionData = this.positions;
    const modalRef = this.modalService.open(
      AdminElectionsCandidateModalComponent,
      { size: "lg" },
    );
    modalRef.componentInstance.electionID = electionID;
    modalRef.componentInstance.election_type = election_type;
    modalRef.componentInstance.candidates = candidateData;
    modalRef.componentInstance.positions = positionData;
  }
}

@Component({
  selector: "app-admin-elections",
  templateUrl: "./admin-elections.component.html",
  styleUrls: ["./admin-elections.component.css"],
})
export class AdminElectionsComponent implements OnInit {
  @Input() data: Election[];
  @Input() positions: Position[];

  constructor(
    private ers: ElectionsRequestService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {}

  addElection() {
    const newElection: Election = {
      id: "",
      election_type: "",
      name: "",
      max_votes: 1,
      start: "",
      end: "",
      show_results: null,
    };
    this.data.push(newElection);
  }
}
