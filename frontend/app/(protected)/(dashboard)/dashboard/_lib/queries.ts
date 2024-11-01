import {GetUsersSchema, UsersSchema} from '@/app/(protected)/(dashboard)/dashboard/_lib/validations';

//: Promise<User[]>
export async function fetchUsers(input: GetUsersSchema) {
    try {
        const response = await fetch('https://fakestoreapi.com/users');

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const res = await response.json();

        // Validate the response data with Zod schema
        const data = UsersSchema.parse(res);
        const total = data.length;

        const pageCount = Math.ceil(total / input.per_page)
        return {data, pageCount}
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
}