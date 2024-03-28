import mongoose from "mongoose";
import { IngredientSchema } from "./Ingredient";

const CocktailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
    ingredients: {
      type: [IngredientSchema],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;
