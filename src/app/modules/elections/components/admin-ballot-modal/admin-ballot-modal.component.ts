import { Component, Input, OnInit, Output } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { EventEmitter } from "@angular/core";
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";
import { of } from "rxjs";
import { RequestService } from "src/shared-ng/services/services";
import {
  BallotPOST,
  Candidate,
  Election,
  Position,
} from "src/shared-ng/interfaces/elections";

@Component({
  selector: "app-ballot-modal-content",
  templateUrl: "./admin-ballot-modal.component.html",
  styleUrls: ["./admin-ballot-modal.component.css"],
})
export class AdminBallotModalContentComponent implements OnInit {
  @Input() selectedElection: Election = null;
  @Input() positionsData: Position[] = [];
  @Input() candidateData: Candidate[] = [];
  @Output() saveBallot = new EventEmitter<BallotPOST>();
  @Output() closeModal = new EventEmitter<null>();
  ballotForm: UntypedFormGroup;
  clostFormFlag = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: UntypedFormBuilder,
    private rs: RequestService,
  ) {}

  ngOnInit() {
    // set up the ballot form
    this.ballotForm = this.fb.group({
      studentID: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]{7}"),
        ]),
      ],
      positions: this.fb.array([]),
    });
    this.setPositions();
  }

  setPositions(): void {
    const control = this.ballotForm.controls.positions as UntypedFormArray;
    this.positionsData.forEach((position) => {
      control.push(
        this.fb.group({
          candidates: this.setCandidates(position),
          writeins: this.setWriteIns(),
        }),
      );
    });
  }

  setCandidates(position: Position): UntypedFormArray {
    const arr = new UntypedFormArray([]);
    this.getCandidates(position).forEach(() => {
      arr.push(
        this.fb.group({
          candidate: false,
        }),
      );
    });
    return arr;
  }

  setWriteIns(): UntypedFormArray {
    const arr = new UntypedFormArray([]);
    for (let w = 0; w < this.selectedElection.max_votes; w++) {
      arr.push(
        this.fb.group({
          writein: "",
        }),
      );
    }
    return arr;
  }

  getCandidates(position: Position): Candidate[] {
    return this.candidateData.filter(
      (candidate) => candidate.position === position.id,
    );
  }

  getNames(query: string) {
    if (query === "") {
      return of({ results: [] });
    }
    return this.rs.get("search/names", { full_name: query });
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

  onSaveBallot(): void {
    // emit the form data
    const baseVote: BallotPOST = {
      student_id: this.ballotForm.value.studentID,
      election: this.selectedElection.id,
      position: null,
      vote: null,
    };
    // cast votes for each position
    this.positionsData.forEach((position: Position, p: number) => {
      // set the position ID
      baseVote.position = position.id;
      // cast votes for each voted for candidate
      this.getCandidates(position).forEach(
        (candidate: Candidate, c: number) => {
          // if the candidate was voted for, emit their vote
          if (this.ballotForm.value.positions[p].candidates[c].candidate) {
            // set the vote name and emit it
            baseVote.vote = candidate.username;
            this.saveBallot.emit(baseVote);
          }
        },
      );
      // cast votes for each writein caniddate
      this.ballotForm.value.positions[p].writeins.forEach((writein: any) => {
        // set the vote name and emit it
        if (writein.writein !== null && writein.writein !== "") {
          baseVote.vote = writein.writein;
          this.saveBallot.emit(baseVote);
        }
      });
    });
    // clear the form data
    this.ballotForm.reset();
    // check if the modal should be closed
    if (this.clostFormFlag) {
      this.closeModal.emit();
      this.clostFormFlag = false;
    }
  }

  onCloseModal(): void {
    // set the close form flag for when the votes have been submitted
    this.clostFormFlag = true;
  }
}

@Component({
  selector: "app-admin-ballot-modal",
  template: ``,
  styleUrls: ["./admin-ballot-modal.component.css"],
})
export class AdminBallotModalComponent implements OnInit {
  @Input() selectedElection: Election = null;
  @Input() positionsData: Position[] = [];
  @Input() candidateData: Candidate[] = [];
  @Output() saveBallot = new EventEmitter<BallotPOST>();
  modal: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  open(): void {
    // save the modal reference so we can close it
    this.modal = this.modalService.open(AdminBallotModalContentComponent);
    // pass data to the modal inputs
    this.modal.componentInstance.selectedElection = this.selectedElection;
    this.modal.componentInstance.positionsData = this.positionsData;
    this.modal.componentInstance.candidateData = this.candidateData;
    // save the ballot when the modal save event is triggered
    this.modal.componentInstance.saveBallot.subscribe((ballot: BallotPOST) => {
      this.saveBallot.emit(ballot);
    });
    // close the modal
    this.modal.componentInstance.closeModal.subscribe(() => {
      this.modal.close();
    });
  }
}
