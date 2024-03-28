import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Container, Typography } from "@mui/material";
import CocktailForm from "./components/CocktailForm";
import { createCocktail } from "./cocktailsThunk";
import { CocktailMutation } from "../../types";

const CreateCocktail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (CocktailMutation: CocktailMutation) => {
    try {
      await dispatch(createCocktail(CocktailMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container
      sx={{
        bgcolor: "#fff",
        pt: "30px",
        pb: "30px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4">Post new artist</Typography>
      <CocktailForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default CreateCocktail;
