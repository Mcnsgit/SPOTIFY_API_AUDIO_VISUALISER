import express from 'express';
import axios from 'axios';
import stringifyObject from 'stringify-object';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect_uri =  process.env.REDIRECT_URI || 'http://localhost:3001/callback';
const SCOPE='streaming user-read-email  user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state'

app.use(cors());

console.log(redirect_uri);

/**
 * @name login
 * @returns {access_token} returns an access token afte user logs in
 * 
 */
const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri
  });
  
  app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + params.toString());
  });


console.log(CLIENT_ID)

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token } = response.data;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
    res.redirect(`${uri}?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Error in /callback:', error);
    res.status(500).send('Error during authentication');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}. Go http://localhost:${PORT}/login to initiate authentication flow.`);
});