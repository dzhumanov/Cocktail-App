import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { Cocktail } from "../../../types";
import { apiURL } from "../../../constants";

interface Props {
  cocktail: Cocktail;
}

const OneCocktail: React.FC<Props> = ({ cocktail }) => {
  let cardImage = apiURL + "/" + cocktail.image;

  return (
    <Grid item>
      <Card>
        <CardMedia component="img" height="200" image={cardImage} />
        <Typography variant="h5" component="div">
          {cocktail.name}
        </Typography>
      </Card>
    </Grid>
  );
};

export default OneCocktail;
