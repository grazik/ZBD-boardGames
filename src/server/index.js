import http from 'http';
import app from './server';
import config from './config/config';

const server = http.createServer(app),
    { serverConfig } = config;
let currentApp = app;

server.listen(serverConfig.port, () => {
    console.log(`Server listening on port ${serverConfig.port}`);
});

if (module.hot) {
    module.hot.accept(['./server'], () => {
        server.removeListener('request', currentApp);
        server.on('request', app);
        currentApp = app;
    });
}