import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    const uploadToCloudinary = async (base64String, folder) => {
      if (!base64String) return null;
      try {
        const uploadResponse = await cloudinary.uploader.upload(base64String, {
          folder: `theadvocatesleague/${folder}`,
        });
        return uploadResponse.secure_url;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return null;
      }
    };

    let pictureUrl = await uploadToCloudinary(data.professionalPictureBase64, 'pictures');
    let cardUrl = await uploadToCloudinary(data.studentCardBase64, 'cards');

    // Prepare row data for Supabase
    const { error: dbError } = await supabase
      .from('applications')
      .insert([
        {
          selected_drive: data.selectedDrive,
          name: data.name,
          father_name: data.fatherName,
          cnic: data.cnic,
          contact_number: data.contactNumber,
          email: data.email,
          institution: data.institution,
          semester_year: data.semesterYear,
          position: data.position,
          reason: data.reason,
          professional_picture_url: pictureUrl,
          student_card_url: cardUrl,
        }
      ]);

    if (dbError) {
      throw dbError;
    }

    return res.status(200).json({ success: true, message: 'Application submitted successfully!' });

  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
