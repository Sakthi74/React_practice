import { useState } from "react";

// ─── QUANTIC DESIGN TOKENS (extracted from screenshot) ──────
const C = {
  // Backgrounds
  bgDeep: "#0d1117",       // deepest bg (sidebar)
  bgMain: "#161b22",       // main content area
  bgCard: "#1c2128",       // card/row surfaces
  bgHover: "#21262d",      // hover state
  bgInput: "#0d1117",      // input fields
  bgSidebar: "#0d1117",    // sidebar bg
  bgSideHover: "#1c2128",  // sidebar hover

  // Accent
  accentBlue: "#2f81f7",   // primary blue (active sidebar, links)
  accentBlueBg: "#1a3a5c", // blue bg for active sidebar item
  accentGreen: "#2ea043",  // green for "New" badges
  accentGreenBg: "#1a3524",
  accentYellow: "#d29922",  // yellow/amber for "In Progress"
  accentYellowBg: "#3d2e00",
  accentOrange: "#db6d28",  // orange for "Waiting On Client"
  accentOrangeBg: "#3d2200",
  accentRed: "#f85149",     // red priority dots
  accentPurple: "#a371f7",

  // Text
  textPrimary: "#e6edf3",   // main text
  textSecondary: "#8b949e",  // muted text
  textTertiary: "#484f58",   // very muted
  textLink: "#58a6ff",       // links
  textWhite: "#ffffff",

  // Borders
  border: "#30363d",
  borderLight: "#21262d",
  borderFocus: "#2f81f7",

  // Status
  statusNew: "#2ea043",
  statusProgress: "#d29922",
  statusWaiting: "#db6d28",
  statusDraft: "#484f58",
  statusPublished: "#2ea043",
  statusReview: "#d29922",
};

const T = {
  font: `'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`,
  fontMono: `'SF Mono', 'Cascadia Code', 'Consolas', monospace`,
  size: { xs: 10, sm: 11, md: 13, base: 14, lg: 16, xl: 20, xxl: 24 },
  weight: { normal: 400, medium: 500, semi: 600, bold: 700 },
  radius: { sm: 4, md: 6, lg: 8, xl: 12, pill: 9999 },
};

// ─── DATA ────────────────────────────────────
const ARTICLES = [
  { id: "D10045", title: "Customer onboarding guide v4.1", collection: "Onboarding", pages: 28, author: "Sarah K.", status: "published", updated: "3 hrs ago", views: 3842, type: "PDF" },
  { id: "D10042", title: "Refund and cancellation policy", collection: "Policies", pages: 6, author: "Policy Team", status: "published", updated: "5 hrs ago", views: 2105, type: "PDF" },
  { id: "D10041", title: "API rate limits and quotas", collection: "API Reference", pages: 45, author: "Engineering", status: "review", updated: "5 hrs ago", views: 5230, type: "PDF" },
  { id: "D10038", title: "Service level agreement — standard", collection: "Legal", pages: 12, author: "Legal Dept.", status: "published", updated: "5 hrs ago", views: 1680, type: "DOCX" },
  { id: "D10035", title: "SSO configuration guide", collection: "Troubleshooting", pages: 15, author: "DevOps", status: "draft", updated: "6 hrs ago", views: 0, type: "PDF" },
  { id: "D10030", title: "Understanding your invoice", collection: "Billing", pages: 8, author: "Finance", status: "published", updated: "7 hrs ago", views: 1890, type: "PDF" },
  { id: "D10028", title: "Upgrading and downgrading plans", collection: "Billing", pages: 10, author: "Product", status: "review", updated: "7 hrs ago", views: 1340, type: "DOCX" },
  { id: "D10022", title: "Webhook events reference", collection: "API Reference", pages: 32, author: "Engineering", status: "published", updated: "8 hrs ago", views: 4510, type: "PDF" },
  { id: "D10018", title: "Escalation workflow — tier 1 to tier 3", collection: "Policies", pages: 8, author: "Support Ops", status: "published", updated: "8 hrs ago", views: 920, type: "DOCX" },
  { id: "D10015", title: "Pricing matrix — 2026 tiers", collection: "Billing", pages: 3, author: "Revenue Ops", status: "published", updated: "1 day ago", views: 2210, type: "XLSX" },
];

