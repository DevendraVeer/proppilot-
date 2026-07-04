import React, { useState } from "react";
import {
  Flame,
  Thermometer,
  Snowflake,
  MessageSquare,
  Users,
  Settings as SettingsIcon,
  MapPin,
  IndianRupee,
  Clock,
  Phone,
  Send,
  Sparkles,
  Loader2,
} from "lucide-react";

const TOKENS = {
  ink: "#10192B",
  inkSoft: "#1B2740",
  canvas: "#EEF2F0",
  card: "#FFFFFF",
  slate: "#1C222E",
  muted: "#6B7280",
  hairline: "#E1E6E3",
  hot: "#D6473F",
  warm: "#DE9F3B",
  cold: "#3E6FA6",
  accent: "#17685A",
  accentSoft: "#E4EFEC",
};

// After you deploy the FastAPI backend (see backend/main.py) on Render,
// paste its live URL here. Locally it's usually http://localhost:8000/api/reply
const API_URL = "https://proppilot-backend.onrender.com/api/reply";
const AGENCY_NAME = "Sunrise Realty";

const LEADS = [
  {
    id: 1,
    name: "Rohan Mehta",
    phone: "+91 98XXX XX417",
    location: "Andheri West, Mumbai",
    type: "2BHK Apartment",
    budget: "₹85L – 95L",
    band: "hot",
    score: 92,
    lastMessage: "Kya ye property abhi available hai? Site visit chahiye is weekend.",
    time: "4m ago",
  },
  {
    id: 2,
    name: "Priya Nair",
    phone: "+91 90XXX XX028",
    location: "Powai, Mumbai",
    type: "Office Space",
    budget: "₹1.2 Cr",
    band: "hot",
    score: 87,
    lastMessage: "Interested. Please share the floor plan and parking details.",
    time: "12m ago",
  },
  {
    id: 3,
    name: "Arjun Sharma",
    phone: "+91 88XXX XX792",
    location: "Baner, Pune",
    type: "3BHK Apartment",
    budget: "₹1.4 Cr",
    band: "warm",
    score: 58,
    lastMessage: "Just browsing for now, will probably decide next month.",
    time: "1h ago",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    phone: "+91 97XXX XX331",
    location: "Kothrud, Pune",
    type: "1BHK Apartment",
    budget: "₹45L",
    band: "warm",
    score: 45,
    lastMessage: "Location thoda door hai, koi aur option hai kya?",
    time: "3h ago",
  },
  {
    id: 5,
    name: "Vikram Desai",
    phone: "+91 91XXX XX065",
    location: "Lonavala",
    type: "Villa",
    budget: "₹2.1 Cr",
    band: "cold",
    score: 21,
    lastMessage: "Not looking right now, maybe in 6 months.",
    time: "1d ago",
  },
];

const BAND_META = {
  hot: { label: "HOT", color: TOKENS.hot, icon: Flame },
  warm: { label: "WARM", color: TOKENS.warm, icon: Thermometer },
  cold: { label: "COLD", color: TOKENS.cold, icon: Snowflake },
};

