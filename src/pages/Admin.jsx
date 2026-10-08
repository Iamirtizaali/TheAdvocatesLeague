import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    // Try fetching applications to see if we're already authenticated via cookie
    fetchApplications();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchApplications();
      } else {
        const data = await res.json();
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/applications');
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-gray-100">
          <h1 className="text-3xl font-serif font-bold text-navy-900 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" required 
                value={username} onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" required 
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button 
              type="submit"
              className="w-full py-3 bg-navy-900 text-white font-bold rounded-lg hover:bg-navy-800 transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-navy-900">Applications Dashboard</h1>
          <button 
            onClick={fetchApplications}
            className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-500 transition-colors font-medium"
          >
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Drive</th>
                  <th className="p-4 font-semibold">Position</th>
                  <th className="p-4 font-semibold">Contact</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">Loading applications...</td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">No applications found.</td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-navy-900">{app.name}</td>
                      <td className="p-4 text-gray-600 text-sm max-w-[200px] truncate" title={app.selected_drive}>{app.selected_drive}</td>
                      <td className="p-4 text-gray-600">{app.position}</td>
                      <td className="p-4 text-gray-600">{app.contact_number}</td>
                      <td className="p-4 text-gray-500 text-sm">{new Date(app.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="text-gold-600 hover:text-gold-700 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for viewing application details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-navy-900">Application Details</h2>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500 font-medium">Name</p>
                <p className="text-lg font-semibold text-gray-900">{selectedApp.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Father's Name</p>
                <p className="text-lg font-semibold text-gray-900">{selectedApp.father_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">CNIC</p>
                <p className="text-lg font-semibold text-gray-900">{selectedApp.cnic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                <p className="text-lg font-semibold text-gray-900">{selectedApp.contact_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Email</p>
                <p className="text-lg font-semibold text-gray-900">{selectedApp.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Institution</p>
                <p className="text-lg font-semibold text-gray-900">{selectedApp.institution}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Semester / Year</p>
                <p className="text-lg font-semibold text-gray-900">{selectedApp.semester_year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Position Applied</p>
                <p className="text-lg font-bold text-gold-600">{selectedApp.position}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-500 font-medium mb-2">Reason to Join</p>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-800 text-sm whitespace-pre-wrap border border-gray-100">
                {selectedApp.reason}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Professional Picture</p>
                {selectedApp.professional_picture_url ? (
                  <a href={selectedApp.professional_picture_url} target="_blank" rel="noopener noreferrer">
                    <img src={selectedApp.professional_picture_url} alt="Profile" className="w-full h-64 object-cover rounded-lg shadow-sm border border-gray-200 hover:opacity-90 transition-opacity" />
                  </a>
                ) : (
                  <p className="text-gray-400 italic">No picture provided</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Student Card / Fee Challan</p>
                {selectedApp.student_card_url ? (
                  <a href={selectedApp.student_card_url} target="_blank" rel="noopener noreferrer">
                    {selectedApp.student_card_url.endsWith('.pdf') ? (
                      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors">
                        <span className="font-semibold text-navy-900">View PDF Document</span>
                      </div>
                    ) : (
                      <img src={selectedApp.student_card_url} alt="Student Card" className="w-full h-64 object-contain bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:opacity-90 transition-opacity" />
                    )}
                  </a>
                ) : (
                  <p className="text-gray-400 italic">No document provided</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
