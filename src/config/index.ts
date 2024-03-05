import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const config = {
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  API_KEY: process.env.API_KEY || '',
  AUTH: 'https://app.woffu.com/token',
  TRACK_TIME: 'https://niit.woffu.com/api/svc/signs/signs',
};

export default config;