const FAQS = [
  { id: 1, q: "How do I request a refund?", a: "Refund requests can be submitted within 30 days of purchase through the billing portal under Account → Billing → Request refund. Refunds are typically processed within 5–7 business days. For annual plans, a prorated refund is calculated based on remaining months.", cat: "Billing" },
  { id: 2, q: "What are the API rate limits for each plan?", a: "Free tier: 100 req/min. Pro: 1,000 req/min. Enterprise: 10,000 req/min with burst allowance up to 15,000. Rate limits apply per API key.", cat: "Technical" },
  { id: 3, q: "How do I reset a customer's password?", a: "Navigate to the customer's account page → Security → Reset password. The customer receives an email with a secure reset link valid for 24 hours. For enterprise SSO accounts, resets go through their identity provider.", cat: "Account" },
  { id: 4, q: "What's the SLA uptime guarantee?", a: "Standard: 99.9%. Enterprise: 99.99% with financial credits. Maintenance windows (Sundays 2–4 AM UTC) excluded from SLA calculations.", cat: "Product" },
  { id: 5, q: "How do I upgrade a customer's plan?", a: "Account billing tab → Change plan → choose tier. Upgrades are prorated and immediate. Downgrades take effect next billing cycle. Enterprise changes require account manager approval.", cat: "Billing" },
  { id: 6, q: "What data export formats are supported?", a: "CSV, JSON, XML for all account data. GDPR-compliant full exports via Settings → Data → Export all. Large exports delivered via secure link within 24 hours.", cat: "Technical" },
  { id: 7, q: "How do I add a new partner account?", a: "Go to Partners → Add Partner. Fill in business name, contact info, and commission tier. The partner receives an onboarding email within 15 minutes. Requires Admin or Manager role.", cat: "Account" },
  { id: 8, q: "What happens when a terminal goes offline?", a: "Offline terminals queue transactions locally and sync when reconnected. Queue holds up to 500 transactions or 72 hours. Alerts fire after 15 minutes offline.", cat: "Technical" },
];

const SEARCH_RESULTS = [
  { id: 1, title: "Refund and cancellation policy", type: "Document", source: "Policies · Page 3", snippet: "Customers may request a {refund} within 30 calendar days of the original purchase date. The {refund} will be issued to the original payment method and processed within 5–7 business days.", match: 96 },
  { id: 2, title: "How do I request a refund?", type: "FAQ", source: "Billing", snippet: "{Refund} requests can be submitted within 30 days of purchase through the billing portal under Account → Billing → Request {refund}.", match: 91 },
  { id: 3, title: "Understanding your invoice", type: "Document", source: "Billing · Page 5", snippet: "Line items may include {refund} credits, applied when a {refund} has been approved. Credits typically appear within one billing cycle.", match: 67 },
  { id: 4, title: "Service level agreement — standard", type: "Document", source: "Legal · Section 8.2", snippet: "In the event of service credit eligibility, the customer may apply credits or request a partial {refund} proportional to downtime experienced.", match: 52 },
  { id: 5, title: "Customer onboarding guide v4.1", type: "Document", source: "Onboarding · Page 14", snippet: "If a customer expresses dissatisfaction during onboarding, refer them to the {refund} policy and loop in the account manager before processing.", match: 38 },
];

const FAQ_CATS = ["All", "Billing", "Account", "Product", "Technical"];

// ─── ANNOTATION (spec mode) ──────────────────
const Ann = ({ id, children, note, pos = "right" }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div style={{ outline: show ? `2px dashed ${C.accentYellow}` : "2px dashed transparent",
        outlineOffset: 2, borderRadius: T.radius.md, transition: "all 0.15s" }}>
        <div style={{ position: "absolute", top: -8, [pos === "right" ? "right" : "left"]: -8,
          zIndex: 100, width: 20, height: 20, borderRadius: "50%", background: C.accentYellow,
          color: C.bgDeep, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 700, cursor: "pointer" }}>{id}</div>
        {children}
      </div>
      {show && (
        <div style={{ position: "absolute", top: "100%", [pos === "right" ? "right" : "left"]: 0,
          zIndex: 200, marginTop: 8, background: C.bgCard, border: `1px solid ${C.border}`,
          color: C.textPrimary, padding: "12px 16px", borderRadius: T.radius.xl,
          fontSize: 12, lineHeight: 1.6, width: 300, boxShadow: "0 8px 24px rgba(0,0,0,.5)" }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: C.accentYellow, fontSize: 10,
            textTransform: "uppercase", letterSpacing: 0.8 }}>Spec note #{id}</div>
          {note}
        </div>
      )}
    </div>
  );
};

// ─── STATUS BADGE (Quantic style) ────────────
const Badge = ({ status }) => {
  const map = {
    published: { bg: C.accentGreenBg, color: C.accentGreen, border: C.accentGreen, label: "Published" },
    draft: { bg: C.bgHover, color: C.textSecondary, border: C.textTertiary, label: "Draft" },
    review: { bg: C.accentYellowBg, color: C.accentYellow, border: C.accentYellow, label: "In Review" },
    new: { bg: C.accentGreenBg, color: C.accentGreen, border: C.accentGreen, label: "New" },
    waiting: { bg: C.accentOrangeBg, color: C.accentOrange, border: C.accentOrange, label: "Waiting On Client" },
  };
  const s = map[status] || map.draft;
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: T.radius.sm,
      fontSize: T.size.sm, fontWeight: T.weight.semi, background: s.bg, color: s.color,
      border: `1px solid ${s.border}30` }}>{s.label}</span>
  );
};

