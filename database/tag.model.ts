import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
    name: string,
    products: Schema.Types.ObjectId[],
    createdOn: Date
}

const TagSchema = new Schema ({
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    createdOn: { type: Date, default: Date.now() }, 
})

const Tag = models.Tag || model('Tag', TagSchema)
export default Tag