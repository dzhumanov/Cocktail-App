import { createSlice } from "@reduxjs/toolkit";
import { Cocktail } from "../../types";
import { RootState } from "../../app/store";
import {
  fetchCocktails,
  fetchMyCocktails,
  fetchOneCocktail,
} from "./cocktailsThunk";

interface CocktailsState {
  cocktails: Cocktail[];
  singleCocktail: Cocktail | null;
  fetchLoading: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  singleCocktail: null,
  fetchLoading: false,
};

export const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchCocktails.fulfilled,
      (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.cocktails = cocktails;
      }
    );
    builder.addCase(fetchCocktails.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchMyCocktails.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchMyCocktails.fulfilled,
      (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.cocktails = cocktails;
      }
    );
    builder.addCase(fetchMyCocktails.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneCocktail.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchOneCocktail.fulfilled,
      (state, { payload: cocktail }) => {
        state.fetchLoading = false;
        state.singleCocktail = cocktail;
      }
    );
    builder.addCase(fetchOneCocktail.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectSingleCocktail = (state: RootState) =>
  state.cocktails.singleCocktail;
export const selectCocktailsLoading = (state: RootState) =>
  state.cocktails.fetchLoading;
