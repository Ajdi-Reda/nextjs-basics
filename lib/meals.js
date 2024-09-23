import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("failed to fetch meals");
  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = (slug) => {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) throw new Error("Uploading image failed");
  });

  meal.image = `/images/${fileName}`;
  db.prepare(
    `INSERT INTO meals(slug, title, image, summary, instructions, creator, creator_email) VALUES( 
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email)`
  ).run(meal);
};
