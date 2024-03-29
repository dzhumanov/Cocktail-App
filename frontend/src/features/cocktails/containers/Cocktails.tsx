import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCocktails, selectCocktailsLoading } from "../cocktailsSlice";
import { useEffect } from "react";
import { fetchCocktails } from "../cocktailsThunk";
import CocktailItem from "../components/CocktailItem";
import { selectUser } from "../../users/usersSlice";
import Preloader from "../../../components/Preloader/Preloader";

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);
  return (
    <>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontWeight: "bold", mb: "15px" }}
      >
        Cocktails
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : cocktails.length > 0 ? (
        <Grid container spacing={4} alignItems="center">
          {cocktails.map((cocktail) => {
            const isAdmin = user && user.role === "admin";
            const isOwner = user && cocktail.user._id === user._id;
            const shouldDisplay = cocktail.isPublished || isAdmin || isOwner;
            return shouldDisplay ? (
              <CocktailItem key={cocktail._id} cocktail={cocktail} />
            ) : null;
          })}
        </Grid>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          No cocktails yet!
        </Typography>
      )}
    </>
  );
};

export default Cocktails;
