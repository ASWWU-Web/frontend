import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { ElectionsRequestService } from "src/shared-ng/services/services";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";
import { of } from "rxjs";
import { Candidate, Position } from "src/shared-ng/interfaces/elections";

@Component({
  selector: "app-admin-elections-candidate-modal",
  templateUrl: "./admin-elections-candidate-modal.component.html",
  styleUrls: ["./admin-elections-candidate.component.css"],
})
export class AdminElectionsCandidateModalComponent implements OnInit {
  @Input() electionID: string;
  @Input() election_type: string;
  @Input() candidates: Candidate[];
  @Input() positions: Position[];
  notSaved: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private ers: ElectionsRequestService,
  ) {
    this.notSaved = false;
  }

  ngOnInit() {}

  addCandidate() {
    const empty_candidate: Candidate = {
      id: "",
      election: "",
      position: "",
      username: "",
      display_name: "",
    };
    this.candidates.push(empty_candidate);

    // disable new candidate button until row is saved or removed
    this.notSaved = true;
  }

  /**
   * deletes candidate from database and removes row in modal
   * @param candidate_id unique id assigned to candidate that is used to
   * distinguish which row has now data in it.
   */
  removeCandidate(candidate_id: string) {
    const candidateObservable = this.ers.removeCandidate(
      this.electionID,
      candidate_id,
    );
    // check to see if candidate_id is empty
    if (candidate_id === "") {
      let index = this.candidates.findIndex((candidate) => candidate.id === "");
      if (this.candidates.length > index) {
        index++;
      }
      this.candidates.splice(index, 1);
      this.notSaved = false;
    } else {
      // confirmation with user
      const userConfirm = confirm("Warning! This action is permanent.");
      if (userConfirm) {
        candidateObservable.subscribe(
          () => {
            // get specific index of row that user wants to delete
            const index = this.candidates.findIndex(
              (candidate) => candidate.id === candidate_id,
            );
            this.candidates.splice(index, 1);
          },
          () => {
            alert("Something went wrong 😢");
          },
        );
      }
    }
  }

  // enables new candidate button once new row is saved
  enableNewCandidate() {
    this.notSaved = false;
  }
}

@Component({
  selector: "[admin-candidates-row]",
  templateUrl: "./admin-elections-candidate-row.component.html",
  styleUrls: ["./admin-elections-candidate.component.css"],
})
export class AdminCandidatesRowComponent implements OnInit {
  @Input() rowData: Candidate;
  @Input() electionID: string;
  @Input() election_type: string;
  @Input() positions: Position[];
  @Output() notSaved = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<string>();
  rowFormGroup: UntypedFormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private ers: ElectionsRequestService,
  ) {}

  ngOnInit() {
    const arr: Position[] = [];
    for (const position of this.positions) {
      if (position.election_type === this.election_type) {
        arr.push(position);
      }
    }
    this.positions = arr;
    this.rowFormGroup = new UntypedFormGroup({
      position: new UntypedFormControl(this.rowData.position, [
        Validators.required,
      ]),
      username: new UntypedFormControl(this.rowData.username, [
        Validators.required,
      ]),
      display_name: new UntypedFormControl(this.rowData.display_name, [
        Validators.required,
      ]),
    });
  }

  getNames(query: string) {
    if (query === "") {
      return of({ results: [] });
    }
    return this.ers.get("search/names", { full_name: query });
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((data) => this.getNames(data)),
      map((data: { results: { username: string; full_name: string }[] }) => {
        return data.results.map((item) => item.username);
      }),
    );
  };

  // TODO: have child component send updated candidate array back to parent once new candidate is saved
  saveRow() {
    // Note: formData is in the same shape as what the server expects for a POST request (essentially an elections object without the id member)
    // this is not type safe, but we are doing it becuase the server will complain if an id is included in a post request
    const formData = Object.assign({}, this.rowFormGroup.value);
    const newCandidate: boolean = this.rowData.id.length === 0;
    let saveObservable: Observable<any>;

    if (newCandidate) {
      saveObservable = this.ers.createCandidate(this.electionID, formData);
    } else {
      formData["election"] = this.electionID;
      formData["id"] = this.rowData.id;
      saveObservable = this.ers.updateCandidate(
        formData,
        this.electionID,
        this.rowData.id,
      );
    }
    saveObservable.subscribe(
      (data) => {
        this.rowData = Object.assign({}, data);
        this.rowFormGroup.markAsPristine();
        this.notSaved.emit(false);
      },
      (err) => {},
    );
  }

  // Deletes Candidate
  deleteRow() {
    // calls parent class while emitting row id for indexing
    this.remove.emit(this.rowData.id);
  }
}
