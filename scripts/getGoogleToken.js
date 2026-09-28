import fs from 'fs';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import url from 'url';

dotenv.config();

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
];

async function getAccessToken() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback'
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Force consent screen to get refresh token
  });

  console.log('\n=========================================');
  console.log('Authorize this app by visiting this url:');
  console.log(authUrl);
  console.log('=========================================\n');
  console.log('Waiting for authorization (a local server is running on port 3000)...');

  const server = http.createServer(async (req, res) => {
    try {
      if (req.url.startsWith('/oauth2callback')) {
        const q = url.parse(req.url, true).query;
        if (q.error) {
          console.log('Error returned from authorization:', q.error);
          res.end('Error during authorization. Check your terminal.');
          server.close();
          process.exit(1);
        }
        
        const code = q.code;
        if (code) {
          const { tokens } = await oAuth2Client.getToken(code);
          console.log('\n--- SUCCESS! ---');
          
          if (!tokens.refresh_token) {
            console.log('WARNING: No refresh token returned. Did you already authorize this app? If so, revoke access in your Google Account settings and try again.');
            res.end('Success, but no refresh token returned. See terminal for details.');
          } else {
            const envPath = path.resolve('.env');
            let envContent = fs.readFileSync(envPath, 'utf8');
            if (envContent.includes('GOOGLE_REFRESH_TOKEN=')) {
              envContent = envContent.replace(/GOOGLE_REFRESH_TOKEN=.*/g, `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
            } else {
              envContent += `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`;
            }
            fs.writeFileSync(envPath, envContent);
            console.log('Saved GOOGLE_REFRESH_TOKEN to .env');
            res.end('Authorization successful! You can close this tab and return to your terminal.');
          }
          
          server.close();
          process.exit(0);
        }
      } else {
        res.end('Invalid route');
      }
    } catch (e) {
      console.error(e);
      res.end('Authentication failed');
      server.close();
      process.exit(1);
    }
  }).listen(3000, () => {
    // Server started
  });
}

getAccessToken();
