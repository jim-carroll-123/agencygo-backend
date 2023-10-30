import { DBCONN_STR } from '@config';

export const dbConnection = {
  url: "mongodb://127.0.0.1:27017",
  database: "ONLYMANAGE-BACKEND",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
