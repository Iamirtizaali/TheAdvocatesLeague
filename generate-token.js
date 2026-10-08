const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob'
);

const scopes = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent', // Force to get a new refresh token
  scope: scopes
});

console.log('--- ACTION REQUIRED ---');
console.log('1. Go to this URL in your browser:\n');
console.log(url);
console.log('\n2. Log in with your Google account and grant permissions.');
console.log('3. You will be given an authorization code. Paste it below.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nEnter the code: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\n--- SUCCESS! ---');
    console.log('Copy this new Refresh Token and update it in your Vercel Environment Variables:\n');
    console.log(tokens.refresh_token);
    console.log('\n-----------------');
  } catch (error) {
    console.error('Error getting tokens:', error.message);
  } finally {
    rl.close();
  }
});
