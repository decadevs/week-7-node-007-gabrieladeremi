import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import {
  validateSquare,
  validateRectangle,
  validateCircle,
  validateTriangle,
} from "../Utils/validator";
const path = require("path");
const database = path.join(__dirname, "../", "data/db.json");
var router = express.Router();

const result: Record<string, any>[] = [];

interface shapes {
  shape: string;
  dimension?: number | Record<string, any>;
  area?: number;
}

const validateShape: string[] = ["circle", "triangle", "square", "rectangle"];

/* GET all calculation results. */
router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to shapes calculator" });
});
router.get(
  "/fetchRecords",
  function (req: Request, res: Response, next: NextFunction) {
    res.status(200).json(result);
  }
);

/* Create a new calculation */
router.post("/calculate", (req: Request, res: Response, next: NextFunction) => {
  let newShape: shapes = {
    shape: req.body.shape,
    dimension: req.body.dimension,
  };

  const body = req.body;
  const shape = body.shape.toLowerCase();
  const index = validateShape.find((shapeItem: string) =>
    shapeItem.match(req.body.shape)
  );
  console.log(index);

  console.log(shape);
  if (shape === "") {
    return res.status(404).send({ message: "shape cannot be empty" });
  }

  if (index === undefined) {
    return res
      .status(404)
      .send({ message: `input a shape from ${validateShape}` });
  } else if (index === "rectangle") {
    const { error } = validateRectangle(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const { a, b } = req.body.dimension;
    newShape.area = Number((a * b).toFixed(2));
  } else if (index === "square") {
    const { error } = validateSquare(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const { a } = req.body.dimension;
    newShape.area = Number((a * a).toFixed(2));
  } else if (index === "circle") {
    const { error } = validateCircle(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const { a } = req.body.dimension;
    console.log(a);
    newShape.area = Number((3.14159 * (a ^ 2)).toFixed(2));
  } else if (index === "triangle") {
    const { error } = validateTriangle(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const { a, b, c } = req.body.dimension;
    const { dimension } = req.body;
    let arithArray: number[] = Object.values(dimension);
    arithArray.sort((x, y) => x - y);

    if (arithArray[2] > arithArray[1] + arithArray[0]) {
      res.status(400).send("Not a valid triangle");
    }
    const s = (a + b + c) / 2;
    newShape.area = Number(
      Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2)
    );
  }
  result.push(newShape);
  console.log(typeof result);

  fs.writeFileSync(database, JSON.stringify(result), "utf8");
  res.status(200).send(newShape);
});

export default router;
