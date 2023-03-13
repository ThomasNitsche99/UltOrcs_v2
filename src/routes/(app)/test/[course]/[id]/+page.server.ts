import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    
    console.log('id', params.id)
    console.log('id', params.slug)


};