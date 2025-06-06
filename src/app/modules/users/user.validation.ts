import { z }  from "zod";

const userValidationSchema = z.object({
    email : z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }),
    password :  z.number(),
    role: z.string({
        required_error: "Role is required",
        invalid_type_error: "Role must be a string",
    }) 
});
export default userValidationSchema;