const NAV_ITEMS = [
  { id: "leads", label: "Leads", icon: Users },
  { id: "conversations", label: "Conversations", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function HeatRail({ band }) {
  return (
    <div
      className="w-1 rounded-full self-stretch shrink-0"
      style={{ backgroundColor: BAND_META[band].color }}
    />
  );
}

function ScoreBadge({ band, score }) {
  const meta = BAND_META[band];
  const Icon = meta.icon;
  return (
    <div
      className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shrink-0"
      style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
    >
      <Icon size={12} strokeWidth={2.5} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {meta.label} {score}
      </span>
    </div>
  );
}

function LeadsView() {
  const sorted = [...LEADS].sort((a, b) => b.score - a.score);
  return (
    <div className="flex flex-col gap-3">
      {sorted.map((lead) => (
        <div
          key={lead.id}
          className="flex items-stretch gap-4 rounded-xl p-4 transition hover:shadow-sm"
          style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.hairline}` }}
        >
          <HeatRail band={lead.band} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <h3
                  className="text-base font-semibold truncate"
                  style={{ color: TOKENS.slate, fontFamily: "'Fraunces', serif" }}
                >
                  {lead.name}
                </h3>
                <ScoreBadge band={lead.band} score={lead.score} />
              </div>
              <div
                className="flex items-center gap-1 text-xs shrink-0"
                style={{ color: TOKENS.muted, fontFamily: "'IBM Plex Mono', monospace" }}
              >
                <Clock size={12} />
                {lead.time}
              </div>
            </div>

            <p className="text-sm mt-1.5 truncate" style={{ color: TOKENS.muted }}>
              {lead.lastMessage}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs" style={{ color: TOKENS.muted }}>
              <span className="flex items-center gap-1">
                <MapPin size={13} /> {lead.location}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee size={13} /> {lead.budget}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={13} /> {lead.phone}
              </span>
              <span
                className="ml-auto rounded-md px-2 py-1 font-medium"
                style={{ backgroundColor: TOKENS.accentSoft, color: TOKENS.accent }}
              >
                {lead.type}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const INITIAL_TRANSCRIPTS = {
  1: [
    { from: "lead", text: "Hi, I saw your listing for the 2BHK in Andheri West. Is it still available?", time: "10:02 AM" },
    { from: "ai", text: "Yes, it's available! Could you share your budget range and preferred move-in timeline?", time: "10:02 AM" },
    { from: "lead", text: "Budget is around 85-95L. Looking to move in within 2 months.", time: "10:04 AM" },
    { from: "ai", text: "Great, that fits well. Would you like to schedule a site visit this weekend?", time: "10:04 AM" },
    { from: "lead", text: "Kya ye property abhi available hai? Site visit chahiye is weekend.", time: "10:11 AM" },
  ],
  2: [{ from: "lead", text: LEADS[1].lastMessage, time: LEADS[1].time }],
  3: [{ from: "lead", text: LEADS[2].lastMessage, time: LEADS[2].time }],
  4: [{ from: "lead", text: LEADS[3].lastMessage, time: LEADS[3].time }],
  5: [{ from: "lead", text: LEADS[4].lastMessage, time: LEADS[4].time }],
};

function ConversationsView() {
  const [activeId, setActiveId] = useState(LEADS[0].id);
  const [transcripts, setTranscripts] = useState(INITIAL_TRANSCRIPTS);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const active = LEADS.find((l) => l.id === activeId);
  const messages = transcripts[activeId] || [];

  async function sendMessage() {
    const text = draft.trim();
    if (!text || loading) return;

    const priorMessages = transcripts[activeId] || [];
    const history = priorMessages.map((m) => ({
      role: m.from === "ai" ? "assistant" : "user",
      content: m.text,
    }));

    const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setTranscripts((prev) => ({
      ...prev,
      [activeId]: [...priorMessages, { from: "lead", text, time: stamp }],
    }));
    setDraft("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agency_name: AGENCY_NAME, customer_message: text, history }),
      });
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      const data = await res.json();
      setTranscripts((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] || []), { from: "ai", text: data.reply, time: stamp }],
      }));
    } catch (err) {
      setTranscripts((prev) => ({
        ...prev,
        [activeId]: [
          ...(prev[activeId] || []),
          {
            from: "ai",
            text: "⚠️ Couldn't reach the AI backend. Deploy backend/main.py and set API_URL at the top of this file.",
            time: stamp,
          },
        ],
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-4 h-full">
      <div
        className="w-64 shrink-0 rounded-xl overflow-hidden"
        style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.hairline}` }}
      >
        {LEADS.map((lead) => (
          <button
            key={lead.id}
            onClick={() => setActiveId(lead.id)}
            className="w-full text-left px-4 py-3 flex items-center gap-3 transition"
            style={{
              backgroundColor: activeId === lead.id ? TOKENS.accentSoft : "transparent",
              borderBottom: `1px solid ${TOKENS.hairline}`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: BAND_META[lead.band].color }}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: TOKENS.slate }}>
                {lead.name}
              </p>
              <p className="text-xs truncate" style={{ color: TOKENS.muted }}>
                {lead.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div
        className="flex-1 rounded-xl flex flex-col"
        style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.hairline}` }}
      >
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${TOKENS.hairline}` }}
        >
          <div>
            <h3 className="font-semibold" style={{ color: TOKENS.slate, fontFamily: "'Fraunces', serif" }}>
              {active.name}
            </h3>
            <p className="text-xs" style={{ color: TOKENS.muted }}>
              {active.phone} · {active.location}
            </p>
          </div>
          <ScoreBadge band={active.band} score={active.score} />
        </div>

        <div className="flex-1 px-5 py-4 flex flex-col gap-3 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "ai" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-md">
                {m.from === "ai" && (
                  <div
                    className="flex items-center gap-1 text-[10px] font-semibold mb-1 justify-end"
                    style={{ color: TOKENS.accent }}
                  >
                    <Sparkles size={10} /> AI REPLY
                  </div>
                )}
                <div
                  className="rounded-2xl px-4 py-2.5 text-sm"
                  style={{
                    backgroundColor: m.from === "ai" ? TOKENS.accent : TOKENS.canvas,
                    color: m.from === "ai" ? "#FFFFFF" : TOKENS.slate,
                  }}
                >
                  {m.text}
                </div>
                <p
                  className={`text-[10px] mt-1 ${m.from === "ai" ? "text-right" : "text-left"}`}
                  style={{ color: TOKENS.muted, fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-end">
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm"
                style={{ backgroundColor: TOKENS.accentSoft, color: TOKENS.accent }}
              >
                <Loader2 size={14} className="animate-spin" />
                AI is typing…
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-3 flex items-center gap-2" style={{ borderTop: `1px solid ${TOKENS.hairline}` }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type as the lead, e.g. 'Budget 60L, 2BHK chahiye'…"
            className="flex-1 rounded-full px-4 py-2 text-sm outline-none"
            style={{ backgroundColor: TOKENS.canvas, color: TOKENS.slate }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-full p-2.5 disabled:opacity-50"
            style={{ backgroundColor: TOKENS.accent, color: "#FFFFFF" }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-11 h-6 rounded-full relative transition shrink-0"
      style={{ backgroundColor: checked ? TOKENS.accent : TOKENS.hairline }}
    >
      <div
        className="w-4.5 h-4.5 rounded-full bg-white absolute top-1 transition-all"
        style={{ left: checked ? "22px" : "4px", width: 18, height: 18 }}
      />
    </button>
  );
}

function SettingsView() {
  const [language, setLanguage] = useState("both");
  const [digest, setDigest] = useState(true);
  const [autoReply, setAutoReply] = useState(true);

  const Field = ({ label, hint, children }) => (
    <div
      className="flex items-center justify-between gap-6 py-4"
      style={{ borderBottom: `1px solid ${TOKENS.hairline}` }}
    >
      <div>
        <p className="text-sm font-medium" style={{ color: TOKENS.slate }}>
          {label}
        </p>
        {hint && (
          <p className="text-xs mt-0.5" style={{ color: TOKENS.muted }}>
            {hint}
          </p>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div
      className="rounded-xl p-6 max-w-2xl"
      style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.hairline}` }}
    >
      <h3
        className="text-lg font-semibold mb-1"
        style={{ color: TOKENS.slate, fontFamily: "'Fraunces', serif" }}
      >
        Workspace settings
      </h3>
      <p className="text-sm mb-2" style={{ color: TOKENS.muted }}>
        Connect WhatsApp and control how the AI responds to your leads.
      </p>

      <Field label="WhatsApp Business number" hint="Leads message this number directly">
        <div
          className="rounded-lg px-3 py-2 text-sm"
          style={{ backgroundColor: TOKENS.canvas, color: TOKENS.slate, fontFamily: "'IBM Plex Mono', monospace" }}
        >
          +91 90000 00000
        </div>
      </Field>

      <Field label="AI auto-reply" hint="Respond to new enquiries instantly, before an agent sees them">
        <Toggle checked={autoReply} onChange={setAutoReply} />
      </Field>

      <Field label="Reply language" hint="AI matches this unless the lead writes in another language">
        <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${TOKENS.hairline}` }}>
          {["Hindi", "English", "both"].map((opt) => (
            <button
              key={opt}
              onClick={() => setLanguage(opt)}
              className="px-3 py-1.5 text-xs font-medium capitalize"
              style={{
                backgroundColor: language === opt ? TOKENS.accent : "transparent",
                color: language === opt ? "#FFFFFF" : TOKENS.muted,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Weekly WhatsApp digest" hint="Sent to the owner every Monday morning">
        <Toggle checked={digest} onChange={setDigest} />
      </Field>
    </div>
  );
}

export default function PropPilot() {
  const [tab, setTab] = useState("leads");

  const digestStats = [
    { label: "Leads captured", value: "127" },
    { label: "Response rate", value: "76%" },
    { label: "Hot leads this week", value: "18" },
  ];

  return (
    <div
      className="w-full min-h-[640px] flex"
      style={{ backgroundColor: TOKENS.canvas, fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
      `}</style>

      {/* Sidebar */}
      <aside
        className="w-56 shrink-0 flex flex-col py-6 px-4"
        style={{ backgroundColor: TOKENS.ink }}
      >
        <div className="px-2 mb-8">
          <h1
            className="text-xl font-semibold tracking-tight"
            style={{ color: "#FFFFFF", fontFamily: "'Fraunces', serif" }}
          >
            PropPilot
          </h1>
          <p className="text-[11px] mt-0.5" style={{ color: "#8993A8" }}>
            Lead intelligence
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
                style={{
                  backgroundColor: isActive ? TOKENS.inkSoft : "transparent",
                  color: isActive ? "#FFFFFF" : "#8993A8",
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto px-2 pt-6" style={{ borderTop: `1px solid ${TOKENS.inkSoft}` }}>
          <p className="text-[11px] leading-relaxed" style={{ color: "#5C6780" }}>
            Connected to WhatsApp Business
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#3FAE7A" }} />
            <span className="text-xs" style={{ color: "#8993A8" }}>
              Live
            </span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2
              className="text-2xl font-semibold capitalize"
              style={{ color: TOKENS.slate, fontFamily: "'Fraunces', serif" }}
            >
              {tab}
            </h2>
            <p className="text-sm" style={{ color: TOKENS.muted }}>
              Friday, July 3 · Sunrise Realty
            </p>
          </div>

          {tab === "leads" && (
            <div
              className="flex items-center gap-5 rounded-xl px-5 py-3"
              style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.hairline}` }}
            >
              {digestStats.map((s, i) => (
                <div key={i} className="text-center">
                  <p
                    className="text-lg font-semibold"
                    style={{ color: TOKENS.accent, fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide" style={{ color: TOKENS.muted }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {tab === "leads" && <LeadsView />}
        {tab === "conversations" && <ConversationsView />}
        {tab === "settings" && <SettingsView />}
      </main>
    </div>
  );
}
