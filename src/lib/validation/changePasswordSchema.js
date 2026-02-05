import * as z from "zod";

const passwordRegex =
/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const changePasswordSchema = z.object({
    password: z
        .string()
        .nonempty("Current Password is Required")
        .regex(passwordRegex, "Password must be atleast 8 characters"),

    newPassword: z
        .string()
        .nonempty("New Password is Required")
        .regex(passwordRegex, "Password must be atleast 8 characters"),

    reNewPassword: z.string().nonempty("Confirm Password is Required"),
}).refine(
    (data) => data.newPassword === data.reNewPassword,
    {
        path: ["reNewPassword"],
        error: "Passwords didnt match",
    }
);
