const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    //user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("Todo", TodoSchema);
