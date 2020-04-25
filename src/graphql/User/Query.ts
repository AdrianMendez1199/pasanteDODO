export const Query = {
    getUser(parent: any, args: any, ctx: any) {
        return [
            {
                id: 1,
                name: 'Adrian',
                lastname: 'Mendez',
                email: 'mendezadrian@gmail.com',
                phone: '121212'
            }
        ]
        
    }
}