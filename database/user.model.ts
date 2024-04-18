import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
    clerkId: string,
    name: string,
    email: string,
    password?: string,
    picture: string,
    saved: Schema.Types.ObjectId[],
    joinedAt: Date
}

const UserSchema = new Schema ({
    clerkId: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String },
    picture: { type: String, require: true },
    saved: [{ type: Schema.Types.ObjectId , ref: 'Product' }],
    joinedAt: { type: Date, default: Date.now() },

})

const User = models.User || model('User', UserSchema)
export default User