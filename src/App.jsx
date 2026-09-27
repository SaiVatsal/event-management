import React, { useState } from 'react';
import {
  PartyPopper,
  Sparkles,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Users,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Send,
  Music,
  Eye,
  Star
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    events,
    selectedEventId,
    selectEvent,
    registerTicket,
    toggleCheckIn,
    createEvent
  } = useStore();

  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'schedule' | 'scanner' | 'attendees' | 'analytics'
  const [selectedTier, setSelectedTier] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // New Event State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('');

  const currentEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail || !selectedTier) return;
    registerTicket(currentEvent.id, selectedTier.id, {
      name: attendeeName,
      email: attendeeEmail
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowCheckoutModal(false);
      setAttendeeName('');
      setAttendeeEmail('');
    }, 1500);
  };

  const handleCreateNewEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;
    createEvent({ title: newEventTitle, venue: newEventVenue });
    setShowCreateModal(false);
    setNewEventTitle('');
    setNewEventVenue('');
  };

  return (
    <div className="min-h-screen bg-[#faf5ff] text-slate-800 flex flex-col font-sans">
      {/* Celebratory Pastel Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-pink-100 shadow-sm px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ec4899] to-[#818cf8] flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <PartyPopper className="w-5 h-5" />
          </div>
          <div>
            <span className="font-script text-2xl text-pink-600 block leading-none">
              Celebratio
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 font-bold">
              Experiential Event Engine & Live Ticketing
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-pink-50/80 p-1 rounded-2xl border border-pink-100 text-xs font-bold text-slate-600">
          {[
            { id: 'tickets', label: 'Tickets & Tiers', icon: Ticket },
            { id: 'schedule', label: 'Stage Schedule', icon: Calendar },
            { id: 'scanner', label: 'Check-In Scanner', icon: QrCode },
            { id: 'attendees', label: 'Attendees', icon: Users },
            { id: 'analytics', label: 'Event Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#ec4899] to-[#818cf8] text-white shadow-sm'
                    : 'hover:text-pink-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Create Event Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#ec4899] to-[#818cf8] text-white rounded-xl text-xs font-bold transition shadow-md shadow-pink-500/20 flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" /> Host Event
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* Festive Event Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-pink-100 bg-white">
          <div className="h-64 sm:h-80 w-full relative">
            <img
              src={currentEvent.bannerImage}
              alt={currentEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-3 py-1 bg-pink-500/80 backdrop-blur rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                ★ FEATURED CELEBRATION
              </span>
              <h1 className="font-script text-4xl sm:text-5xl text-white tracking-wide">
                {currentEvent.title}
              </h1>
              <p className="text-sm text-pink-100 max-w-2xl">{currentEvent.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-pink-200 pt-1">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-pink-400" /> {currentEvent.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-pink-400" /> {currentEvent.time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-pink-400" /> {currentEvent.venue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW 1: TICKETS & TIERS */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto space-y-1">
              <h2 className="font-script text-3xl text-pink-600">Choose Your Experience</h2>
              <p className="text-xs text-slate-500 font-mono">Select a tiered ticket category for secure instant confirmation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentEvent.tiers.map((tier) => {
                const isSoldOut = tier.sold >= tier.available;
                return (
                  <div
                    key={tier.id}
                    className="bg-white border-2 border-pink-100 hover:border-pink-300 rounded-3xl p-6 shadow-xl space-y-5 transition flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-800">{tier.name}</h3>
                        <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-bold">
                          {tier.available - tier.sold} left
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-pink-600 font-mono">${tier.price}</span>
                        <span className="text-xs text-slate-400">/ person</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{tier.perks}</p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTier(tier);
                        setShowCheckoutModal(true);
                      }}
                      disabled={isSoldOut}
                      className="w-full py-3 bg-gradient-to-r from-[#ec4899] to-[#818cf8] hover:opacity-90 disabled:opacity-40 text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-pink-500/20"
                    >
                      {isSoldOut ? 'Sold Out' : 'Reserve Ticket'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: STAGE SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-xl space-y-6">
            <div className="border-b border-pink-50 pb-4">
              <h2 className="font-script text-3xl text-pink-600">Event Program & Agenda</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Continuous schedule across main pavilion and soundstage</p>
            </div>

            <div className="space-y-4">
              {currentEvent.schedule.map((item, idx) => (
                <div key={idx} className="p-5 bg-pink-50/50 rounded-2xl border border-pink-100 flex items-start gap-4">
                  <div className="px-3 py-1.5 rounded-xl bg-pink-600 text-white font-mono text-xs font-bold">
                    {item.time}
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                    <p className="text-xs text-indigo-600 font-medium">Presenter: {item.speaker}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: LIVE CHECK-IN SCANNER */}
        {activeTab === 'scanner' && (
          <div className="max-w-xl mx-auto bg-white border border-pink-100 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-pink-100 text-pink-600 mx-auto flex items-center justify-center">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-script text-3xl text-pink-600">E-Ticket QR Check-In Scanner</h2>
              <p className="text-xs text-slate-500 font-mono mt-1">Simulated camera optical scanner checking cryptographically hashed tickets</p>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl border-4 border-dashed border-pink-400 text-pink-300 font-mono text-xs space-y-3">
              <div className="w-32 h-32 mx-auto bg-white rounded-2xl p-2 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>
              <p className="animate-pulse">Optical Laser Active // Align Attendee Pass</p>
            </div>

            <div className="pt-2 text-xs font-mono text-slate-500">
              Scanned count: <b className="text-pink-600">{currentEvent.attendees.filter((a) => a.checkedIn).length}</b> / {currentEvent.attendees.length} Verified
            </div>
          </div>
        )}

        {/* VIEW 4: ATTENDEE REGISTRY */}
        {activeTab === 'attendees' && (
          <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-3">
              <h2 className="font-script text-3xl text-pink-600">Confirmed Attendees ({currentEvent.attendees.length})</h2>
              <span className="text-xs font-mono text-slate-400">Automated Reminder Dispatch Ready</span>
            </div>

            <div className="space-y-3">
              {currentEvent.attendees.map((att) => (
                <div key={att.id} className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{att.name}</h4>
                    <p className="text-xs font-mono text-slate-500">{att.email} • Tier: <b className="text-indigo-600">{att.tier}</b></p>
                    <span className="text-[10px] font-mono text-slate-400">Hash: {att.qrHash}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCheckIn(currentEvent.id, att.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition ${
                        att.checkedIn
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          : 'bg-pink-600 text-white shadow-sm'
                      }`}
                    >
                      {att.checkedIn ? `✓ Checked In (${att.checkinTime})` : 'Mark Checked In'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: EVENT ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-white border border-pink-100 rounded-3xl p-8 shadow-xl space-y-6">
            <div>
              <h2 className="font-script text-3xl text-pink-600">Ticketing Revenue & Turnout</h2>
              <p className="text-xs text-slate-500 font-mono">Performance metrics for {currentEvent.title}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-pink-50/60 rounded-2xl border border-pink-100">
                <span className="text-[10px] font-mono uppercase text-slate-500">Gross Ticket Sales</span>
                <div className="text-2xl font-black text-pink-600 font-mono mt-1">
                  ${currentEvent.analytics.totalRevenue.toLocaleString()}
                </div>
              </div>
              <div className="p-5 bg-pink-50/60 rounded-2xl border border-pink-100">
                <span className="text-[10px] font-mono uppercase text-slate-500">Passes Issued</span>
                <div className="text-2xl font-black text-indigo-600 font-mono mt-1">
                  {currentEvent.analytics.totalSold} / {currentEvent.analytics.capacity}
                </div>
              </div>
              <div className="p-5 bg-pink-50/60 rounded-2xl border border-pink-100">
                <span className="text-[10px] font-mono uppercase text-slate-500">Guest Rating</span>
                <div className="text-2xl font-black text-amber-500 font-mono mt-1 flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" /> {currentEvent.analytics.satisfactionScore}
                </div>
              </div>
              <div className="p-5 bg-pink-50/60 rounded-2xl border border-pink-100">
                <span className="text-[10px] font-mono uppercase text-slate-500">Check-In Velocity</span>
                <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
                  {currentEvent.analytics.checkinRate}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: TICKET CHECKOUT */}
      {showCheckoutModal && selectedTier && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-pink-100 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Complete Reservation</h3>
                <span className="text-xs text-pink-600 font-mono font-bold">{selectedTier.name} — ${selectedTier.price}</span>
              </div>
              <button onClick={() => setShowCheckoutModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-base text-slate-800">Reservation Confirmed!</h4>
                <p className="text-xs text-slate-500 font-mono">Digital pass and QR token dispatched to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-500 block mb-1">Attendee Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Montgomery"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-500 block mb-1">Email Address (for QR Pass)</label>
                  <input
                    type="email"
                    required
                    placeholder="julian@example.com"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#ec4899] to-[#818cf8] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-pink-500/20 transition"
                >
                  Pay & Issue Pass (${selectedTier.price})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: CREATE EVENT */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-pink-100 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-3">
              <h3 className="font-script text-2xl text-pink-600">Host New Event</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateNewEvent} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-500 block mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Celestial Rooftop Symphony"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-500 block mb-1">Venue Location</label>
                <input
                  type="text"
                  placeholder="e.g. Metropolitan Observatory Pavilion"
                  value={newEventVenue}
                  onChange={(e) => setNewEventVenue(e.target.value)}
                  className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-[#ec4899] to-[#818cf8] text-white rounded-xl text-xs font-bold font-mono shadow-md"
                >
                  Launch Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-pink-100 bg-white py-6 text-center text-xs text-slate-400 font-mono">
        © 2026 CELEBRATIO EXPERIENTIAL EVENT ENGINE. TIERED STRIPE TEST GATEWAY & QR PASS PROTOCOL.
      </footer>
    </div>
  );
}
