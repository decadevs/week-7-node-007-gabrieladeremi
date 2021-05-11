import Joi from 'joi'


export function validateRectangle(rectangle:{}) {
    const schema = Joi.object({
        shape: Joi.string().required(),
        dimension: Joi.object().min(2).max(2).required()
    })
    return schema.validate(rectangle)
    
}

export function validateTriangle(triangle:{}) {
    const schema = Joi.object({
        shape: Joi.string().required(),
        dimension: Joi.object().min(3).max(3).required()
    })
    return schema.validate(triangle);
    
}


export function validateSquare(square: {}) {
    const schema = Joi.object({
        shape: Joi.string().required(),
        dimension: Joi.object().max(1).required()
    })
    return schema.validate(square);
    
}

export function validateCircle(circle: {}) {
    const schema = Joi.object({
        shape: Joi.string().required(),
        dimension: Joi.number().required()
    })
    return schema.validate(circle);
    
}