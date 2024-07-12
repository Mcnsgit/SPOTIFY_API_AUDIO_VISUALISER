import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import callbackRouter from './routes/callback.js';
import loginRouter from './routes/login.js';
import refreshRouter from './routes/refresh.js';

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/callback', callbackRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);

app.listen(port, () => console.log('Listening on port ' + port));
