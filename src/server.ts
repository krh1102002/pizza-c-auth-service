import app from './app';
import { Config } from './config';
import logger from './config/logger';

const startServer = () => {
    const PORT = Config.PORT;
    try {
        app.listen(PORT, () => {
            logger.error('testing the error');
            logger.info('Server listining on PORT', { port: PORT });
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
};

startServer();
