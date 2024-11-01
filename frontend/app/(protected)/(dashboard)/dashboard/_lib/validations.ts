import {z} from 'zod';

export const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    title: z.string().optional(),
    status: z.string().optional(),
    operator: z.enum(["and", "or"]).optional(),
});

export const getUsersSchema = searchParamsSchema;
export type GetUsersSchema = z.infer<typeof getUsersSchema>;

const UserSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    name: z.object({
        firstname: z.string(),
        lastname: z.string(),
    }),
    address: z.object({
        city: z.string(),
        street: z.string(),
        number: z.number(),
        zipcode: z.string(),
        geolocation: z.object({
            lat: z.string(),
            long: z.string(),
        }),
    }),
    phone: z.string(),
}).transform(({name, ...rest}) => ({
    ...rest,
    firstname: name.firstname,
    lastname: name.lastname,
}));

export const UsersSchema = z.array(UserSchema);
export type User = z.infer<typeof UserSchema>;

