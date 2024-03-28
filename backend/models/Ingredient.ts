import mongoose from "mongoose";

export const IngredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
});
