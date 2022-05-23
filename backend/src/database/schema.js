import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: {},
  }
);

const Item = mongoose.model("Item", itemSchema);

export { Item };
