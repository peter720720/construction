import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Plus, Trash2, Loader2, Image, LogOut } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', location: '' });
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState({ error: '', success: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'admin') {
      localStorage.clear();
      navigate('/admin-login');
    } else {
      setAdminName(localStorage.getItem('adminName') || 'Administrator');
      fetchAdminProjects();
    }
  }, [navigate]);

  const fetchAdminProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/projects`);
      if (response.data.status === 'success') setProjects(response.data.data.projects);
    } catch (err) {
      console.error(err.message);
    } finally { setLoading(false); }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!imageFile) return setMsg({ error: 'Please choose an image file showcases.', success: '' });

    setUploading(true);
    setMsg({ error: '', success: '' });

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}/api/projects`, data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        setMsg({ error: '', success: 'Project card created and saved to Cloudinary!' });
        setFormData({ title: '', description: '', location: '' });
        setImageFile(null);
        fetchAdminProjects();
      }
    } catch (err) {
      setMsg({ error: err.response?.data?.message || 'Error uploading file.', success: '' });
    } finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Purge this project tracking node completely?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdminProjects();
    } catch (err) { alert('Error purging card references.'); }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-zinc-950 text-white px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Admin Navigation Info Left Deck */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
            <div className="flex items-center space-x-2 text-amber-500 text-xs font-black uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Center</span>
            </div>
            <h1 className="text-xl font-black uppercase">{adminName}</h1>
            <button 
              onClick={() => { localStorage.clear(); navigate('/admin-login'); }}
              className="mt-6 flex items-center space-x-2 text-xs font-bold text-red-400 hover:text-red-500 transition-colors uppercase"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Core Console</span>
            </button>
          </div>

          {/* Creation input control framework block */}
          <form onSubmit={handleCreateProject} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-black uppercase text-sm border-b border-zinc-800 pb-2 text-amber-500">Publish New Work</h3>
            {msg.error && <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-lg text-center">{msg.error}</div>}
            {msg.success && <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg text-center">{msg.success}</div>}
            
            <input 
              type="text" required placeholder="Project Title" value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input 
              type="text" required placeholder="Location Coordinate (e.g. Lagos, NG)" value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <textarea 
              required placeholder="Structural Description Specifications" value={formData.description} rows={3}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
            
            <label className="flex items-center justify-center space-x-2 border-2 border-dashed border-zinc-800 hover:border-amber-500 p-4 rounded-xl cursor-pointer transition-colors text-xs text-zinc-500 font-bold">
              <Image className="w-4 h-4 text-amber-500" />
              <span>{imageFile ? imageFile.name : 'Select Render Image File'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
            </label>

            <button type="submit" disabled={uploading} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs uppercase font-black tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Commit Build Record</span><Plus className="w-4 h-4" /></>}
            </button>
          </form>
        </div>

        {/* Current entries management matrix list right deck */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-black uppercase tracking-wider text-amber-500">Live Active Portfolios</h2>
          {loading ? <div className="text-zinc-500 text-xs">Syncing data tables...</div> : projects.length === 0 ? (
            <div className="p-8 border border-zinc-800 text-center text-zinc-600 rounded-2xl text-xs uppercase font-medium">No published portfolios on file.</div>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p._id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between gap-4 group">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <img src={p.imageUrl} alt="" className="w-12 h-12 object-cover rounded-lg border border-zinc-800" />
                    <div>
                      <h4 className="text-xs font-black uppercase text-white truncate">{p.title}</h4>
                      <p className="text-[10px] text-zinc-500 tracking-wider font-bold uppercase">{p.location}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(p._id)} className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
