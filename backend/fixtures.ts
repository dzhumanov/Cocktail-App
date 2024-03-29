import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Cocktail from "./models/Cocktail";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ["users", "cocktails"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [admin, user] = await User.create(
    {
      email: "admin@local.com",
      password: "123321",
      role: "admin",
      token: crypto.randomUUID(),
      displayName: "Administrator",
      avatar: "fixtures/admin.png",
    },
    {
      email: "user@local.com",
      password: "123321",
      role: "user",
      token: crypto.randomUUID(),
      displayName: "Default user",
      avatar: "fixtures/user.jpg",
    }
  );

  await Cocktail.create(
    {
      user: admin,
      name: "Margarita",
      image: "fixtures/margarita.webp",
      recipe:
        "Gather all ingredients. Sprinkle salt on a small plate. Lightly wet the rim of a cocktail glass or margarita glass with a damp paper towel. Dip the moistened rim in salt to coat. Set aside. Combine tequila, orange-flavored brandy, and lime juice in a cocktail shaker. Add ice and shake until chilled. Strain into a salt-rimmed cocktail glass or a salt-rimmed, ice-filled margarita glass. Garnish with a lime wheel.",
      ingredients: [
        { name: "salt", amount: "1 tablespoon" },
        { name: "tequila", amount: "½ fluid ounces" },
        { name: "orange flavored liqueur", amount: "1 fluid ounce" },
        { name: "lime juice", amount: "½ fluid ounce" },
        { name: "ice", amount: "1 cup" },
        { name: "lime", amount: "1 wheel" },
      ],
      isPublished: true,
    },
    {
      user: admin,
      name: "Tequila sunrise",
      image: "fixtures/tequila.webp",
      recipe:
        "Fill a highball glass with 1 1/2 cups ice and set aside. Combine orange juice and tequila in a cocktail shaker; add remaining 1 cup ice. Cover and shake until the outside of the shaker has frosted. Strain into the prepared highball glass. Slowly pour in grenadine and let settle. Stir before drinking.",
      ingredients: [
        { name: "Ice", amount: "2 ½ cups" },
        { name: "Orange juice", amount: "4 fluid ounces" },
        { name: "tequila", amount: "2 fluid ounces" },
        { name: "grenadine syrup", amount: "¾ fluid ounce" },
      ],
      isPublished: true,
    },
    {
      user: user,
      name: "Spanish Gin and Tonic",
      image: "fixtures/spanishGin.webp",
      recipe:
        "Fill a large red wine glass with fresh ice almost to the top. Add whole spices to the glass. These should be chosen to compliment the botanicals in the gin, and some common choices include juniper berries, peppercorns, star anise, cardamom pods, cloves, and cinnamon sticks. For a more pronounced flavor, whole spices can be “bruised” by pressing with your fingers, or the flat of a knife before adding.  Pour in gin. Then very slowly and gently pour in tonic, so as not to lose the carbonation. For best results, use a “Mediterranean style” tonic instead of the classic Indian style, since they tend to be less bitter, and often include flavors like rosemary and lemon. Add slices and/or zest from the citrus fruit(s) of your choice. Use a cocktail stirrer or spoon to gently poke the ingredients down, and mix the drink. Do not stir vigorously! Push in the fresh herb sprigs. Common choices are basil, thyme, mint, rosemary, or tarragon. For a stronger, more fragrant effect, slap the herbs between your hands, or squeeze between your fingers to activate the essential oils. Serve 3 to 5 minutes after mixing to give drink time to chill thoroughly.",
      ingredients: [
        {
          name: "Berries",
          amount:
            "whole spices, such as juniper berries, pink peppercorns, star anise, cardamom pods, cloves, or cinnamon sticks",
        },
        { name: "gin", amount: "2 fluid ounces" },
        { name: "tonic water", amount: "4 to 6 fluid" },
        {
          name: "sliced fresh citrus fruit, such as lemon, orange, lime, or blood orange",
          amount: "to taste",
        },
        {
          name: "fresh herbs, such as basil, thyme, mint, rosemary, or tarragon",
          amount: "to taste",
        },
      ],
      isPublished: true,
    },
    {
      user: user,
      name: "Long Island Iced Tea",
      image: "fixtures/spanishGin.webp",
      recipe:
        "Gather all ingredients. Fill a cocktail shaker with ice. Pour vodka, rum, gin, tequila, triple sec, and sour mix over ice; cover and shake. Pour cocktail into a Collins or hurricane glass; top with splash of cola for color. Garnish with a lemon slice. Garnish with lemon slices and mint leaves!",
      ingredients: [
        {
          name: "vodka",
          amount: "½ fluid ounce",
        },
        { name: "rum", amount: "½ fluid ounce" },
        { name: "tonic water", amount: "4 to 6 fluid" },
        {
          name: "gin",
          amount: "½ fluid ounce",
        },
        {
          name: "tequila",
          amount: "½ fluid ounce",
        },
        {
          name: "triple sec ",
          amount: "½ fluid ounce",
        },
        {
          name: "sweet and sour mix",
          amount: "1 fluid ounce ",
        },
        {
          name: "cola",
          amount: "1 fluid ounce ",
        },
        {
          name: "lemon",
          amount: "1 slice",
        },
      ],
      isPublished: true,
    }
  );

  await db.close();
};

void run();
