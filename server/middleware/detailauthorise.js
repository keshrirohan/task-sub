import Joi from "joi";

const detailAuth = async (req, res, next) => {
  const schema = Joi.object({
    Fullname: Joi.string().required(),
    Task: Joi.string().uri().required(),
    Submitdate: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export default detailAuth;
