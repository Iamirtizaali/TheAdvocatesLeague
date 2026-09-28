import { google } from 'googleapis';
import stream from 'stream';

// Ensure this function only runs on POST requests
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    
    // Set up Google OAuth2 Client
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

    // Helper function to upload base64 file to Google Drive
    const uploadToDrive = async (base64String, filename, mimeType) => {
      if (!base64String) return 'Not Provided';
      
      // Remove the data URI prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      
      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);

      const response = await drive.files.create({
        requestBody: {
          name: filename,
          mimeType: mimeType,
        },
        media: {
          mimeType: mimeType,
          body: bufferStream,
        },
        fields: 'id, webViewLink',
      });

      // Make the file publicly accessible so anyone with the link can view it
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        }
      });

      return response.data.webViewLink;
    };

    let pictureLink = 'Not Provided';
    let cardLink = 'Not Provided';

    // Upload Professional Picture if provided
    if (data.professionalPictureBase64) {
      pictureLink = await uploadToDrive(
        data.professionalPictureBase64, 
        `${data.name} - Picture`, 
        data.professionalPictureMimeType
      );
    }

    // Upload Student Card if provided
    if (data.studentCardBase64) {
      cardLink = await uploadToDrive(
        data.studentCardBase64, 
        `${data.name} - Card`, 
        data.studentCardMimeType
      );
    }

    // Prepare row data for Google Sheets
    // Columns: Timestamp, Drive, Name, Father Name, CNIC, Contact, Email, Institution, Semester/Year, Position, Reason, Picture Link, Card Link
    const rowData = [
      new Date().toLocaleString(),
      data.selectedDrive,
      data.name,
      data.fatherName,
      data.cnic,
      data.contactNumber,
      data.email,
      data.institution,
      data.semesterYear,
      data.position,
      data.reason,
      pictureLink,
      cardLink
    ];

    // Append to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:M', // Adjust to match your sheet name if it's not "Sheet1"
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    return res.status(200).json({ success: true, message: 'Application submitted successfully!' });

  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
