import express from "express";
import Cocktail from "../models/Cocktail";
import { imageUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import mongoose, { Types } from "mongoose";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.get("/", async (req, res, next) => {
  try {
    let cocktails;

    if (req.query.user) {
      cocktails = await Cocktail.find({ user: req.query.user });
    } else {
      cocktails = await Cocktail.find();
    }
    return res.send(cocktails);
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.get("/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const cocktail = await Cocktail.findById(_id);

    if (!cocktail) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(cocktail);
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.post(
  "/",
  auth,
  imageUpload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      const ingredients = JSON.parse(req.body.ingredients);

      const cocktailData = {
        user: req.user?._id,
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        recipe: req.body.recipe,
        ingredients: ingredients,
      };

      const cocktail = new Cocktail(cocktailData);
      await cocktail.save();

      return res.send(cocktail);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  }
);

cocktailsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const cocktail = await Cocktail.findById(req.params.id);
      if (!cocktail) {
        return res.status(404).send({ error: "Artist not found!" });
      }
      cocktail.isPublished = !cocktail.isPublished;
      await cocktail.save();
      res.send(cocktail);
    } catch (error) {
      next(error);
    }
  }
);

cocktailsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res, next) => {
    try {
      const cocktailId = req.params.id;

      const cocktail = await Cocktail.findById(cocktailId);
      if (!cocktail) {
        return res.status(404).send({ error: "Cocktail not found!" });
      }

      await Cocktail.findByIdAndDelete(cocktailId);

      return res.send({ message: "Cocktail deleted." });
    } catch (e) {
      next(e);
    }
  }
);

export default cocktailsRouter;
