import Joi from 'joi';
import EHttpStatusCode from '../enums/HttpStatusCode.js';
const userValidationSchema = Joi.object({
    firstName: Joi.string().trim().max(50),
    lastName: Joi.string().trim().max(50),
    email: Joi.string().email().trim().required(),
    phoneNumber: Joi.number(),
    password: Joi.string().trim().min(6).required(),
    role: Joi.string().valid('lecturer', 'staff', 'administrator', 'mediaAdmin', 'mediaMember').default('lecturer'),
});

const UserValidator = {
    createUser: (req, res, next) => {
        const validate = userValidationSchema.validate(req.body);
        if (validate.error) {
            return res
                .status(EHttpStatusCode.BAD_REQUEST)
                .json({ message: validate.error.details[0].message });
        }
        next();
    }
}
export default UserValidator;