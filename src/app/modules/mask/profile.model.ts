/**
 * Created by ethan on 2/8/17.
 */

import { ProfileFull } from "src/shared-ng/interfaces/mask";
import { CURRENT_YEAR, DEFAULT_PHOTO, MEDIA_SM, MEDIA_URI } from "../../../shared-ng/config";

// This class is used to convert the backend profile into a frontend profile
// This should be updated if the profile model in the backend changes.
export class ProfileModel implements ProfileFull {
  wwuid = "";
  username = "";
  full_name = "";
  photo = "";
  gender = "";
  birthday = "";
  email = "";
  phone = "";
  website = "";
  majors = "";
  minors = "";
  graduate = "";
  preprofessional = "";
  class_standing = "";
  high_school = "";
  class_of = "";
  relationship_status = "";
  attached_to = "";
  quote = "";
  quote_author = "";
  hobbies = "";
  career_goals = "";
  favorite_books = "";
  favorite_food = "";
  favorite_movies = "";
  favorite_music = "";
  pet_peeves = "";
  personality = "";
  views = "";
  privacy = true;
  department = "";
  office = "";
  office_hours = "";
  year = "";

  // angular sometimes injects an error message into the profile
  error?: string;

  // If the data passed to the ProfileModel is a JSON, this constructor will parse it.
  constructor(data: ProfileFull | Partial<ProfileFull> | string, year: string = CURRENT_YEAR) {
    // we do a cast because you can't properly type a JSON object
    if (typeof data == "string") data = JSON.parse(data) as ProfileFull;
    for (const key in data) {
      if ((data[key].length > 0 && data[key] != "None") || data[key] != "") {
        this[key] = data[key].trim();
        // convert the privacy key to a boolean
      } else if (key == "privacy") {
        this[key] = data[key] == "1";
        // stop gap measure to make sure that if the backend sends a null value, we don't display it to the user
      } else if (key == "None") {
        this[key] = "";
      }
    }
    if ((!this.full_name || this.full_name == "") && this.username) {
      this.full_name = this.username.replace(/\./g, " ");
    }
    this.year = year;
  }

  linkByField(key: string): string {
    const value = this[key];
    let link = "javascript:void(0);";

    if (key == "phone") link = "tel:" + value;
    if (key == "email") link = "mailto:" + value;

    return link;
  }

  /*
   * Taken From Brock's old Angular mask
   * Gets the link for a given photo
   * TODO: Get functions in the model to be accessible to components
   * */
  getPhotoLink(uri: string): string {
    if (!uri || uri == "") uri = this.photo || DEFAULT_PHOTO;
    // hacky way to make sure that the default photo is
    // being pulled from the static assets folder
    if (uri == DEFAULT_PHOTO) return uri;
    let photo = MEDIA_SM + uri.replace(MEDIA_URI, "");
    photo = photo.replace("//", "/");

    return photo;
  }

  // Get the link for a given photo
  get photoLink(): string {
    return this.getPhotoLink("");
  }

  // Serialize the profile to JSON. Used when sending the profile to the backend.
  // We need to convert the privacy key to a string because the backend expects a string "1" or "0"
  toJSON() {
    //  set privacy to 0 or 1 for the backend
    return {
      ...this,
      privacy: this.privacy ? "1" : "0",
    }
  }
}
