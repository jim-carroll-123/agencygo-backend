import { DBCONN_STR } from '@config';

export const dbConnection = {
  url: DBCONN_STR,
  database: 'development',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
