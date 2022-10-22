import { Document, model, Schema } from "mongoose";
import { IUser } from "./User";

/**
 * Type to model the Profile Schema for TypeScript.
 * @param user:ref => User._id
 * @param firstName:string
 * @param lastName:string
 * @param username:string
 */

export type TProfile = {
  user: IUser["_id"];
  firstName: string;
  lastName: string;
  username: string;
};

/**
 * Mongoose Document based on TProfile for TypeScript.
 * https://mongoosejs.com/docs/documents.html
 *
 * TProfile
 * @param user:ref => User._id
 * @param firstName:string
 * @param lastName:string
 * @param username:string
 */

export interface IProfile extends TProfile, Document {}

const profileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose Model based on TProfile for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TProfile
 * @param user:ref => User._id
 * @param firstName:string
 * @param lastName:string
 * @param username:string
 */

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
