import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) setProfileForm({ name: user.name || '', email: user.email || '' });
  }, [user]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ text: '', type: '' });
    try {
      const response = await api.put('/interns/profile', profileForm);
      setUser(response.data.data);
      setProfileMessage({ text: 'Profile updated successfully.', type: 'success' });
    } catch (error) {
      setProfileMessage({ text: error.response?.data?.message || 'Unable to update profile.', type: 'error' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ text: '', type: '' });
    try {
      await api.put('/interns/change-password', passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      setPasswordMessage({ text: 'Password changed successfully.', type: 'success' });
    } catch (error) {
      setPasswordMessage({ text: error.response?.data?.message || 'Unable to change password.', type: 'error' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const messageClass = (type) => type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">Account settings</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your personal information and account password.</p>
      </div>
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Profile information</h2>
        <form onSubmit={handleProfileSubmit} className="mt-5 space-y-4">
          {profileMessage.text && <div className={`rounded-md p-3 text-sm ${messageClass(profileMessage.type)}`}>{profileMessage.text}</div>}
          <Input label="Name" value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} required />
          <Input label="Email" type="email" value={profileForm.email} onChange={(event) => setProfileForm({ ...profileForm, email: event.target.value })} required />
          <Button type="submit" isLoading={profileLoading}>Save changes</Button>
        </form>
      </section>
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Change password</h2>
        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4">
          {passwordMessage.text && <div className={`rounded-md p-3 text-sm ${messageClass(passwordMessage.type)}`}>{passwordMessage.text}</div>}
          <Input label="Current password" type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })} required />
          <Input label="New password" type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })} required />
          <Button type="submit" isLoading={passwordLoading}>Update password</Button>
        </form>
      </section>
    </div>
  );
};

export default Profile;
