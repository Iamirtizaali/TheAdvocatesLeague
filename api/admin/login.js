import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'advocatesleague';
  const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_key_for_tal';

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '1d' });
    
    res.setHeader('Set-Cookie', cookie.serialize('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
      path: '/'
    }));
    
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}
