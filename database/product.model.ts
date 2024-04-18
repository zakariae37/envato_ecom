import { Schema, model, models, Document } from "mongoose";

export interface IProduct extends Document {
    title: string,
    description: string,
    price: number,
    categories: string,
    type: string,
    tags: Schema.Types.ObjectId[],
    seller: Schema.Types.ObjectId,
    upvotes: Schema.Types.ObjectId[],
    downvotes: Schema.Types.ObjectId[],
    createdAt: Date,
}

const ProductSchema = new Schema ({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    categories: { type: String, required: true }, 
    type: { type: String, required: true }, 
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], 
    seller: { type: Schema.Types.ObjectId, ref: 'User' }, 
    createdAt: { type: Date, default: Date.now },
});

const Product = models.Product || model('Product', ProductSchema);
export default Product;
