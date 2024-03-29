import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSingleCocktail } from "../cocktailsSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCocktail,
  fetchOneCocktail,
  toggleCocktail,
} from "../cocktailsThunk";
import { apiURL } from "../../../constants";
import { selectUser } from "../../users/usersSlice";
import InterfaceInfoAdmin from "../../../components/UI/InterfaceInfo/InterfaceInfoAdmin";
import InterfaceInfoUser from "../../../components/UI/InterfaceInfo/InterfaceInfoUser";

const OneCocktail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const cocktail = useAppSelector(selectSingleCocktail);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneCocktail(id));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (cocktail) {
      await dispatch(deleteCocktail(cocktail?._id));
    }
    navigate("/");
  };

  const handleToggle = async () => {
    if (cocktail) {
      await dispatch(toggleCocktail(cocktail?._id));
      if (id) {
        await dispatch(fetchOneCocktail(id));
      }
    }
  };

  const cocktailImg = apiURL + "/" + cocktail?.image;
  let interfaceInfo;

  if (user && user.role === "admin") {
    interfaceInfo = (
      <InterfaceInfoAdmin
        isPublished={cocktail?.isPublished}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    );
  } else if (user && user._id === cocktail?.user && !cocktail?.isPublished) {
    interfaceInfo = (
      <InterfaceInfoUser
        isPublished={cocktail.isPublished}
        onDelete={handleDelete}
      />
    );
  }

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
            {interfaceInfo}
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
