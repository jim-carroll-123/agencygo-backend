import { DBCONN_STR } from '@config';

export const dbConnection = {
  url: DBCONN_STR,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
