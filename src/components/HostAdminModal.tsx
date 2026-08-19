import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Download,
  Users,
  Utensils,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  ShieldCheck,
  RefreshCw,
  PhoneCall,
  Calendar,
  FileSpreadsheet,
} from 'lucide-react';
import { RSVPRecord } from '../types';

interface HostAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PIN = '2026';

export const HostAdminModal: React.FC<HostAdminModalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'attending' | 'declined' | 'veg' | 'nonveg'>('all');
  const [copied, setCopied] = useState(false);
  const [showAddManual, setShowAddManual] = useState(false);

  // Manual RSVP form state
  const [mName, setMName] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mStatus, setMStatus] = useState<'attending' | 'declined'>('attending');
  const [mGuests, setMGuests] = useState('1');
  const [mDiet, setMDiet] = useState('veg');
  const [mNote, setMNote] = useState('');

  // Load RSVPs from localStorage
  const loadRSVPs = () => {
    try {
      const stored = localStorage.getItem('wedding_rsvps');
      if (stored) {
        setRsvps(JSON.parse(stored));
      } else {
        setRsvps([]);
      }
    } catch {
      setRsvps([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadRSVPs();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setPin('');
      setPinError(false);
      setShowAddManual(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin = localStorage.getItem('wedding_admin_pin') || DEFAULT_PIN;
    if (pin.trim() === savedPin) {
      setIsAuthenticated(true);
      setPinError(false);
      loadRSVPs();
    } else {
      setPinError(true);
    }
  };

  // Calculations
  const attendingList = rsvps.filter((r) => r.status === 'attending');
  const declinedList = rsvps.filter((r) => r.status === 'declined');

  const totalHeadcount = attendingList.reduce((acc, curr) => {
    const num = parseInt(curr.guestsCount, 10) || 1;
    return acc + num;
  }, 0);

  const vegCount = attendingList.filter((r) => r.diet === 'veg').reduce((acc, curr) => {
    return acc + (parseInt(curr.guestsCount, 10) || 1);
  }, 0);

  const nonVegCount = attendingList.filter((r) => r.diet === 'nonveg').reduce((acc, curr) => {
    return acc + (parseInt(curr.guestsCount, 10) || 1);
  }, 0);

  // Filtered list
  const filteredRSVPs = rsvps.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.note && r.note.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === 'attending') return r.status === 'attending';
    if (filterStatus === 'declined') return r.status === 'declined';
    if (filterStatus === 'veg') return r.status === 'attending' && r.diet === 'veg';
    if (filterStatus === 'nonveg') return r.status === 'attending' && r.diet === 'nonveg';
    return true;
  });

  // Delete RSVP
  const handleDeleteRSVP = (id: string) => {
    if (window.confirm('Remove this RSVP entry?')) {
      const updated = rsvps.filter((r) => r.id !== id);
      setRsvps(updated);
      localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (rsvps.length === 0) {
      alert('No RSVP data available to export.');
      return;
    }

    const headers = ['Name', 'Phone', 'Status', 'Total Guests', 'Meal Preference', 'Special Note', 'Timestamp'];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      r.status.toUpperCase(),
      r.status === 'attending' ? (parseInt(r.guestsCount, 10) || 1) : 0,
      r.status === 'attending' ? (r.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian') : 'N/A',
      `"${(r.note || '').replace(/"/g, '""')}"`,
      `"${new Date(r.timestamp).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ajith_Keerthana_Wedding_RSVP_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    const summaryText = `*Ajith & Keerthana Wedding - RSVP Summary*
📅 Date: August 23, 2026
📍 Venue: North View Auditorium, Pantheerpadam
---------------------------------
👥 Total Responses: ${rsvps.length}
✅ Total Attending Guests: ${totalHeadcount} (${attendingList.length} parties)
❌ Declined: ${declinedList.length}
🥦 Veg Meals: ${vegCount}
🍗 Non-Veg Meals: ${nonVegCount}
---------------------------------
Generated on: ${new Date().toLocaleString()}`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Handle Add Manual RSVP
  const handleAddManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName.trim()) return;

    const newRecord: RSVPRecord = {
      id: `rsvp-manual-${Date.now()}`,
      name: mName.trim(),
      phone: mPhone.trim() || 'Offline/Direct',
      status: mStatus,
      guestsCount: mGuests,
      diet: mDiet,
      note: mNote.trim() || 'Added via Host Dashboard',
      timestamp: new Date().toISOString(),
    };

    const updated = [newRecord, ...rsvps];
    setRsvps(updated);
    localStorage.setItem('wedding_rsvps', JSON.stringify(updated));

    // Reset
    setMName('');
    setMPhone('');
    setMNote('');
    setShowAddManual(false);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-[#0a0a0a] border border-[#7a0016]/50 rounded-sm shadow-[0_0_90px_rgba(122,0,22,0.4)] max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#7a0016]/30 border border-[#7a0016]">
              <ShieldCheck className="w-5 h-5 text-[#e2c092]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-2xl text-white font-medium">
                Host Portal &amp; RSVP Manager
              </h3>
              <p className="font-sans text-[11px] text-[#a3a3a3]">
                Ajith &amp; Keerthana's Wedding • North View Auditorium
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#a3a3a3] hover:text-white transition-colors p-2 cursor-pointer"
            title="Close Dashboard"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[#7a0016]/20 border border-[#7a0016] flex items-center justify-center text-[#e2c092] mb-6 shadow-[0_0_30px_rgba(122,0,22,0.4)]">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-2xl text-white mb-2">Host Access Protected</h4>
            <p className="font-sans text-xs text-[#a3a3a3] max-w-sm mb-6 leading-relaxed">
              Please enter your 4-digit host PIN to view guest responses, meal headcounts, and export spreadsheets.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter PIN (Default: 2026)"
                  className="w-full bg-black/80 border border-white/20 text-center tracking-[0.4em] text-lg font-mono px-4 py-3 text-white focus:outline-none focus:border-[#e2c092] rounded"
                  autoFocus
                />
                {pinError && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">Incorrect PIN. (Default is 2026)</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#7a0016] hover:bg-red-800 text-white font-sans text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg rounded"
              >
                Unlock Dashboard
              </button>
              <p className="text-[10px] text-white/40 tracking-wider">Default Host PIN is 2026</p>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-black/50 border border-white/10 p-4 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#a3a3a3] block font-sans">
                  Total RSVPs
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-white font-semibold mt-1 block">
                  {rsvps.length}
                </span>
                <span className="text-[10px] text-[#a3a3a3] mt-1 block">Submissions received</span>
              </div>

              <div className="bg-black/50 border border-emerald-900/40 p-4 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 block font-sans">
                  Attending Headcount
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-emerald-300 font-semibold mt-1 block">
                  {totalHeadcount}
                </span>
                <span className="text-[10px] text-emerald-400/70 mt-1 block">
                  Across {attendingList.length} parties
                </span>
              </div>

              <div className="bg-black/50 border border-amber-900/40 p-4 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#e2c092] block font-sans">
                  Veg Meals
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-[#e2c092] font-semibold mt-1 block">
                  {vegCount}
                </span>
                <span className="text-[10px] text-[#e2c092]/70 mt-1 block">Traditional Sadhya</span>
              </div>

              <div className="bg-black/50 border border-rose-900/40 p-4 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-rose-400 block font-sans">
                  Non-Veg Meals
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-rose-300 font-semibold mt-1 block">
                  {nonVegCount}
                </span>
                <span className="text-[10px] text-rose-400/70 mt-1 block">Non-Veg guests</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 p-3 sm:p-4 rounded border border-white/10">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#7a0016] text-white text-xs uppercase tracking-wider font-medium hover:bg-red-800 transition-all cursor-pointer shadow"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Download Excel / CSV
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/10 text-white text-xs uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Summary Copied!' : 'Copy Summary'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddManual(!showAddManual)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#e2c092]/50 text-[#e2c092] text-xs uppercase tracking-wider hover:bg-[#e2c092] hover:text-black transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {showAddManual ? 'Cancel' : 'Add Guest Manually'}
                </button>
              </div>

              <button
                type="button"
                onClick={loadRSVPs}
                className="inline-flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-white cursor-pointer px-2 py-1"
                title="Refresh list"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {/* Manual RSVP Drawer Form */}
            {showAddManual && (
              <form onSubmit={handleAddManualSubmit} className="bg-black/70 border border-[#e2c092]/40 p-4 sm:p-6 rounded-sm space-y-4">
                <h5 className="font-serif text-lg text-white font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#e2c092]" /> Add Offline / Direct Guest RSVP
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#a3a3a3] mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={mName}
                      onChange={(e) => setMName(e.target.value)}
                      placeholder="Guest Name"
                      className="w-full bg-black/60 border border-white/20 px-3 py-1.5 text-xs text-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#a3a3a3] mb-1">Phone</label>
                    <input
                      type="tel"
                      value={mPhone}
                      onChange={(e) => setMPhone(e.target.value)}
                      placeholder="Mobile Number"
                      className="w-full bg-black/60 border border-white/20 px-3 py-1.5 text-xs text-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#a3a3a3] mb-1">Attendance</label>
                    <select
                      value={mStatus}
                      onChange={(e) => setMStatus(e.target.value as 'attending' | 'declined')}
                      className="w-full bg-black/60 border border-white/20 px-3 py-1.5 text-xs text-white rounded"
                    >
                      <option value="attending">Joyfully Attending</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                  {mStatus === 'attending' && (
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#a3a3a3] mb-1">Headcount &amp; Diet</label>
                      <div className="grid grid-cols-2 gap-1">
                        <select
                          value={mGuests}
                          onChange={(e) => setMGuests(e.target.value)}
                          className="bg-black/60 border border-white/20 px-2 py-1.5 text-xs text-white rounded"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4">4+ Persons</option>
                        </select>
                        <select
                          value={mDiet}
                          onChange={(e) => setMDiet(e.target.value)}
                          className="bg-black/60 border border-white/20 px-2 py-1.5 text-xs text-white rounded"
                        >
                          <option value="veg">Veg</option>
                          <option value="nonveg">Non-Veg</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#a3a3a3] mb-1">Note (Optional)</label>
                  <input
                    type="text"
                    value={mNote}
                    onChange={(e) => setMNote(e.target.value)}
                    placeholder="e.g. Will arrive by 10:30 AM"
                    className="w-full bg-black/60 border border-white/20 px-3 py-1.5 text-xs text-white rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7a0016] text-white text-xs uppercase tracking-wider rounded cursor-pointer hover:bg-red-800"
                >
                  Save Entry
                </button>
              </form>
            )}

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="w-full bg-black/60 border border-white/15 pl-9 pr-3 py-2 text-xs text-white rounded focus:outline-none focus:border-[#e2c092]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
                {(
                  [
                    { id: 'all', label: `All (${rsvps.length})` },
                    { id: 'attending', label: `Attending (${attendingList.length})` },
                    { id: 'declined', label: `Declined (${declinedList.length})` },
                    { id: 'veg', label: `Veg (${vegCount})` },
                    { id: 'nonveg', label: `Non-Veg (${nonVegCount})` },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilterStatus(tab.id)}
                    className={`px-3 py-1.5 text-[11px] rounded uppercase tracking-wider font-sans transition-all cursor-pointer whitespace-nowrap ${
                      filterStatus === tab.id
                        ? 'bg-[#7a0016] text-white font-semibold'
                        : 'bg-white/5 text-[#a3a3a3] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RSVPs Table / Cards */}
            {filteredRSVPs.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/10 rounded">
                <Users className="w-8 h-8 text-white/30 mx-auto mb-2" />
                <p className="font-serif text-lg text-white/80">No RSVP entries match your filter</p>
                <p className="text-xs text-[#a3a3a3] mt-1">
                  Responses submitted by guests on the website will instantly appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-white/10 rounded">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-black/80 text-[#a3a3a3] uppercase tracking-wider text-[10px] border-b border-white/10">
                    <tr>
                      <th className="p-3">Guest Name</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Headcount</th>
                      <th className="p-3">Meal</th>
                      <th className="p-3">Notes</th>
                      <th className="p-3">Submitted</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-black/40">
                    {filteredRSVPs.map((record) => (
                      <tr key={record.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-3 font-medium text-white">
                          {record.name}
                        </td>
                        <td className="p-3 text-[#a3a3a3]">
                          {record.phone ? (
                            <a
                              href={`tel:${record.phone}`}
                              className="text-[#e2c092] hover:underline flex items-center gap-1"
                            >
                              <PhoneCall className="w-3 h-3" />
                              {record.phone}
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="p-3">
                          {record.status === 'attending' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                              <CheckCircle2 className="w-3 h-3" /> Attending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide bg-rose-950/80 text-rose-400 border border-rose-800/40">
                              <XCircle className="w-3 h-3" /> Declined
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-white">
                          {record.status === 'attending' ? (
                            <span className="font-semibold text-[#e2c092]">
                              {record.guestsCount} {parseInt(record.guestsCount, 10) > 1 ? 'Guests' : 'Guest'}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="p-3">
                          {record.status === 'attending' ? (
                            record.diet === 'veg' ? (
                              <span className="text-emerald-400">Vegetarian</span>
                            ) : (
                              <span className="text-rose-300">Non-Veg</span>
                            )
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="p-3 text-[#a3a3a3] max-w-[200px] truncate" title={record.note}>
                          {record.note || '—'}
                        </td>
                        <td className="p-3 text-white/50 text-[10px] whitespace-nowrap">
                          {new Date(record.timestamp).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteRSVP(record.id)}
                            className="text-white/40 hover:text-red-400 p-1 transition-colors cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostAdminModal;
