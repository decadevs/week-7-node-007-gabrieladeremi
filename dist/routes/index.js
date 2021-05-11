"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const validator_1 = require("../Utils/validator");
const path = require("path");
const database = path.join(__dirname, "../", "data/db.json");
var router = express_1.default.Router();
const result = [];
const validateShape = ["circle", "triangle", "square", "rectangle"];
/* GET all calculation results. */
router.get("/", (req, res) => {
    res.send({ message: "Welcome to shapes calculator" });
});
router.get("/fetchRecords", function (req, res, next) {
    res.status(200).json(result);
});
/* Create a new calculation */
router.post("/calculate", (req, res, next) => {
    let newShape = {
        shape: req.body.shape,
        dimension: req.body.dimension,
    };
    const body = req.body;
    const shape = body.shape.toLowerCase();
    const index = validateShape.find((shapeItem) => shapeItem.match(req.body.shape));
    console.log(index);
    console.log(shape);
    if (shape === "") {
        return res.status(404).send({ message: "shape cannot be empty" });
    }
    if (index === undefined) {
        return res
            .status(404)
            .send({ message: `input a shape from ${validateShape}` });
    }
    else if (index === "rectangle") {
        const { error } = validator_1.validateRectangle(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const { a, b } = req.body.dimension;
        newShape.area = Number((a * b).toFixed(2));
    }
    else if (index === "square") {
        const { error } = validator_1.validateSquare(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const { a } = req.body.dimension;
        newShape.area = Number((a * a).toFixed(2));
    }
    else if (index === "circle") {
        const { error } = validator_1.validateCircle(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const { a } = req.body.dimension;
        console.log(a);
        newShape.area = Number((3.14159 * (a ^ 2)).toFixed(2));
    }
    else if (index === "triangle") {
        const { error } = validator_1.validateTriangle(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const { a, b, c } = req.body.dimension;
        const { dimension } = req.body;
        let arithArray = Object.values(dimension);
        arithArray.sort((x, y) => x - y);
        if (arithArray[2] > arithArray[1] + arithArray[0]) {
            res.status(400).send("Not a valid triangle");
        }
        const s = (a + b + c) / 2;
        newShape.area = Number(Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2));
    }
    result.push(newShape);
    console.log(typeof result);
    fs_1.default.writeFileSync(database, JSON.stringify(result), "utf8");
    res.status(200).send(newShape);
});
exports.default = router;
