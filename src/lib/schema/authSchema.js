import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Name must be atleast 3 characters").max(15, "Name must not exceed 15 characters"),
    username: z.string().nonempty("Nis Required").min(3, "UserName must be atleast 3 characters").max(15, "UserName must not exceed 15 characters"),
    email: z.email("Email is Required"),
    password: z.string().nonempty("Password is Required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be atleast 8 characters"),
    rePassword: z.string().nonempty("RePassword is Required"),
    dateOfBirth: z.string().refine((date)=>{
        const currentYear = new Date().getFullYear()
        const birthYear = new Date(date).getFullYear()
        const age = currentYear - birthYear
        return age >= 12
    }, {error: "Age must be Atleast 12 Years Old "}),
    gender: z.string().nonempty("Gender is Required")
}).refine((data)=> data.password == data.rePassword , {
    path: ["rePassword"],
    error: "Passwords didnt match"
})


export const loginSchema = z.object({
    email: z.email("Email is Required"),
    password: z.string().nonempty("Password is Required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be atleast 8 characters"),
    
})