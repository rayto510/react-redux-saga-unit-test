import { rest } from 'msw';

const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    title: 'Elden Ring',
                    body: 'No maidens',
                },
                {
                    title: 'Stray',
                    body: 'Meow',
                },
                {
                    title: 'Foo',
                    body: 'Bar',
                }
            ]),
        )
    })
];

export { handlers };
