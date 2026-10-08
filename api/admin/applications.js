import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Verify auth
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.admin_token;
  const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_key_for_tal';

  try {
    jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ success: true, applications: data });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
