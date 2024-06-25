import z from"zod"

export const loginSchema = z.object({
    email:z.string().email({ message: "Invalid email address" }),
    password :z.string().min(5, { message: "Must be 5 or more characters long" })
  })
  export const registerSchema = z.object({
    name:z.string().min(3, { message: "Must be 3 or more characters long" }),
    email:z.string().email({ message: "Invalid email address" }),
    password :z.string().min(5, { message: "Must be 5 or more characters long" })
  })
  export const RessetSchema = z.object({
    email:z.string().email({ message: "Invalid email address" }),
  })
  export const newpassworSchema = z.object({
    password :z.string().min(5, { message: "Must be 5 or more characters long" })
  })
  export const  searchSchema = z.object({
    name:z.string()
  })
 //cours 
 export const  categorySchema = z.object({
  category:z.string().min(3, { message: "Must be 3 or more characters long" }),
})
 export const  CourSchema = z.object({
  title:z.string().min(2, { message: "Must be 2 or more characters long" }),
  description:z.string().optional(),
  category:z.string().optional(),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive({ message: "Price must be a positive number" })
  ).optional(),
  isFree:z.boolean().optional()
})
export const  ChapitreSchema = z.object({
  title:z.string().min(2, { message: "Must be 2 or more characters long" }),
  description:z.string().optional(),
  isFree:z.boolean().optional(),
  content:z.string().optional()
})

export const titleChapitreSchema  = z.object({
  title:z.string().min(2, { message: "Must be 2 or more characters long" }),
})