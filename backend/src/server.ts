import express from 'express';
import Routes from './router';

const app = express();
app.use(express.json());
const port = '3333';
app.use(Routes);


app.listen(port, () => {
  console.log('🚀 starting server node in port 3333');
});
