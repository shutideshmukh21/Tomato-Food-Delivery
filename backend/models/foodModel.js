import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});

// ✅ Correct way to create or reuse the model
const foodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default foodModel;
