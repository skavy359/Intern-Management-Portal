import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Search, Plus, Edit2, Eye, Shield, ShieldOff, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const InternsList = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [viewingIntern, setViewingIntern] = useState(null);
  const [confirmingIntern, setConfirmingIntern] = useState(null);
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedIntern, setSelectedIntern] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Backend Intern'
  });

  const roles = [
    'Admin', 'Backend Intern', 'Frontend Intern', 'Web Developer', 
    'QA Intern', 'DevOps Intern', 'UI/UX Intern', 'Data Intern'
  ];

  const fetchInterns = async () => {
    setLoading(true);
    setError('');
    try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const endpoint = search.trim()
        ? `/interns/search?keyword=${encodeURIComponent(search.trim())}&limit=${limit}&offset=${offset}`
        : `/interns?all=true&limit=${limit}&offset=${offset}`;
      const res = await api.get(endpoint);
      const payload = res.data.data;
      setInterns(payload.interns || []);
      setTotalPages(Math.max(1, Math.ceil((payload.pagination?.total || 0) / limit)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load interns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchInterns();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  const handleToggleStatus = async (id, currentStatus) => {
    if (currentStatus === 'active') {
      setConfirmingIntern(interns.find((intern) => intern.id === id));
      return;
    }
    try {
      const endpoint = `/interns/${id}/enable`;
      await api.patch(endpoint);
      showToast('Intern account enabled');
      fetchInterns();
    } catch (err) {
      showToast(err.response?.data?.message || 'Unable to update account status', 'error');
    }
  };

  const confirmDisable = async () => {
    if (!confirmingIntern) return;
    try {
      await api.delete(`/interns/${confirmingIntern.id}`);
      showToast('Intern account disabled');
      setConfirmingIntern(null);
      fetchInterns();
    } catch (err) {
      showToast(err.response?.data?.message || 'Unable to disable account', 'error');
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', email: '', password: '', role: 'Backend Intern' });
    setIsModalOpen(true);
  };

  const openEditModal = (intern) => {
    setModalMode('edit');
    setSelectedIntern(intern);
    setFormData({ name: intern.name, email: intern.email, role: intern.role });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await api.post('/interns', formData);
      } else {
        await api.put(`/interns/${selectedIntern.id}`, {
          name: formData.name,
          email: formData.email,
          role: formData.role
        });
      }
      setIsModalOpen(false);
      showToast(modalMode === 'add' ? 'Intern created successfully' : 'Intern updated successfully');
      fetchInterns();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error occurred', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Interns</h1>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Intern
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {viewingIntern && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="view-intern-title">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Intern details</p>
                <h2 id="view-intern-title" className="mt-1 text-xl font-semibold text-gray-900">{viewingIntern.name}</h2>
              </div>
              <button type="button" onClick={() => setViewingIntern(null)} aria-label="Close details"><X className="h-5 w-5 text-gray-500" /></button>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="text-gray-500">Email</dt><dd className="font-medium text-gray-900">{viewingIntern.email}</dd></div>
              <div><dt className="text-gray-500">Role</dt><dd className="font-medium text-gray-900">{viewingIntern.role}</dd></div>
              <div><dt className="text-gray-500">Status</dt><dd className="font-medium text-gray-900">{viewingIntern.is_enabled ? 'Active' : 'Disabled'}</dd></div>
              <div><dt className="text-gray-500">Created</dt><dd className="font-medium text-gray-900">{viewingIntern.created_at ? new Date(viewingIntern.created_at).toLocaleString() : '—'}</dd></div>
            </dl>
            <Button type="button" variant="secondary" className="mt-6 w-full" onClick={() => setViewingIntern(null)}>Close</Button>
          </div>
        </div>
      )}

      {confirmingIntern && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="disable-title">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 id="disable-title" className="text-lg font-semibold text-gray-900">Disable this intern?</h2>
            <p className="mt-2 text-sm text-gray-600">The account for {confirmingIntern.name} will no longer be able to sign in. You can enable it again later.</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setConfirmingIntern(null)}>Cancel</Button>
              <Button type="button" variant="danger" onClick={confirmDisable}>Disable account</Button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search interns..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="glass-input block w-full pl-10 pr-3 py-2 rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Loading...</td>
                </tr>
              ) : interns.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No interns found.</td>
                </tr>
              ) : (
                interns.map((intern) => (
                  <tr key={intern.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{intern.name}</span>
                        <span className="text-sm text-gray-500">{intern.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {intern.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        intern.is_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {intern.is_enabled ? 'active' : 'disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {intern.created_at ? new Date(intern.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setViewingIntern(intern)} className="text-gray-600 hover:text-gray-900 mr-4" aria-label={`View ${intern.name}`}>
                        <Eye className="w-4 h-4 inline" />
                      </button>
                      <button onClick={() => openEditModal(intern)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(intern.id, intern.is_enabled ? 'active' : 'disabled')}
                        className={`${intern.is_enabled ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                      >
                        {intern.is_enabled ? <ShieldOff className="w-4 h-4 inline" /> : <Shield className="w-4 h-4 inline" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} variant="secondary">Previous</Button>
            <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} variant="secondary">Next</Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1} 
                  variant="secondary"
                  className="rounded-l-md rounded-r-none border-gray-300"
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                  disabled={page === totalPages} 
                  variant="secondary"
                  className="rounded-r-md rounded-l-none border-gray-300"
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                    {modalMode === 'add' ? 'Add Intern' : 'Edit Intern'}
                  </h3>
                  <div className="space-y-4">
                    <Input label="Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <Input label="Email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    {modalMode === 'add' && (
                      <Input label="Password" type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button type="submit" className="w-full sm:ml-3 sm:w-auto">
                    Save
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternsList;
