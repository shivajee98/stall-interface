import { z } from 'zod'


export const AddressFormSchema = z.object({
    address: z.string().min(5).max(100),
    postalCode: z.string().min(2).max(5),
    state: z.string(),
    phoneNumber: z.string().min(10).max(13)

})
