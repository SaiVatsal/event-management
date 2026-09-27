import { create } from 'zustand';

export const useStore = create((set, get) => ({
  events: [
    {
      id: 'evt-1',
      title: 'Neon Bloom Gala 2026',
      tagline: 'An Experiential Fusion of Interactive Art, Synthesizers & Soundscapes',
      date: '2026-10-18',
      time: '18:00 - 02:00 EDT',
      venue: 'Metropolitan Botanical Glasshouse // Pavilion 4',
      bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      tiers: [
        { id: 't-ga', name: 'General Admission', price: 65, available: 450, sold: 380, perks: 'Access to main conservatory, ambient garden & open mocktail bar.' },
        { id: 't-vip', name: 'VIP Luminary Pass', price: 140, available: 120, sold: 112, perks: 'Priority entry, private mezcal tasting lounge & holographic commemorative badge.' },
        { id: 't-backstage', name: 'Artist Circle Patron', price: 280, available: 40, sold: 36, perks: 'Backstage soundcheck access, meet & greet, bespoke merchandise crate.' }
      ],
      schedule: [
        { time: '18:00', title: 'Doors & Ambient Kinetic Light Show', speaker: 'Studio Lumens' },
        { time: '19:30', title: 'Immersive Symphony in A Minor', speaker: 'The Botanical Ensemble' },
        { time: '21:30', title: 'Keynote: Biomimicry in Electronic Architecture', speaker: 'Dr. Elena Rostova' },
        { time: '23:00', title: 'Midnight Synthwave Afterparty', speaker: 'DJ Cyberflora' }
      ],
      attendees: [
        { id: 'att-1', name: 'Sophie Laurent', email: 'sophie@lumens.art', tier: 'VIP Luminary Pass', checkedIn: true, checkinTime: '18:14 EDT', qrHash: '0x88f2...99a1' },
        { id: 'att-2', name: 'Alexander Vance', email: 'alex@civitas.org', tier: 'Artist Circle Patron', checkedIn: true, checkinTime: '18:22 EDT', qrHash: '0x43d1...88b2' },
        { id: 'att-3', name: 'Chloe Dubois', email: 'chloe@metromedia.com', tier: 'General Admission', checkedIn: false, checkinTime: null, qrHash: '0x77c2...11f4' }
      ],
      analytics: {
        totalRevenue: 50440,
        targetRevenue: 60000,
        totalSold: 528,
        capacity: 610,
        satisfactionScore: '98.4%',
        checkinRate: '87.2%'
      }
    }
  ],

  selectedEventId: 'evt-1',

  // Actions
  selectEvent: (id) => set({ selectedEventId: id }),

  registerTicket: (eventId, tierId, attendeeInfo) => set((state) => {
    const event = state.events.find((e) => e.id === eventId);
    if (!event) return {};

    const tier = event.tiers.find((t) => t.id === tierId);
    if (!tier || tier.sold >= tier.available) return {};

    const newAttendee = {
      id: `att-${Date.now()}`,
      name: attendeeInfo.name || 'Guest Elector',
      email: attendeeInfo.email || 'guest@event.com',
      tier: tier.name,
      checkedIn: false,
      checkinTime: null,
      qrHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    };

    const updatedTiers = event.tiers.map((t) => t.id === tierId ? { ...t, sold: t.sold + 1 } : t);
    const updatedRevenue = event.analytics.totalRevenue + tier.price;
    const updatedSold = event.analytics.totalSold + 1;

    return {
      events: state.events.map((e) =>
        e.id === eventId
          ? {
              ...e,
              tiers: updatedTiers,
              attendees: [newAttendee, ...e.attendees],
              analytics: { ...e.analytics, totalRevenue: updatedRevenue, totalSold: updatedSold }
            }
          : e
      )
    };
  }),

  toggleCheckIn: (eventId, attendeeId) => set((state) => {
    return {
      events: state.events.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          attendees: e.attendees.map((att) =>
            att.id === attendeeId
              ? {
                  ...att,
                  checkedIn: !att.checkedIn,
                  checkinTime: !att.checkedIn ? new Date().toLocaleTimeString() : null
                }
              : att
          )
        };
      })
    };
  }),

  createEvent: (newEventData) => set((state) => {
    const newEvent = {
      id: `evt-${Date.now()}`,
      title: newEventData.title || 'New Summer Gala',
      tagline: newEventData.tagline || 'Celebratory Evening of Innovation & Music',
      date: newEventData.date || '2026-11-20',
      time: '19:00 - 23:00',
      venue: newEventData.venue || 'Civic Crystal Ballroom',
      bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      tiers: [
        { id: 't-1', name: 'General Admission', price: 50, available: 200, sold: 0, perks: 'Standard access and refreshments.' },
        { id: 't-2', name: 'VIP Pass', price: 120, available: 50, sold: 0, perks: 'VIP lounge access & swag bag.' }
      ],
      schedule: [
        { time: '19:00', title: 'Opening Reception', speaker: 'Event Host' },
        { time: '20:30', title: 'Main Stage Performance', speaker: 'Guest Artist' }
      ],
      attendees: [],
      analytics: {
        totalRevenue: 0,
        targetRevenue: 16000,
        totalSold: 0,
        capacity: 250,
        satisfactionScore: '100%',
        checkinRate: '0%'
      }
    };

    return {
      events: [newEvent, ...state.events],
      selectedEventId: newEvent.id
    };
  })
}));
