import { Card, CardMedia, Grid, Typography, styled } from "@mui/material";
import { Cocktail } from "../../../types";
import { apiURL } from "../../../constants";
import { NavLink } from "react-router-dom";

interface Props {
  cocktail: Cocktail;
}

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const CocktailItem: React.FC<Props> = ({ cocktail }) => {
  let cardImage = apiURL + "/" + cocktail.image;

  return (
    <Grid item>
      <Link to={`/cocktails/${cocktail._id}`}>
        <Card>
          <CardMedia component="img" height="200" image={cardImage} />
          <Typography
            variant="h5"
            component="div"
            sx={{ textDecoration: "none" }}
          >
            {cocktail.name}
          </Typography>
        </Card>
      </Link>
    </Grid>
  );
};

export default CocktailItem;
