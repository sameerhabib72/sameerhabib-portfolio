import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { User, Role } from '../../types';
import { Shield, Plus, Trash2, Edit, UserCheck, Key, Lock, CheckCircle2, Image, Upload, Camera, Sparkles, RefreshCw } from 'lucide-react';
import { AdminFileManagerModal } from './AdminFileManagerModal';

const PRESET_AVATARS = [
  { label: 'Sameer Habib', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { label: 'Engineer 1', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80' },
  { label: 'Engineer 2', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80' },
  { label: 'Engineer 3', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
  { label: 'Engineer 4', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
];

export const AdminUserManager: React.FC = () => {
  const { users, saveUser, deleteUser, currentUser, showToast } = useData();
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [fileManagerOpen, setFileManagerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && editingUser) {
        setEditingUser({
          ...editingUser,
          avatar: reader.result
        });
        showToast('Profile image loaded from local file');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser?.email || !editingUser?.name) {
      showToast('Name and Email are required', 'error');
      return;
    }

    const item: User = {
      id: editingUser.id || 'usr-' + Date.now(),
      email: editingUser.email || '',
      name: editingUser.name || '',
      role: (editingUser.role as Role) || 'editor',
      avatar: editingUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: (editingUser.status as 'active' | 'inactive') || 'active',
      lastLogin: editingUser.lastLogin || new Date().toISOString().replace('T', ' ').substring(0, 19),
      twoFactorEnabled: editingUser.twoFactorEnabled ?? false
    };

    saveUser(item);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-cyan-400" />
            Team Access & Role-Based Permissions (RBAC)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Grant granular permissions to engineering reviewers, recruiters, content writers, and system administrators.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingUser({
              name: '',
              email: '',
              role: 'editor',
              status: 'active',
              twoFactorEnabled: false
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Role explanation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#080c15] border border-cyan-500/20">
          <span className="font-bold text-cyan-400 block font-mono">Super Admin</span>
          <p className="text-slate-400 text-[11px] mt-1">Full access: deployments, settings, delete databases, and invite users.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080c15] border border-white/10">
          <span className="font-bold text-white block font-mono">Admin</span>
          <p className="text-slate-400 text-[11px] mt-1">Full content CRUD, CV uploads, message moderation, and redirect controls.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080c15] border border-white/10">
          <span className="font-bold text-white block font-mono">Editor</span>
          <p className="text-slate-400 text-[11px] mt-1">Create and publish projects, skills, articles, and review testimonials.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#080c15] border border-white/10">
          <span className="font-bold text-white block font-mono">Viewer</span>
          <p className="text-slate-400 text-[11px] mt-1">Read-only view for telemetry, contact submissions, and internal logs.</p>
        </div>
      </div>

      {/* Users List */}
      <div className="rounded-2xl border border-white/10 bg-[#080c15] overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[11px]">
              <th className="p-4 font-semibold">User Profile</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">2FA Protection</th>
              <th className="p-4 font-semibold">Last Session</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={u.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{u.name}</span>
                        {currentUser?.email === u.email && (
                          <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-mono">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-[11px] font-mono">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold capitalize ${
                      u.role === 'super_admin'
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                        : u.role === 'admin'
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {u.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono capitalize ${
                      u.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-4">
                  {u.twoFactorEnabled ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Enforced</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px] font-mono">Optional</span>
                  )}
                </td>
                <td className="p-4 font-mono text-slate-400 text-[11px]">{u.lastLogin || 'Never'}</td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingUser(u)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit User"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (u.role === 'super_admin') {
                          showToast('Cannot delete the primary Super Admin account.', 'error');
                          return;
                        }
                        if (window.confirm(`Revoke access for ${u.name} (${u.email})?`)) {
                          deleteUser(u.id);
                        }
                      }}
                      disabled={u.role === 'super_admin'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        u.role === 'super_admin'
                          ? 'text-slate-600 cursor-not-allowed'
                          : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer'
                      }`}
                      title="Revoke Access"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              {editingUser.id ? `Edit Member: ${editingUser.name}` : 'Invite Team Member'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Profile Image & Avatar Picker */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 space-y-3">
                <label className="block text-[11px] font-mono text-slate-300 uppercase tracking-wider font-semibold">
                  Profile Photo & Avatar
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={editingUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={editingUser.name || 'User Avatar'}
                      className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/50 shadow-md shadow-cyan-500/10"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-1 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm cursor-pointer"
                      title="Upload Photo"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        <Upload className="w-3 h-3 text-cyan-400" />
                        <span>Upload File</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFileManagerOpen(true)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        <Image className="w-3 h-3 text-cyan-400" />
                        <span>Media Library</span>
                      </button>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Direct Image URL */}
                    <input
                      type="url"
                      value={editingUser.avatar || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, avatar: e.target.value })}
                      placeholder="Or paste direct image URL (https://...)"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-[11px] font-mono text-slate-300 placeholder-slate-600 focus:outline-hidden focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Preset Avatars */}
                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 font-mono block mb-1">Preset Developer Avatars:</span>
                  <div className="flex items-center gap-1.5">
                    {PRESET_AVATARS.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setEditingUser({ ...editingUser, avatar: preset.url })}
                        className={`p-0.5 rounded-full border transition-all cursor-pointer ${
                          editingUser.avatar === preset.url
                            ? 'border-cyan-400 scale-110 shadow-sm shadow-cyan-400/40'
                            : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                        }`}
                        title={preset.label}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingUser.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  placeholder="e.g. Alex Rivera"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  placeholder="collaborator@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Permission Role</label>
                  <select
                    value={editingUser.role || 'editor'}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as Role })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="author">Author</option>
                    <option value="analyst">Analyst</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Account Status</label>
                  <select
                    value={editingUser.status || 'active'}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingUser.twoFactorEnabled ?? false}
                    onChange={(e) => setEditingUser({ ...editingUser, twoFactorEnabled: e.target.checked })}
                    className="rounded border-white/20 bg-slate-900 text-cyan-500"
                  />
                  <span>Enforce Two-Factor Authentication (2FA)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Manager for selecting profile photo */}
      <AdminFileManagerModal
        isOpen={fileManagerOpen}
        onClose={() => setFileManagerOpen(false)}
        mode="single"
        onSelectSingle={(url) => {
          if (editingUser) {
            setEditingUser({ ...editingUser, avatar: url });
          }
          showToast('Profile photo selected from media library');
        }}
      />
    </div>
  );
};
