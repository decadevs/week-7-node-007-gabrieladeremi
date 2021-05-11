"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCircle = exports.validateSquare = exports.validateTriangle = exports.validateRectangle = void 0;
const joi_1 = __importDefault(require("joi"));
function validateRectangle(rectangle) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.object().min(2).max(2).required()
    });
    return schema.validate(rectangle);
}
exports.validateRectangle = validateRectangle;
function validateTriangle(triangle) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.object().min(3).max(3).required()
    });
    return schema.validate(triangle);
}
exports.validateTriangle = validateTriangle;
function validateSquare(square) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.object().max(1).required()
    });
    return schema.validate(square);
}
exports.validateSquare = validateSquare;
function validateCircle(circle) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.number().required()
    });
    return schema.validate(circle);
}
exports.validateCircle = validateCircle;
