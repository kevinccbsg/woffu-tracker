import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { rateLimit } from 'express-rate-limit';
import { handleHttpError, tagError } from 'error-handler-module';

import logger from './utils/logger';
import { unauthorizedError } from './utils/errors';
import config from './config';
import { authenticate, trackTime } from './services/woffu';

const app = express();
const port = process.env.PORT || 3000;
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: { xForwardedForHeader: false }
});
app.set('trust proxy', 1);
app.use(limiter);
app.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'success',
  });
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post('/api/track-time', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== config.API_KEY) {
      throw unauthorizedError('Invalid API key');
    }
    const auth = await authenticate();
    await trackTime(auth.access_token);
    return res.json({
      status: 'success',
    });
  } catch (error) {
    logger.error('Error tracking time', error);
    return next(tagError(error));
  }
});

app.use(handleHttpError(logger));

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
