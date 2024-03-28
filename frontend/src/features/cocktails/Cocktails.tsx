import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCocktails } from "./cocktailsSlice";
import { useEffect } from "react";
import { fetchCocktails } from "./cocktailsThunk";
import CocktailItem from "./components/CocktailItem";

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Cocktails
      </Typography>
      <Grid item container spacing={2}>
        {cocktails.map((cocktail) => (
          <CocktailItem key={cocktail._id} cocktail={cocktail} />
        ))}
      </Grid>
    </>
  );
};

export default Cocktails;
