/**
 * Created by ethan on 2/8/17.
 */

import { ProfileFull } from "src/shared-ng/interfaces/mask";
import { DEFAULT_PHOTO, MEDIA_SM, MEDIA_URI } from "../../../shared-ng/config";

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
  privacy = "";
  department = "";
  office = "";
  office_hours = "";
  year = "";

  // If the data passed to the ProfileModel is a JSON, this constructor will parse it.
  constructor(data: ProfileFull | string | Partial<ProfileFull>) {
    if (typeof data == "string") data = JSON.parse(data) as ProfileFull;
    for (const key in data) {
      if ((data[key].length > 0 && data[key] != "None") || data[key] != "") {
        this[key] = data[key].trim();
      }
    }
    if ((!this.full_name || this.full_name == "") && this.username) {
      this.full_name = this.username.replace(/\./g, " ");
    }
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
  photoLink(): string {
    return this.getPhotoLink("");
  }
}