const TypeBadge = ({ type }) => {
  const colors = { PDF: C.accentRed, DOCX: C.accentBlue, XLSX: C.accentGreen };
  const c = colors[type] || C.textSecondary;
  return (
    <span style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, padding: "1px 6px",
      borderRadius: T.radius.sm, background: `${c}20`, color: c, letterSpacing: 0.3 }}>{type}</span>
  );
};

// ─── SIDEBAR ─────────────────────────────────
const Sidebar = ({ activePanel, setActivePanel, specMode }) => {
  const navItems = [
    { icon: "⊞", label: "Dashboard" },
    { icon: "📊", label: "Reports" },
    { icon: "📋", label: "Leads" },
    { icon: "👥", label: "Contacts" },
    { icon: "🎫", label: "Tickets" },
    { icon: "🏢", label: "Accounts" },
    { icon: "👤", label: "Employees" },
    { icon: "🤝", label: "Partners" },
  ];
  const docNav = [
    { key: "documents", icon: "📄", label: "Documents", count: 32 },
    { key: "faq", icon: "❓", label: "FAQs", count: 24 },
    { key: "search", icon: "🔍", label: "Content Search" },
  ];

  const sidebar = (
    <div style={{ width: 240, background: C.bgSidebar, borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: "18px 20px 14px", display: "flex", alignItems: "center", gap: 10,
        borderBottom: `1px solid ${C.border}` }}>
        <div style={{ width: 32, height: 32, borderRadius: T.radius.lg, background: C.accentBlue,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff",
          fontWeight: T.weight.bold }}>Q</div>
        <span style={{ fontSize: T.size.lg, fontWeight: T.weight.bold, color: C.textPrimary,
          letterSpacing: 1.5, textTransform: "uppercase" }}>Quantic<span style={{ fontSize: 8,
          verticalAlign: "super", marginLeft: 1 }}>®</span></span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {/* CRM nav */}
        {navItems.map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12,
            padding: "9px 20px", cursor: "pointer", color: C.textSecondary, fontSize: T.size.base }}>
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        {/* Document management section */}
        <div style={{ margin: "8px 12px", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
          <div style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, textTransform: "uppercase",
            letterSpacing: 1, color: C.textTertiary, padding: "6px 8px" }}>Document hub</div>
          {docNav.map(item => (
            <div key={item.key} onClick={() => setActivePanel(item.key)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "9px 12px",
              cursor: "pointer", borderRadius: T.radius.md, marginBottom: 2,
              color: activePanel === item.key ? C.textWhite : C.textSecondary,
              background: activePanel === item.key ? C.accentBlueBg : "transparent",
              borderLeft: activePanel === item.key ? `3px solid ${C.accentBlue}` : "3px solid transparent",
              fontSize: T.size.base, fontWeight: activePanel === item.key ? T.weight.semi : T.weight.normal,
            }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
              {item.count && <span style={{ marginLeft: "auto", fontSize: T.size.xs,
                background: C.bgHover, color: C.textSecondary, padding: "1px 8px",
                borderRadius: T.radius.pill, fontWeight: T.weight.semi }}>{item.count}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Theme label */}
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`,
        fontSize: T.size.sm, color: C.textTertiary }}>THEME</div>
    </div>
  );

  return specMode ? (
    <Ann id="1" pos="left" note={<>
      <strong>Component:</strong> Sidebar<br/>
      <strong>Width:</strong> 240px fixed, collapsible via « button<br/>
      <strong>Background:</strong> {C.bgSidebar}<br/>
      <strong>Active state:</strong> Blue left border (3px) + blue tinted bg ({C.accentBlueBg})<br/>
      <strong>Integration:</strong> "Document hub" section inserts below existing CRM nav items. Uses same sidebar component — just new nav group.<br/>
      <strong>API:</strong> Counts from GET /api/documents/stats and GET /api/faqs/count
    </>}>{sidebar}</Ann>
  ) : sidebar;
};

// ─── DOCUMENTS PANEL ─────────────────────────
const DocumentsPanel = ({ specMode }) => {
  const [tab, setTab] = useState("All");
  const [viewMode, setViewMode] = useState("Table");
  const tabs = ["All", "Published", "Drafts", "In Review"];
  const filters = ["Status: All", "Collection: All", "Type: All", "Author: All", "Sort: All"];

  const filtered = tab === "All" ? ARTICLES :
    tab === "Published" ? ARTICLES.filter(a => a.status === "published") :
    tab === "Drafts" ? ARTICLES.filter(a => a.status === "draft") :
    ARTICLES.filter(a => a.status === "review");

  const table = (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: T.size.xl, fontWeight: T.weight.bold, color: C.textPrimary }}>Documents</div>
        <button style={{ padding: "8px 18px", borderRadius: T.radius.md, border: "none",
          background: C.accentBlue, color: "#fff", fontSize: T.size.base,
          fontWeight: T.weight.semi, cursor: "pointer", fontFamily: T.font,
          display: "flex", alignItems: "center", gap: 6 }}>+ Upload Document</button>
      </div>

      {/* Search + view toggle */}
      <div style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px", borderRadius: T.radius.md, border: `1px solid ${C.border}`,
          background: C.bgInput }}>
          <span style={{ color: C.textTertiary }}>🔍</span>
          <input placeholder="Search documents..." style={{ border: "none", outline: "none",
            background: "transparent", flex: 1, fontSize: T.size.base, fontFamily: T.font,
            color: C.textPrimary }} />
        </div>
        <div style={{ display: "flex", borderRadius: T.radius.md, overflow: "hidden",
          border: `1px solid ${C.border}` }}>
          {["Table", "Grid"].map(m => (
            <button key={m} onClick={() => setViewMode(m)} style={{
              padding: "7px 16px", border: "none", fontSize: T.size.md,
              fontWeight: T.weight.semi, cursor: "pointer", fontFamily: T.font,
              background: viewMode === m ? C.accentBlue : C.bgCard,
              color: viewMode === m ? "#fff" : C.textSecondary,
            }}>{m === "Table" ? "≡ " : "⊞ "}{m}</button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "0 24px 12px", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {filters.map(f => (
          <div key={f} style={{ padding: "5px 14px", borderRadius: T.radius.md,
            border: `1px solid ${C.border}`, background: C.bgCard, fontSize: T.size.md,
            color: C.textSecondary, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            {f} <span style={{ fontSize: 10 }}>▾</span>
          </div>
        ))}
        <span style={{ color: C.accentBlue, fontSize: T.size.md, cursor: "pointer",
          display: "flex", alignItems: "center", padding: "5px 8px" }}>Clear</span>
      </div>

      {/* Table */}
      <div style={{ padding: "0 24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["# ID", "≡ Title", "Collection", "Type", "Status", "Views", "Updated"].map((h, i) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: T.size.md,
                  fontWeight: T.weight.semi, color: C.textSecondary,
                  whiteSpace: "nowrap" }}>
                  {h} {i < 6 && <span style={{ color: C.textTertiary, fontSize: 10, marginLeft: 4 }}>↕</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={a.id} style={{ borderBottom: `1px solid ${C.borderLight}`, cursor: "pointer" }}
                onMouseEnter={e => { for(const td of e.currentTarget.children) td.style.background = C.bgHover; }}
                onMouseLeave={e => { for(const td of e.currentTarget.children) td.style.background = "transparent"; }}>
                <td style={{ padding: "12px", fontSize: T.size.md, color: C.accentBlue,
                  fontWeight: T.weight.semi, whiteSpace: "nowrap" }}>#{a.id}</td>
                <td style={{ padding: "12px", maxWidth: 320 }}>
                  <div style={{ fontWeight: T.weight.medium, fontSize: T.size.md, color: C.textPrimary,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
                  <div style={{ fontSize: T.size.sm, color: C.textSecondary, marginTop: 2 }}>{a.pages} pages · {a.author}</div>
                </td>
                <td style={{ padding: "12px", fontSize: T.size.md, color: C.textSecondary }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12 }}>📁</span> {a.collection}
                  </span>
                </td>
                <td style={{ padding: "12px" }}><TypeBadge type={a.type} /></td>
                <td style={{ padding: "12px" }}><Badge status={a.status} /></td>
                <td style={{ padding: "12px", fontSize: T.size.md, color: C.textSecondary }}>{a.views ? a.views.toLocaleString() : "—"}</td>
                <td style={{ padding: "12px", fontSize: T.size.md, color: C.textSecondary, whiteSpace: "nowrap" }}>({a.updated})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", borderTop: `1px solid ${C.border}`, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: T.size.md, color: C.textSecondary }}>
          Show <select style={{ background: C.bgInput, border: `1px solid ${C.border}`,
            borderRadius: T.radius.sm, padding: "4px 8px", color: C.textPrimary,
            fontSize: T.size.md, fontFamily: T.font }}>
            <option>10</option><option>25</option><option>50</option>
          </select> per page &nbsp; Showing 1–{filtered.length} of {filtered.length}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: T.size.md, color: C.textSecondary }}>
          Page
          <button style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: T.radius.sm,
            padding: "4px 8px", color: C.textTertiary, cursor: "pointer" }}>‹</button>
          <span style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: T.radius.sm,
            padding: "4px 10px", color: C.textPrimary, fontWeight: T.weight.semi }}>1</span>
          of 1
          <button style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: T.radius.sm,
            padding: "4px 8px", color: C.textTertiary, cursor: "pointer" }}>›</button>
        </div>
      </div>
    </div>
  );

  return specMode ? (
    <Ann id="2" pos="right" note={<>
      <strong>Component:</strong> DocumentsTable<br/>
      <strong>Layout:</strong> Mirrors existing Tickets table — same column header style with sort arrows (↕), same row hover ({C.bgHover}), same ID column style (blue, bold), same pagination component.<br/>
      <strong>API:</strong> GET /api/documents?page=1&per_page=10&status=...&collection=...&type=...&sort=updated_desc<br/>
      <strong>Filters:</strong> Reuse existing dropdown filter component from Tickets view. Same styling.<br/>
      <strong>Row click:</strong> Opens document detail/preview panel on right side (or modal).<br/>
      <strong>Upload:</strong> POST /api/documents/upload — multipart form, max 50MB. Accepted: PDF, DOCX, XLSX, PNG, JPG. Async text extraction for search indexing.
    </>}>{table}</Ann>
  ) : table;
};

// ─── FAQ PANEL ───────────────────────────────
const FaqPanel = ({ specMode }) => {
  const [openId, setOpenId] = useState(1);
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? FAQS : FAQS.filter(f => f.cat === cat);

  const catColors = {
    Billing: C.accentYellow, Technical: C.accentRed,
    Account: C.accentGreen, Product: C.accentBlue,
  };

  const panel = (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: T.size.xl, fontWeight: T.weight.bold, color: C.textPrimary }}>FAQs</div>
        <button style={{ padding: "8px 18px", borderRadius: T.radius.md, border: "none",
          background: C.accentBlue, color: "#fff", fontSize: T.size.base,
          fontWeight: T.weight.semi, cursor: "pointer", fontFamily: T.font }}>+ Add FAQ</button>
      </div>

      {/* Search */}
      <div style={{ padding: "12px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
          borderRadius: T.radius.md, border: `1px solid ${C.border}`, background: C.bgInput }}>
          <span style={{ color: C.textTertiary }}>🔍</span>
          <input placeholder="Search FAQs..." style={{ border: "none", outline: "none",
            background: "transparent", flex: 1, fontSize: T.size.base, fontFamily: T.font,
            color: C.textPrimary }} />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 0, padding: "0 24px", borderBottom: `1px solid ${C.border}` }}>
        {FAQ_CATS.map(c => (
          <div key={c} onClick={() => setCat(c)} style={{ padding: "10px 16px", fontSize: T.size.md,
            color: cat === c ? C.textWhite : C.textSecondary, cursor: "pointer",
            borderBottom: `2px solid ${cat === c ? C.accentBlue : "transparent"}`,
            marginBottom: -1, fontWeight: cat === c ? T.weight.semi : T.weight.normal,
          }}>{c}</div>
        ))}
      </div>

      {/* FAQ list */}
      <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map(f => {
          const cc = catColors[f.cat] || C.textSecondary;
          return (
            <div key={f.id} style={{ border: `1px solid ${C.border}`, borderRadius: T.radius.lg,
              overflow: "hidden", background: C.bgCard }}>
              <div onClick={() => setOpenId(openId === f.id ? null : f.id)} style={{
                display: "flex", alignItems: "center", padding: "14px 16px", cursor: "pointer",
                gap: 12 }}>
                <span style={{ flex: 1, fontWeight: T.weight.semi, fontSize: T.size.base,
                  color: C.textPrimary }}>{f.q}</span>
                <span style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, textTransform: "uppercase",
                  letterSpacing: 0.5, padding: "2px 8px", borderRadius: T.radius.sm,
                  background: `${cc}20`, color: cc, flexShrink: 0 }}>{f.cat}</span>
                <span style={{ fontSize: 12, color: C.textTertiary, transition: "transform 0.2s",
                  transform: openId === f.id ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
              </div>
              {openId === f.id && (
                <div style={{ padding: "0 16px 16px", fontSize: T.size.md, color: C.textSecondary,
                  lineHeight: 1.7, borderTop: `1px solid ${C.borderLight}`, paddingTop: 12 }}>{f.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return specMode ? (
    <Ann id="3" pos="right" note={<>
      <strong>Component:</strong> FaqAccordion<br/>
      <strong>API:</strong> GET /api/faqs?category=...&page=1&per_page=20<br/>
      <strong>Card style:</strong> Uses bgCard ({C.bgCard}) with border ({C.border}). Same card treatment as Quantic ticket detail cards.<br/>
      <strong>Category badges:</strong> Color-coded. Same color tokens as ticket Type column.<br/>
      <strong>Behavior:</strong> Single-expand accordion. Answers support markdown. Category tabs filter client-side if &lt;100 items, else re-fetch.<br/>
      <strong>CRUD:</strong> Inline edit on click. Rich text editor for answers. POST /api/faqs, PUT /api/faqs/:id, DEL /api/faqs/:id.
    </>}>{panel}</Ann>
  ) : panel;
};

// ─── SEARCH PANEL ────────────────────────────
const SearchPanel = ({ specMode }) => {
  const [query, setQuery] = useState("refund policy");
  const [filter, setFilter] = useState("All");
  const filterOpts = ["All", "Documents", "FAQs", "Attachments"];

  const renderSnippet = (snippet) => {
    const parts = snippet.split(/\{|\}/);
    return parts.map((part, i) => i % 2 === 1
      ? <mark key={i} style={{ background: C.accentYellowBg, color: C.accentYellow,
          borderRadius: 2, padding: "0 3px", fontWeight: T.weight.semi }}>{part}</mark>
      : <span key={i}>{part}</span>
    );
  };

  const panel = (
    <div>
      <div style={{ padding: "14px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: T.size.xl, fontWeight: T.weight.bold, color: C.textPrimary }}>Content Search</div>
      </div>

      {/* Search input */}
      <div style={{ padding: "16px 24px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
          borderRadius: T.radius.lg, border: `2px solid ${C.border}`, background: C.bgInput }}>
          <span style={{ fontSize: 18, color: C.textTertiary }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search across all documents, FAQs, and file contents..."
            style={{ border: "none", outline: "none", background: "transparent", flex: 1,
              fontSize: T.size.base, fontFamily: T.font, color: C.textPrimary }} />
          <span style={{ fontSize: T.size.sm, padding: "2px 8px", borderRadius: T.radius.sm,
            border: `1px solid ${C.border}`, color: C.textTertiary, fontFamily: T.fontMono,
            background: C.bgHover }}>/</span>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ padding: "8px 24px 12px", display: "flex", gap: 6 }}>
        {filterOpts.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "5px 14px", borderRadius: T.radius.pill, cursor: "pointer", fontFamily: T.font,
            border: filter === f ? `1px solid ${C.accentBlue}` : `1px solid ${C.border}`,
            background: filter === f ? C.accentBlueBg : C.bgCard,
            color: filter === f ? C.accentBlue : C.textSecondary,
            fontSize: T.size.md, fontWeight: filter === f ? T.weight.semi : T.weight.normal,
          }}>{f}</button>
        ))}
      </div>

      {/* Results header */}
      <div style={{ padding: "0 24px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: T.size.md, color: C.textSecondary }}>
          {SEARCH_RESULTS.length} results for <strong style={{ color: C.textPrimary }}>"{query}"</strong>
        </div>
        <div style={{ fontSize: T.size.md, color: C.textTertiary }}>Sorted by relevance</div>
      </div>

      {/* Results */}
      <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {SEARCH_RESULTS.map(r => (
          <div key={r.id} style={{ border: `1px solid ${C.border}`, borderRadius: T.radius.lg,
            padding: "14px 16px", cursor: "pointer", background: C.bgCard }}
            onMouseEnter={e => e.currentTarget.style.background = C.bgHover}
            onMouseLeave={e => e.currentTarget.style.background = C.bgCard}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, padding: "2px 8px",
                  borderRadius: T.radius.sm,
                  background: r.type === "FAQ" ? C.accentBlueBg : C.accentGreenBg,
                  color: r.type === "FAQ" ? C.accentBlue : C.accentGreen }}>{r.type}</span>
                <span style={{ fontWeight: T.weight.semi, fontSize: T.size.md, color: C.textPrimary }}>{r.title}</span>
              </div>
              <span style={{ fontSize: T.size.sm, color: C.textTertiary, flexShrink: 0, marginLeft: 12 }}>📁 {r.source}</span>
            </div>
            <div style={{ fontSize: T.size.md, color: C.textSecondary, lineHeight: 1.6 }}>
              {renderSnippet(r.snippet)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <div style={{ width: 80, height: 4, background: C.bgHover, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 2, width: `${r.match}%`,
                  background: r.match > 80 ? C.accentGreen : r.match > 50 ? C.accentYellow : C.textTertiary }} />
              </div>
              <span style={{ fontSize: T.size.xs, color: C.textTertiary, fontWeight: T.weight.semi }}>{r.match}% match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return specMode ? (
    <Ann id="4" pos="right" note={<>
      <strong>Component:</strong> ContentSearch<br/>
      <strong>API:</strong> GET /api/search?q=...&type=all|document|faq|attachment&page=1&per_page=10<br/>
      <strong>Indexing:</strong> Elasticsearch/Meilisearch. Index document text (OCR for scanned PDFs), FAQ answers, and uploaded file contents. Debounce input 300ms.<br/>
      <strong>Snippets:</strong> ~150 chars around match. Highlighted terms wrapped in mark tags. Match % = BM25 score normalized to 0-100.<br/>
      <strong>Result click:</strong> Documents → open viewer/detail. FAQs → jump to FAQ panel with item expanded.<br/>
      <strong>Keyboard:</strong> / focuses search input. ↑↓ navigate results. Enter opens selected.
    </>}>{panel}</Ann>
  ) : panel;
};

// ─── DESIGN TOKENS PANEL ─────────────────────
const TokensPanel = () => (
  <div style={{ padding: 20, background: C.bgCard, borderRadius: T.radius.xl, border: `1px solid ${C.border}` }}>
    <div style={{ fontSize: T.size.lg, fontWeight: T.weight.bold, color: C.textPrimary, marginBottom: 16 }}>Design tokens reference</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div>
        <div style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, textTransform: "uppercase",
          letterSpacing: 1, color: C.textTertiary, marginBottom: 10 }}>Colors</div>
        {Object.entries(C).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: v,
              border: `1px solid ${C.border}`, flexShrink: 0 }} />
            <span style={{ fontFamily: T.fontMono, fontSize: T.size.sm, color: C.textSecondary, flex: 1 }}>{k}</span>
            <span style={{ fontFamily: T.fontMono, fontSize: T.size.sm, color: C.textTertiary }}>{v}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, textTransform: "uppercase",
          letterSpacing: 1, color: C.textTertiary, marginBottom: 10 }}>Typography scale</div>
        {Object.entries(T.size).map(([k, v]) => (
          <div key={k} style={{ marginBottom: 8, display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: T.fontMono, fontSize: T.size.sm, color: C.textTertiary, width: 30 }}>{k}</span>
            <span style={{ fontSize: v, color: C.textPrimary }}>{v}px — The quick brown fox</span>
          </div>
        ))}
        <div style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, textTransform: "uppercase",
          letterSpacing: 1, color: C.textTertiary, marginTop: 16, marginBottom: 10 }}>Border radius</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {Object.entries(T.radius).map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ width: 40, height: 40, border: `1px solid ${C.border}`, borderRadius: v,
                background: C.bgHover, marginBottom: 4 }} />
              <div style={{ fontFamily: T.fontMono, fontSize: T.size.xs, color: C.textTertiary }}>{k}: {v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: T.size.xs, fontWeight: T.weight.bold, textTransform: "uppercase",
          letterSpacing: 1, color: C.textTertiary, marginTop: 16, marginBottom: 10 }}>Component states</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Badge status="published" /><Badge status="review" /><Badge status="draft" />
          <Badge status="new" /><Badge status="waiting" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <TypeBadge type="PDF" /><TypeBadge type="DOCX" /><TypeBadge type="XLSX" />
        </div>
      </div>
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────
export default function QuanticDocumentSpec() {
  const [specMode, setSpecMode] = useState(true);
  const [activePanel, setActivePanel] = useState("documents");
  const [showTokens, setShowTokens] = useState(false);

  return (
    <div style={{ fontFamily: T.font, color: C.textPrimary }}>
      {/* Spec mode toggle */}
      <div style={{ background: specMode ? C.accentYellowBg : C.accentBlueBg,
        border: `1px solid ${specMode ? C.accentYellow : C.accentBlue}`,
        borderRadius: T.radius.xl, padding: "10px 16px", marginBottom: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: T.size.md }}>
          <span style={{ fontSize: 16 }}>{specMode ? "🔍" : "👁"}</span>
          <span style={{ fontWeight: T.weight.semi, color: specMode ? C.accentYellow : C.accentBlue }}>
            {specMode ? "Dev spec mode — hover numbered markers for implementation details" : "Preview mode — viewing as end user"}
          </span>
        </div>
        <button onClick={() => setSpecMode(!specMode)} style={{
          padding: "5px 14px", borderRadius: T.radius.md,
          border: `1px solid ${specMode ? C.accentYellow : C.accentBlue}`,
          background: specMode ? C.accentYellow : C.accentBlue,
          color: C.bgDeep, fontSize: T.size.md, fontWeight: T.weight.bold,
          cursor: "pointer", fontFamily: T.font,
        }}>{specMode ? "Switch to preview" : "Switch to spec mode"}</button>
      </div>

      {specMode && (
        <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
          <button onClick={() => setShowTokens(!showTokens)} style={{
            padding: "6px 14px", borderRadius: T.radius.md, border: `1px solid ${C.border}`,
            background: showTokens ? C.accentBlue : C.bgCard, color: showTokens ? "#fff" : C.textSecondary,
            fontSize: T.size.md, fontWeight: T.weight.semi, cursor: "pointer", fontFamily: T.font,
          }}>{showTokens ? "Hide" : "Show"} design tokens</button>
          <span style={{ fontSize: T.size.md, color: C.textTertiary, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: C.accentYellow,
              color: C.bgDeep, display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700 }}>?</span>
            Hover orange circles for API endpoints, component specs, and behavior notes
          </span>
        </div>
      )}

      {showTokens && specMode && <div style={{ marginBottom: 12 }}><TokensPanel /></div>}

      {/* Main app shell */}
      <div style={{ border: `1px solid ${C.border}`, borderRadius: T.radius.xl, overflow: "hidden",
        display: "flex", minHeight: 620, background: C.bgMain }}>
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} specMode={specMode} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
          {activePanel === "documents" && <DocumentsPanel specMode={specMode} />}
          {activePanel === "faq" && <FaqPanel specMode={specMode} />}
          {activePanel === "search" && <SearchPanel specMode={specMode} />}
        </div>
      </div>

      {/* Implementation notes */}
      {specMode && (
        <div style={{ marginTop: 12, background: C.bgCard, border: `1px solid ${C.border}`,
          borderRadius: T.radius.xl, padding: 20 }}>
          <div style={{ fontSize: T.size.lg, fontWeight: T.weight.bold, marginBottom: 14, color: C.textPrimary }}>
            Implementation notes for developers
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontWeight: T.weight.semi, color: C.accentBlue, marginBottom: 8, fontSize: T.size.base }}>API endpoints required</div>
              <div style={{ fontFamily: T.fontMono, fontSize: T.size.sm, color: C.textSecondary,
                background: C.bgDeep, padding: 14, borderRadius: T.radius.lg, lineHeight: 1.9,
                border: `1px solid ${C.border}` }}>
                GET &nbsp;/api/documents?page&status&collection&type&sort<br/>
                POST /api/documents<br/>
                POST /api/documents/upload<br/>
                PUT &nbsp;/api/documents/:id<br/>
                DEL &nbsp;/api/documents/:id<br/>
                GET &nbsp;/api/documents/stats<br/>
                ────────────────────────────<br/>
                GET &nbsp;/api/faqs?category&page<br/>
                POST /api/faqs<br/>
                PUT &nbsp;/api/faqs/:id<br/>
                DEL &nbsp;/api/faqs/:id<br/>
                ────────────────────────────<br/>
                GET &nbsp;/api/search?q&type&page&per_page<br/>
                GET &nbsp;/api/collections<br/>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: T.weight.semi, color: C.accentBlue, marginBottom: 8, fontSize: T.size.base }}>Architecture &amp; integration</div>
              <div style={{ color: C.textSecondary, fontSize: T.size.md, lineHeight: 1.7 }}>
                <div style={{ marginBottom: 10 }}><strong style={{ color: C.textPrimary }}>Search engine:</strong> Elasticsearch or Meilisearch. Index document body text, FAQ answers, and OCR-extracted text from uploaded files. Snippet extraction: 150 chars around each match with highlighted terms.</div>
                <div style={{ marginBottom: 10 }}><strong style={{ color: C.textPrimary }}>File storage:</strong> S3-compatible. Max 50MB. Support: PDF, DOCX, XLSX, PNG, JPG. Async processing pipeline: upload → extract text → index in search engine.</div>
                <div style={{ marginBottom: 10 }}><strong style={{ color: C.textPrimary }}>Auth integration:</strong> Reuse existing Quantic CRM auth. Map roles: Admin (full CRUD), Editor (create/edit docs &amp; FAQs), Agent (read-only + search). Inherit account/partner scoping.</div>
                <div style={{ marginBottom: 10 }}><strong style={{ color: C.textPrimary }}>CRM linking:</strong> Documents linked to accounts via account_id FK. Show document count on Account detail page. Search results deep-link back to account context.</div>
                <div><strong style={{ color: C.textPrimary }}>Dark theme:</strong> All components must use the token variables above — no hardcoded colors. Tokens align with Quantic's existing dark theme. Support theme toggle if "THEME" selector is implemented.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
