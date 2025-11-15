import { Schema, model, models } from "mongoose";

export interface IUser {
	email: string;
	passwordHash: string;
	codes?: string[];
}

const UserSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true, index: true },
		passwordHash: { type: String, required: true },
		codes: { type: [String], default: [] },
	},
	{ timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
