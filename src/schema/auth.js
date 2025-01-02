import Joi from "joi";

export const registerSchema = Joi.object({
    username:Joi.string().required().trim().messages({
        "any.required" : "Username la bat buoc",
        "string.empty": "Username khong duoc de trong",
        "string.trim": "Username khong duoc co khoang trang"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Emmail la bat buoc",
        "string.email": "Email khong hop le",
        "string.empty": "Email khong duoc de trong"
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password la truong bat buoc",
        "string.min": "Password phai co it nhat {#limit} ky tu",
        "string.empty": "Password khong duoc de trong",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        "any.required": "Confirm bat buoc",
        "any.only": "Confirm khong khop",
        "string.empty": "Khong duoc de trong confirm",
    }),
    age: Joi.number().max(100).messages({
        "number.max": "Tuoi khong hop le",
    })
})