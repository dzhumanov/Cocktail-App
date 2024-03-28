import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cocktail } from "../../types";
import axiosApi from "../../axiosApi";

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
