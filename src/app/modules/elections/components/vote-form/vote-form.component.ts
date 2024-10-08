// https://alligator.io/angular/reactive-forms-formarray-dynamic-fields/
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ElectionsRequestService } from "src/shared-ng/services/services";
import { CURRENT_YEAR, DEFAULT_PHOTO, MEDIA_SM } from "src/shared-ng/config";
import { Observable, forkJoin, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";

import { PageTransitions } from "src/app/modules/elections/components/vote/vote.component";
import {
  Candidate,
  Election,
  Position,
  Vote,
  VotePOST,
} from "src/shared-ng/interfaces/elections";

@Component({
  selector: "vote-form",
  templateUrl: "./vote-form.component.html",
  styleUrls: ["./vote-form.component.css"],
})
export class VoteFormComponent implements OnInit {
  // request data
  @Input() election: Election; // the current election
  @Input() position: Position; // the list of district positions
  @Input() votes: Vote[] = [];
  // completion emitter
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  candidates: { info: Candidate; photoUri: string }[] = [];
  stagedVotes: { vote: Vote; toDelete: boolean }[]; // only ever set toDelete to true if it also exists on the server (vote.id != null)
  formGroup: UntypedFormGroup;
  defaultPhoto: string;
  numVotesToKeep: number;
  disableVoteStaging: boolean;
  serverErrorText: string;
  alertUser: boolean;

  constructor(
    private fb: UntypedFormBuilder,
    private ers: ElectionsRequestService,
  ) {
    this.defaultPhoto = MEDIA_SM + "/" + DEFAULT_PHOTO;
    this.formGroup = new UntypedFormGroup({
      writeIn: new UntypedFormControl(""),
    });
    this.stagedVotes = [];
    this.numVotesToKeep = 0;
    this.disableVoteStaging = false;
  }

  ngOnInit() {
    this.setCandidates();
    this.stageExistingVotes();
    this.serverErrorText = "";
  }

  setCandidates() {
    function setCandidatePhoto(username, index, rs, candidates) {
      const uri = "/profile/" + CURRENT_YEAR + "/" + username;
      const profileObservable = rs.get(uri);
      profileObservable.subscribe(
        (data) => {
          let photoUri = MEDIA_SM + "/";
          photoUri += data.photo !== "None" ? data.photo : null;
          candidates[index].photoUri = photoUri;
        },
        (err) => {
          // TODO (stephen)
        },
        () => {
          // TODO (stephen)
        },
      );
    }

    // const getUri = 'elections/election/' + this.election.id + '/candidate';
    // const getCandidatesObservable = this.ers.get(getUri, {position: this.position.id});
    const candidateObservable = this.ers.listCandidates(this.election.id, {
      position: this.position.id,
    });
    candidateObservable.subscribe(
      (data) => {
        const candidates = data.map((item: Candidate) => ({
          info: item,
          photoUri: "",
        }));
        this.candidates = candidates;
        this.candidates.forEach((candidate, index) => {
          setCandidatePhoto(
            candidate.info.username,
            index,
            this.ers,
            this.candidates,
          );
        });
      },
      (err) => {
        // TODO
      },
      () => {
        // TODO
      },
    );
  }

  stageExistingVotes() {
    const votesObservable = this.ers.listVote({ position: this.position.id });
    votesObservable.subscribe(
      (data) => {
        const existingVotes = data;
        for (const vote of existingVotes) {
          if (this.position.id === vote.position) {
            this.stageVote(vote);
          }
        }
      },
      (err) => {},
      () => {
        // disable cast votes button if stagedVotes array length is 0
        if (this.stagedVotes.length === 0) {
          this.alertUser = true;
        } else {
          this.alertUser = false;
        }
      },
    );
  }

  indexOfObj(array, propertyPath: string[], value) {
    function getDeepPropertyValue(object, localPropertyPath: string[]) {
      // access a property deep in an object
      let propertyValue = object;
      for (const property of localPropertyPath) {
        if (propertyValue[property]) {
          propertyValue = propertyValue[property];
        } else {
          return;
        }
      }
      return propertyValue;
    }

    let index = -1;
    array.forEach((element, i) => {
      const elementPropertyValue = getDeepPropertyValue(element, propertyPath);
      if (elementPropertyValue && elementPropertyValue === value) {
        index = i;
      }
    });
    return index;
  }

  updateNumVotesToKeep() {
    let newNumVotesToKeep = 0;
    for (const vote of this.stagedVotes) {
      if (!vote.toDelete) {
        newNumVotesToKeep += 1;
      }
    }
    this.numVotesToKeep = newNumVotesToKeep;
    if (this.numVotesToKeep + 1 > this.election.max_votes) {
      this.disableVoteStaging = true;
    } else {
      this.disableVoteStaging = false;
    }
  }

  stageVote(vote: Vote) {
    // early exit, cancel if staging the vote would exceed max_votes
    if (this.numVotesToKeep + 1 > this.election.max_votes) {
      return;
    }
    // look for a vote in staged votes with the same username as the passed in vote
    // if no vote is staged by that name, stage the vote, otherwise,
    // just make sure the vote isn't set to be deleted.
    const candidateUsername = vote.vote;
    const stagedVoteIndex = this.indexOfObj(
      this.stagedVotes,
      ["vote", "vote"],
      candidateUsername,
    );
    if (stagedVoteIndex === -1) {
      const voteToStage = {
        vote,
        toDelete: false,
      };
      this.stagedVotes.push(voteToStage);
      // this.numVotesToKeep = this.numVotesToKeep + 1;
    } else {
      this.stagedVotes[stagedVoteIndex].toDelete = false;
    }

    // disable cast votes button if stagedVotes array length is 0
    if (this.stagedVotes.length === 0) {
      this.alertUser = true;
    } else {
      this.alertUser = false;
    }

    this.updateNumVotesToKeep();
  }

  stageVoteRemoval(stagedVoteIndex) {
    // stages a vote removal or removes a vote from stagedVotes if it doesn't exist on the server
    const index = stagedVoteIndex;
    if (stagedVoteIndex < this.stagedVotes.length && stagedVoteIndex >= 0) {
      if (this.stagedVotes[index].vote.id) {
        this.stagedVotes[index].toDelete = true;
      } else {
        this.stagedVotes.splice(index, 1);
      }
    }
    this.updateNumVotesToKeep();
  }

  onDeleteVoteButton(stagedVoteIndex) {
    const index = stagedVoteIndex;
    if (index < this.stagedVotes.length && index >= 0) {
      if (this.stagedVotes[index].toDelete) {
        this.stageVote(this.stagedVotes[index].vote);
      } else {
        this.stageVoteRemoval(index);
      }
    }
    if (this.stagedVotes.length === 0) {
      this.alertUser = true;
    } else {
      this.alertUser = false;
    }
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

  stageWriteIn() {
    const writeIn = this.formGroup.value.writeIn;
    if (writeIn) {
      const voteToStage: Vote = {
        id: null, // this should be filled in when we submit if we end up updating a vote
        election: this.election.id,
        position: this.position.id,
        username: null, // this should be filled in when we submit if we end up updating a vote
        vote: writeIn,
      };
      this.stageVote(voteToStage);
    }
    this.formGroup.reset();
  }

  stageUsername(candidateUsername) {
    const voteToStage: Vote = {
      id: null,
      election: this.election.id,
      position: this.position.id,
      username: null,
      vote: candidateUsername,
    };
    this.stageVote(voteToStage);
  }

  pageTransition(transition: number) {
    let i;
    if (this.alertUser) {
      i = confirm(
        "There are no votes in the queue. Click + " +
          "next to write-in to add write-in " +
          "or select a candidate. Select ok to exit voting.",
      );
    }
    if (i === undefined || i === true) {
      this.valueChange.emit(transition);
    } else {
      // do nothing and keep user on current screen
    }
  }

  buildRequestArrayObservable() {
    const updatableVotes: { vote: Vote; toDelete: boolean }[] = [];
    const newVotes: Vote[] = [];

    // sort votes into new votes and votes that can be updated or deleted
    for (const vote of this.stagedVotes) {
      if (vote.vote.id && vote.toDelete) {
        updatableVotes.push(vote);
      } else if (!vote.vote.id) {
        newVotes.push(vote.vote);
      } else {
        // do nothing, this means the current vote exists on the server, but will not be deleted or overwritten
      }
    }

    const requestArray = [];
    for (let i = 0; i < updatableVotes.length || i < newVotes.length; i++) {
      if (i < updatableVotes.length && i < newVotes.length) {
        const updatableVote: Vote = updatableVotes[i].vote;
        updatableVote.vote = newVotes[i].vote;
        requestArray.push(this.ers.updateVote(updatableVote, updatableVote.id));
      } else {
        if (i < updatableVotes.length) {
          // toDelete.push(updatableVotes[i].vote);
          requestArray.push(this.ers.removeVote(updatableVotes[i].vote.id));
        } else if (i < newVotes.length) {
          // toPost.push(newVotes[i]);
          const voteToPost: VotePOST = {
            election: this.election.id,
            position: this.position.id,
            vote: newVotes[i].vote,
          };
          requestArray.push(this.ers.createVote(voteToPost));
        } else {
          console.error(
            "buildRequestArrayObservable second sort, this error should never happen.",
          );
        }
      }
    }
    return forkJoin(requestArray);
  }

  onSubmit() {
    const requestArrayObservable = this.buildRequestArrayObservable();
    requestArrayObservable.subscribe(
      (data) => {
        this.serverErrorText = "";
      },
      (err) => {
        // show user error text from the server
        console.log(err);
        this.serverErrorText =
          "Something went wrong, make sure all entered usernames are valid.";
        this.pageTransition(PageTransitions.NextPage);
      },
      () => {
        this.pageTransition(PageTransitions.NextPage);
      },
    );
  }
}
