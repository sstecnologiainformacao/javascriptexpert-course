const http = require('http');
const DEFAULT_USER = { username: 'Lucas', password: '123456' };

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page');
        return response.end();
    },
    '/login:post': async (request, response) => {
        for await (const data of request) {
            const user = JSON.parse(data);
            if (DEFAULT_USER.password !== user.password
                || DEFAULT_USER.username !== user.username) {
                    response.writeHead(401);
                    response.write('Logging failed!');
                    return response.end();
            }

            response.write('Logging has succeeded!');
            return response.end();

        }
    },

    default: (request, response) => {
        response.write('Hello World');
        return response.end();
    }
};

const handle = function (request, response) {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;
    if(routeKey === null) { return null }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    return chosen(request, response);
};

const app = http.createServer(handle).listen(3000, () => console.log('app running at', 3000));

module.exports = app;