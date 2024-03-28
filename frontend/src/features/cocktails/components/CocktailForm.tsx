import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/FileInput/FileInput";
import { CocktailMutation } from "../../../types";

interface Props {
  onSubmit: (mutation: CocktailMutation) => void;
}

const CocktailForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<CocktailMutation>({
    name: "",
    image: null,
    recipe: "",
    ingredients: [{ name: "", amount: "" }],
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const ingredientChangeHandler =
    (index: number, field: keyof (typeof state.ingredients)[0]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setState((prevState) => {
        const updatedIngredients = [...prevState.ingredients];
        updatedIngredients[index] = {
          ...updatedIngredients[index],
          [field]: value,
        };
        return { ...prevState, ingredients: updatedIngredients };
      });
    };

  const addIngredient = () => {
    setState((prevState) => {
      const newIngredient = [
        ...prevState.ingredients,
        { name: "", amount: "" },
      ];
      return { ...prevState, ingredients: newIngredient };
    });
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="recipe"
            label="Recipe"
            value={state.recipe}
            onChange={inputChangeHandler}
            name="recipe"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <Button color="primary" variant="contained" onClick={addIngredient}>
            Add new ingredient
          </Button>
          {state.ingredients.map((ingredient, index) => (
            <Grid item key={index}>
              <TextField
                id={`ingredient-name-${index}`}
                label="Ingredient name"
                value={ingredient.name}
                onChange={ingredientChangeHandler(index, "name")}
                name={`ingredient-name-${index}`}
                required
              />
              <TextField
                id={`ingredient-amount-${index}`}
                label="Amount"
                value={ingredient.amount}
                onChange={ingredientChangeHandler(index, "amount")}
                name={`ingredient-amount-${index}`}
                required
              />
            </Grid>
          ))}
        </Grid>

        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              mr: "20px",
              fontSize: "32px",
              bgcolor: "#1976D2",
              color: "#fff",
              "&:hover": {
                bgcolor: "#fff",
                color: "#000",
              },
              "&:active": {
                bgcolor: "#000",
                color: "#fff",
              },
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CocktailForm;
