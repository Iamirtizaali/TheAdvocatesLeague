import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Upload } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Join() {
  const [step, setStep] = useState(1);
  const [selectedDrive, setSelectedDrive] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const drives = [
    "TAL - Lahore Chapter - Induction Drive 2026-27",
    "TAL - Lahore Campuses Cabinet - Induction Drive 2026-27"
  ];

  const positions = [
    "President",
    "General Secretary",
    "Senior Vice President",
    "Vice President",
    "Joint Secretary",
    "Chief-Coordinator",
    "Finance Secretary",
    "HR & PR Head",
    "Media Head",
    "Information Secretary",
    "Event Manager"
  ];

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    cnic: '',
    contactNumber: '',
    email: '',
    institution: '',
    semesterYear: '',
    position: '',
    reason: '',
    professionalPicture: null,
    studentCard: null,
  });

  const handleDriveSelect = (drive) => {
    setSelectedDrive(drive);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const pictureBase64 = await convertToBase64(formData.professionalPicture);
      const cardBase64 = await convertToBase64(formData.studentCard);

      const payload = {
        ...formData,
        selectedDrive,
        professionalPictureBase64: pictureBase64,
        professionalPictureMimeType: formData.professionalPicture?.type || null,
        studentCardBase64: cardBase64,
        studentCardMimeType: formData.studentCard?.type || null,
      };

      // Remove File objects before sending JSON
      delete payload.professionalPicture;
      delete payload.studentCard;

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Application submitted successfully! We will contact you soon.' });
        // Optional: Reset form here
      } else {
        setSubmitMessage({ type: 'error', text: data.message || 'Failed to submit application. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage({ type: 'error', text: 'An error occurred while submitting. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4"
          >
            Join The Advocates' League
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Become a part of our growing community of legal professionals and students.
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
          
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">Select an Induction Drive</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {drives.map((drive, index) => (
                  <button
                    key={index}
                    onClick={() => handleDriveSelect(drive)}
                    className="flex items-center justify-between p-6 rounded-xl border-2 border-gray-100 hover:border-gold-500 hover:bg-gold-50/50 transition-all text-left group"
                  >
                    <span className="font-semibold text-navy-900 group-hover:text-gold-700">
                      {drive}
                    </span>
                    <ChevronRight className="text-gray-400 group-hover:text-gold-500 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button 
                onClick={() => setStep(1)}
                className="flex items-center text-gray-500 hover:text-navy-900 mb-6 transition-colors font-medium"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Selection
              </button>

              <div className="mb-8 p-4 bg-navy-50 rounded-lg border border-navy-100">
                <p className="text-sm text-navy-700 font-medium">Applying for:</p>
                <p className="text-lg font-bold text-navy-900">{selectedDrive}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input 
                      type="text" required name="name" 
                      value={formData.name} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                      placeholder="Full Name"
                    />
                  </div>
                  
                  {/* Father Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name *</label>
                    <input 
                      type="text" required name="fatherName"
                      value={formData.fatherName} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                      placeholder="Father's Name"
                    />
                  </div>

                  {/* CNIC */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CNIC Number *</label>
                    <input 
                      type="text" required name="cnic"
                      value={formData.cnic} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                      placeholder="XXXXX-XXXXXXX-X"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number (WhatsApp) *</label>
                    <input 
                      type="text" required name="contactNumber"
                      value={formData.contactNumber} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                      placeholder="+92 3XX XXXXXXX"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Address *</label>
                    <input 
                      type="email" required name="email"
                      value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                    <input 
                      type="text" required name="institution"
                      value={formData.institution} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                      placeholder="University / College Name"
                    />
                  </div>

                  {/* Semester / Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester / Year *</label>
                    <input 
                      type="text" required name="semesterYear"
                      value={formData.semesterYear} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. 5th Semester / 3rd Year"
                    />
                  </div>

                  {/* Applying for Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Applying for Position *</label>
                    <select 
                      required name="position"
                      value={formData.position} onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="" disabled>Select a position</option>
                      {positions.map((pos, idx) => (
                        <option key={idx} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Professional Picture */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Picture</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500 font-medium">Click to upload picture</p>
                          {formData.professionalPicture && (
                            <p className="text-xs text-green-600 mt-1">{formData.professionalPicture.name}</p>
                          )}
                        </div>
                        <input type="file" name="professionalPicture" className="hidden" accept="image/*" onChange={handleInputChange} />
                      </label>
                    </div>
                  </div>

                  {/* Student Card / Fee Challan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Card / Fee Challan</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500 font-medium">Click to upload document</p>
                          {formData.studentCard && (
                            <p className="text-xs text-green-600 mt-1">{formData.studentCard.name}</p>
                          )}
                        </div>
                        <input type="file" name="studentCard" className="hidden" accept="image/*,.pdf" onChange={handleInputChange} />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Reason to join */}
                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason to join TAL *</label>
                  <textarea 
                    required name="reason" rows="4"
                    value={formData.reason} onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Briefly explain why you want to join The Advocates' League..."
                  ></textarea>
                </div>

                {submitMessage.text && (
                  <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {submitMessage.text}
                  </div>
                )}

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-gold-500/30 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
