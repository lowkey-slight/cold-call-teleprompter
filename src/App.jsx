import { useState, useEffect, useRef, useCallback } from 'react'
import { SECTIONS, LINES, THREAT_ZONES, QUICK_REFERENCE } from './data/script'

// ─── TONE CONFIG ──────────────────────────────────────────────────────────────
const TONE_MAP = {
  'FLAT':             { color: '#64748b', bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.35)' },
  'CALM':             { color: '#64748b', bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.35)' },
  'WARM':             { color: '#f97316', bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.35)' },
  'GENUINE':          { color: '#f97316', bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.35)' },
  'MATTER-OF-FACT':   { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)' },
  'DELIBERATE':       { color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.35)' },
  'SLOW':             { color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.35)' },
  'CURIOUS':          { color: '#22d3ee', bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)' },
  'GENUINELY CURIOUS':{ color: '#22d3ee', bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)' },
  'DIAGNOSTIC':       { color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
  'CERTAIN':          { color: '#818cf8', bg: 'rgba(129,140,248,0.15)', border: 'rgba(129,140,248,0.35)' },
  'ASSUMPTIVE':       { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.3)' },
  'UNBOTHERED':       { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)' },
  'DIRECT':           { color: '#fb923c', bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.3)' },
  'EASY':             { color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.3)' },
  'SEQUENTIAL':       { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.3)' },
  'QUICK':            { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)' },
  'BRIEF':            { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)' },
  'CONVERSATIONAL':   { color: '#22d3ee', bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)' },
  'HONEST':           { color: '#c084fc', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.3)' },
  'LET IT LAND':      { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)' },
  'PRACTICAL':        { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.3)' },
}

const LEVEL_CONFIG = {
  low:    { label: 'Low', color: '#4ade80' },
  medium: { label: 'Medium', color: '#fbbf24' },
  high:   { label: 'High', color: '#f87171' },
}

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

function ToneBadge({ tone }) {
  const cfg = TONE_MAP[tone] || TONE_MAP['MATTER-OF-FACT']
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.06em',
      fontFamily: 'JetBrains Mono, monospace',
      color: cfg.color,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      whiteSpace: 'nowrap',
    }}>
      {tone}
    </span>
  )
}

