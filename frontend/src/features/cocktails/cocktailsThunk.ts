import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cocktail, CocktailMutation } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  "cocktails/fetchAll",
  async () => {
    const response = await axiosApi.get<Cocktail[]>("/cocktails");
    return response.data;
  }
);

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>(
  "cocktails/fetchOne",
  async (cocktailId: string) => {
    const response = await axiosApi.get<Cocktail>(`/cocktails/${cocktailId}`);
    return response.data;
  }
);

export const createCocktail = createAsyncThunk<
  void,
  CocktailMutation,
  { state: RootState }
>("cocktails/create", async (cocktailMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      formData.append("name", cocktailMutation.name);
      formData.append("recipe", cocktailMutation.recipe);
      formData.append(
        "ingredients",
        JSON.stringify(cocktailMutation.ingredients)
      );

      //   cocktailMutation.ingredients.forEach((ingredient, index) => {
      //     formData.append(`ingredients[${index}].name`, ingredient.name);
      //     formData.append(`ingredients[${index}].amount`, ingredient.amount);
      //   });

      if (cocktailMutation.image) {
        formData.append("image", cocktailMutation.image);
      }

      await axiosApi.post("/cocktails", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});
