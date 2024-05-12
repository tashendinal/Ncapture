import Joi from 'joi';
import EHttpStatusCode from '../enums/HttpStatusCode.js';
const eventValidationSchema = Joi.object({
  eventName: Joi.string().trim().required(),
  eventDate: Joi.date().required(),
  eventTime: Joi.string().trim().required(),
  venue: Joi.string().trim().required(),
  createdBy: Joi.string().trim().required(),
  invites: Joi.array().items(Joi.string().trim()),
  status: Joi.string().valid('pending', 'approved', 'rejected').default('pending'),
  statusMessage: Joi.string().trim().allow(''),
  requiredEventRoles: Joi.array().items(Joi.string().valid('photographer', 'videographer', 'announcer')),
});


const EventValidator = {
    createUser: (req, res, next) => {
        const validate = eventValidationSchema.validate(req.body);
        if (validate.error) {
            return res
                .status(EHttpStatusCode.BAD_REQUEST)
                .json({ message: validate.error.details[0].message });
        }
        next();
    }
}
export default EventValidator;