function ScriptLineRow({ line, isActive, navigableIndex, totalNavigable, onClick, onObjectionClick }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [isActive])

  const isNote = line.type === 'note'
  const isConditional = line.type === 'conditional'
  const hasObjButton = isActive && line.threatZoneId

  if (isNote) {
    return (
      <div ref={ref} className="script-note">
        {line.text}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`script-line ${isActive ? 'active' : ''} ${isConditional ? 'conditional' : ''}`}
      onClick={() => onClick(line.id)}
    >
      {line.beatLabel && (
        <div className="beat-label">{line.beatLabel}</div>
      )}
      <div className="line-body">
        <div className="line-text">
          {isConditional && <span className="conditional-tag">IF</span>}
          {line.text}
        </div>
        <div className="line-meta">
          {line.tones && line.tones.map(t => <ToneBadge key={t} tone={t} />)}
          {hasObjButton && (
            <button
              className="obj-button"
              onClick={e => { e.stopPropagation(); onObjectionClick(line.threatZoneId) }}
            >
              Objections
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionTabs({ currentSection, onJump }) {
  return (
    <div className="section-tabs">
      {SECTIONS.map(s => (
        <button
          key={s.id}
          className={`tab ${currentSection === s.id ? 'active' : ''}`}
          onClick={() => onJump(s.id)}
        >
          <span className="tab-num">{s.id + 1}</span>
          {s.label}
        </button>
      ))}
    </div>
  )
}

function ProgressBar({ progress, currentSection }) {
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="progress-label">{Math.round(progress)}%</span>
    </div>
  )
}

function ObjectionPanel({ zoneId, onClose, onOpenFullMap }) {
  const zone = THREAT_ZONES.find(z => z.id === zoneId)
  if (!zone) return null
  const lvl = LEVEL_CONFIG[zone.level] || LEVEL_CONFIG.medium

  return (
    <div className="obj-panel">
      <div className="obj-panel-header">
        <div>
          <div className="obj-panel-location">{zone.location}</div>
          <div className="obj-panel-title">{zone.title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="threat-level" style={{ color: lvl.color, borderColor: `${lvl.color}40`, background: `${lvl.color}10` }}>
            ⚠ {lvl.label}
          </span>
          <button className="icon-btn" onClick={onClose} title="Close (Esc)">✕</button>
        </div>
      </div>

      <div className="obj-panel-body">
        {zone.objections.map((obj, i) => (
          <div key={i} className="objection-card">
            <div className="objection-trigger">{obj.trigger}</div>
            <div className="objection-response">{obj.response}</div>
            {obj.followUp && (
              <div className="objection-followup">
                <div className="followup-label">↳ Then</div>
                <div className="objection-response">{obj.followUp}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {obj.followUpTones?.map(t => <ToneBadge key={t} tone={t} />)}
                </div>
              </div>
            )}
            <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {obj.tones?.map(t => <ToneBadge key={t} tone={t} />)}
            </div>
            {obj.note && (
              <div className="objection-note">{obj.note}</div>
            )}
          </div>
        ))}
      </div>

      <div className="obj-panel-footer">
        <button className="full-map-btn" onClick={onOpenFullMap}>
          Full Map — all 41 objections
        </button>
      </div>
    </div>
  )
}

function FullMapOverlay({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={e => e.stopPropagation()}>
        <div className="overlay-header">
          <div>
            <div className="overlay-title">Objection Handling Quick-Reference Map</div>
            <div className="overlay-sub">All 41 scenarios — never answer an objection directly. Make them answer it.</div>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="overlay-body">
          {SECTIONS.map(section => {
            const sectionItems = QUICK_REFERENCE.filter(item => {
              const sectionKeywords = {
                0: ['Beat 2 & 3'],
                1: ['Beat 4'],
                2: [],
                3: ['Beat 7'],
                4: ['Beat 8'],
              }
              return sectionKeywords[section.id]?.some(kw =>
                item.when.toLowerCase().includes(kw.toLowerCase())
              )
            })
            return (
              <div key={section.id} className="map-section">
                <div className="map-section-header">
                  <span className="map-section-num">{section.id + 1}</span>
                  {section.label}
                </div>
                <div className="map-table">
                  {sectionItems.map(item => (
                    <div key={item.num} className="map-row">
                      <div className="map-num">#{item.num}</div>
                      <div className="map-when">{item.when}</div>
                      <div className="map-objection">{item.objection}</div>
                      <div className="map-flip">{item.flip}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function KeyboardLegend() {
  const keys = [
    { key: 'Space / →', action: 'Next line' },
    { key: '←', action: 'Previous line' },
    { key: 'O', action: 'Open objections' },
    { key: 'Esc', action: 'Close panel' },
    { key: '1 – 5', action: 'Jump to section' },
  ]
  return (
    <div className="kbd-legend">
      {keys.map(({ key, action }) => (
        <span key={key} className="kbd-item">
          <kbd>{key}</kbd> {action}
        </span>
      ))}
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

const navigableLines = LINES.filter(l => l.type !== 'note')

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [focusIndex, setFocusIndex] = useState(0)
  const [panelZoneId, setPanelZoneId] = useState(null)
  const [showFullMap, setShowFullMap] = useState(false)

  const currentLine = navigableLines[focusIndex]
  const currentSection = currentLine?.section ?? 0
  const progress = ((focusIndex) / (navigableLines.length - 1)) * 100

  const openObjections = useCallback((zoneId) => {
    setPanelZoneId(zoneId)
  }, [])

  const closePanel = useCallback(() => {
    setPanelZoneId(null)
  }, [])

  const jumpToSection = useCallback((sectionId) => {
    const idx = navigableLines.findIndex(l => l.section === sectionId)
    if (idx !== -1) setFocusIndex(idx)
    setPanelZoneId(null)
  }, [])

  const handleLineClick = useCallback((lineId) => {
    const idx = navigableLines.findIndex(l => l.id === lineId)
    if (idx !== -1) setFocusIndex(idx)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (showFullMap) {
        if (e.key === 'Escape') { setShowFullMap(false); e.preventDefault() }
        return
      }

      switch (e.key) {
        case ' ':
        case 'ArrowRight':
          e.preventDefault()
          setFocusIndex(i => Math.min(i + 1, navigableLines.length - 1))
          break
        case 'ArrowLeft':
          e.preventDefault()
          setFocusIndex(i => Math.max(i - 1, 0))
          break
        case 'o':
        case 'O':
          if (currentLine?.threatZoneId) {
            openObjections(currentLine.threatZoneId)
          }
          break
        case 'Escape':
          if (panelZoneId) closePanel()
          break
        case '1': jumpToSection(0); break
        case '2': jumpToSection(1); break
        case '3': jumpToSection(2); break
        case '4': jumpToSection(3); break
        case '5': jumpToSection(4); break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentLine, panelZoneId, showFullMap, openObjections, closePanel, jumpToSection])

  // Group lines by section for rendering section dividers
  const linesBySection = LINES.reduce((acc, line) => {
    if (!acc[line.section]) acc[line.section] = []
    acc[line.section].push(line)
    return acc
  }, {})

  return (
    <div className={`app ${theme}`}>
      {/* ── HEADER ── */}
      <div className="header">
        <div className="header-top">
          <div className="brand">
            <span className="brand-name">Sudarshan Media</span>
            <span className="brand-sep">·</span>
            <span className="brand-sub">Cold Call Teleprompter</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="line-counter">{focusIndex + 1} / {navigableLines.length}</span>
            <button
              className="theme-toggle"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '☽'}
            </button>
          </div>
        </div>

        <SectionTabs currentSection={currentSection} onJump={jumpToSection} />
        <ProgressBar progress={progress} currentSection={currentSection} />
      </div>

      {/* ── MAIN AREA ── */}
      <div className={`main-area ${panelZoneId ? 'panel-open' : ''}`}>
        {/* Script */}
        <div className="script-area">
          {SECTIONS.map(section => (
            <div key={section.id} className="section-block">
              <div className="section-divider">
                <span className="section-divider-label">
                  {section.id + 1}. {section.label}
                </span>
                <span className="section-divider-target">{section.target}</span>
              </div>

              {(linesBySection[section.id] || []).map(line => (
                <ScriptLineRow
                  key={line.id}
                  line={line}
                  isActive={currentLine?.id === line.id}
                  onClick={handleLineClick}
                  onObjectionClick={openObjections}
                />
              ))}
            </div>
          ))}

          <div className="script-end">
            <span>— End of script —</span>
          </div>
        </div>

        {/* Objection Panel */}
        {panelZoneId && (
          <ObjectionPanel
            zoneId={panelZoneId}
            onClose={closePanel}
            onOpenFullMap={() => setShowFullMap(true)}
          />
        )}
      </div>

      {/* Keyboard Legend */}
      <KeyboardLegend />

      {/* Full Map Overlay */}
      {showFullMap && (
        <FullMapOverlay onClose={() => setShowFullMap(false)} />
      )}
    </div>
  )
}
