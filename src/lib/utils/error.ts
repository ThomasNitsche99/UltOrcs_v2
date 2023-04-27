
export const error505 = (message: string) => {
    return new Response(JSON.stringify({ error: message }), { status: 505 })
}