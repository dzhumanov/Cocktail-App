import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSingleCocktail } from "../cocktailsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOneCocktail } from "../cocktailsThunk";
import { apiURL } from "../../../constants";

const OneCocktail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const cocktail = useAppSelector(selectSingleCocktail);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [id, dispatch]);

  const cocktailImg = apiURL + "/" + cocktail?.image;

  return (
    <>
      <Grid container direction="column">
        <Grid item container spacing={2}>
          <Grid item xs={3}>
            <Box
              component="img"
              sx={{
                display: "block",
                width: "100%",
                maxHeight: "500px",
                height: "auto",
              }}
              src={cocktailImg}
            />
          </Grid>
          <Grid item container xs={8} direction="column">
            <Typography variant="h3">{cocktail?.name}</Typography>
            <Typography variant="h5">Ingredients:</Typography>
            {cocktail?.ingredients.map((ingredient) => (
              <Typography variant="h6" key={ingredient._id}>
                {ingredient.name} - {ingredient.amount}
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Typography variant="h3">Recipe:</Typography>
          <Typography variant="h5">{cocktail?.recipe}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default OneCocktail;
