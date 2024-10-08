import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ElectionsRequestService } from "src/shared-ng/services/services";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { Position } from "src/shared-ng/interfaces/elections";

@Component({
  selector: "[positions-row]",
  templateUrl: "./admin-positions-row.component.html",
  styleUrls: ["./admin-positions.component.css"],
})
export class AdminPositionsRowComponent implements OnInit {
  @Input() rowData: Position;
  rowFormGroup: UntypedFormGroup;
  positions: Position[];

  constructor(
    private modalService: NgbModal,
    private ers: ElectionsRequestService,
  ) {}

  ngOnInit() {
    // initialize class members
    // this.newRowData = Object.assign({}, this.rowData);
    this.positions = [];
    this.rowFormGroup = new UntypedFormGroup({
      election_type: new UntypedFormControl(this.rowData.election_type, [
        Validators.required,
      ]),
      position: new UntypedFormControl(this.rowData.position, [
        Validators.required,
      ]),
      active: new UntypedFormControl(this.rowData.active, [
        Validators.required,
      ]),
      order: new UntypedFormControl(this.rowData.order, [Validators.required]),
    });
  }

  saveRow() {
    // Note: formData is in the same shape as what the server expects for a POST request (essentially an elections object without the id member)
    // this is not type safe, but we are doing it becuase the server will complain if an id is included in a post request
    const formData = Object.assign({}, this.rowFormGroup.value);
    const newPosition: boolean = this.rowData.id.length === 0;
    let saveObservable: Observable<any>;

    if (newPosition) {
      saveObservable = this.ers.createPosition(formData);
    } else {
      formData["id"] = this.rowData.id;
      saveObservable = this.ers.updatePosition(formData, this.rowData.id);
    }
    saveObservable.subscribe(
      (data) => {
        this.rowData = Object.assign({}, data);
        this.rowFormGroup.markAsPristine();
      },
      (err) => {
        window.alert("Unable to save\n" + err.error.status);
      },
    );
  }
}

@Component({
  selector: "app-admin-positions",
  templateUrl: "./admin-positions.component.html",
  styleUrls: ["./admin-positions.component.css"],
})
export class AdminPositionsComponent implements OnInit {
  @Input() data: Position[];

  constructor(private ers: ElectionsRequestService) {}

  ngOnInit() {}

  addPosition() {
    const newElection: Position = {
      id: "",
      election_type: "",
      position: "",
      active: true,
      order: 0,
    };
    this.data.push(newElection);
  }
}
