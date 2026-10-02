# Worklog — Quantum Mechanics Study Platform (Griffiths Ch. 2)

## Project Overview
Building an interactive educational web platform to study Quantum Mechanics, focused on
Chapter 2 (The Time-Independent Schrödinger Equation) of Griffiths' "Introduction to
Quantum Mechanics". Goal: prepare for an exam on Chapters 1-2 (Ch.1 exercises done).

Core philosophy: teach WHY before HOW. Not a solution-dump. A tool to learn to
*recognize* problem types and *understand* the physical meaning of each step.

## Source Material (provided by user, in /home/z/my-project/upload/)
- Griffiths - Introduction to quantum mechanics.pdf
- solutions-of-quantum-mechanics-by-griffith.pdf

Chapter 2 structure (from the book's table of contents — organizational fact):
- 2.1 Stationary States (p.20)
- 2.2 The Infinite Square Well (p.24)
- 2.3 The Harmonic Oscillator (p.31)
- 2.4 The Free Particle (p.44)
- 2.5 The Delta-Function Potential (p.50)
- 2.6 The Finite Square Well (p.60)
- 2.7 The Scattering Matrix (p.66)
- Further Problems for Chapter 2 (p.68)

All pedagogical content (explanations, examples, exercises, check questions) is written
originally for this platform, organized by the book's section structure. Standard physics
equations (Schrödinger equation, normalization, energy levels, etc.) are used as
fundamental scientific knowledge.

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Set up worklog, install dependencies, configure project foundation

Work Log:
- Explored existing Next.js 16 + shadcn/ui scaffold (clean, only default page)
- Extracted Griffiths PDF table of contents to confirm Chapter 2 structure
- Extracted Chapter 2 text to understand pedagogical flow
- Identified problem types in Further Problems
- Installed KaTeX + react-katex for math rendering
- Planned architecture: extensible to all 11 chapters; Chapter 2 active

Stage Summary:
- Foundation understood. Chapter 2 structure confirmed (7 sections + problems).
- KaTeX installed for equation rendering.

---
Task ID: 2
Agent: main (Z.ai Code)
Task: Design data model + content type system + Prisma schema

Work Log:
- Defined Prisma schema: Student, ConceptProgress, ExerciseAttempt, ExamResult, TrainingSession
- Extensible to all chapters (conceptId/exerciseId match the TS data ids)
- Defined content type system in src/lib/content-types.ts:
  Block (p, math, callout, steps, list, eq-row, kv), Concept (5 layers),
  Exercise (guided questions, hints, solution steps with why/meaning/info/whatIf,
  variations, commonErrors), ModelProblem, DecisionNode, Section, Chapter
- Ran `bun run db:push` successfully

Stage Summary:
- Database schema synced. Type system supports all required features:
  5-layer concepts, progressive hints, step-by-step solutions with ¿Por qué?,
  error classification (8 types), variations, model problem dissection, decision tree.

---
Task ID: 3
Agent: main (Z.ai Code)
Task: Build original pedagogical content for Chapter 2

Work Log:
- src/data/structure.ts: 2 chapters (ch1 inactive, ch2 active), 7 sections with summaries
- src/data/concepts.ts: 6 concepts for section 2.1 (Separation, TISE, Oscillatory-vs-exponential,
  Bound-vs-scattering, Quantization, Continuity) each with 5 layers + check questions
- src/data/concepts-2.ts: 11 more concepts for sections 2.2-2.7 (infinite well, superposition,
  stationary-state properties, harmonic oscillator, free particle, delta, finite well,
  tunneling, probability current, S-matrix)
- src/data/model-problems.ts: 6 "What is Griffiths doing?" dissections (infinite well,
  harmonic oscillator algebraic, free particle wave packet, delta bound, delta scattering,
  finite well) — each with goal/given/find/methodWhy/equations/conditions/result/meaning/generalize
- src/data/decision-tree.ts: ~20-node visual decision tree, each node explains WHY the
  decision matters; terminals give the method + why
- src/data/exercises.ts: 11 original exercises spanning all 7 sections, each with
  guided questions, 5-level progressive hints, multi-step solutions (each step has
  what/why/meaning/info/whatIf/math), final answer, variations, common errors

Stage Summary:
- 16 concepts, 6 model problems, 11 exercises, full decision tree — all original content
- organized by Griffiths' Chapter 2 section structure

---
Task ID: 4
Agent: main (Z.ai Code)
Task: Build UI components and main page

Work Log:
- src/components/math.tsx: KaTeX inline/block wrappers
- src/components/render-blocks.tsx: renders all Block types (text, math, callouts with
  4 tones, steps, lists, equation rows, key-value)
- src/components/why-box.tsx: collapsible "¿Por qué?" button with framer-motion
- src/components/concept-view.tsx: 5-layer accordion + check-question cards
- src/components/exercise-view.tsx: guided questions, progressive hints, solution steps
  with ¿Por qué?/Significado físico/¿Qué información?/¿Y si cambiara? buttons, error
  self-classification (8 types), variations, common errors
- src/components/visualizations.tsx: 4 interactive SVG visualizations (infinite well
  with ψ and |ψ|², harmonic oscillator with V+turning points, finite well with bound-state
  count, barrier tunneling with T% and sliders for m/V0/E/width)
- src/components/decision-tree-view.tsx: navigable decision tree with breadcrumbs
- src/components/model-problem-view.tsx: dissected model problems in a 9-card grid
- src/components/dashboard.tsx: landing with stats, recommended study flow, section grid
- src/components/chapter-map.tsx: concept browser + exercises list with section filters
- src/components/exam-mode.tsx: 8-question exam, self-report, concept-gap report
- src/components/training-mode.tsx: timed (30/60min) and count-based sessions with timer
- src/components/progress-dashboard.tsx: per-concept mastery, error-type breakdown,
  recent exams and training sessions
- src/components/sidebar.tsx: academic sidebar with chapter sections + concept tree
- src/app/page.tsx: orchestrates all views, sticky footer, top bar
- src/lib/store.ts: Zustand UI store (persisted studentId + sidebarOpen)
- src/lib/student.ts: client identity + API helpers

Stage Summary:
- Full SPA on the / route with view switching. All requested features implemented:
  concept layers, ¿Por qué? buttons, progressive hints, error analysis, visualizations,
  decision tree, "What is Griffiths doing?", exam mode, training mode, progress dashboard.

---
Task ID: 5
Agent: main (Z.ai Code)
Task: Build API routes for progress tracking

Work Log:
- /api/attempts (POST): record exercise attempt + update concept mastery
- /api/exam (POST): record exam result + reinforce concept gaps
- /api/training (POST): record training session
- /api/progress (GET): aggregated progress for dashboard
- All routes auto-create the Student record on first use (no auth needed)

Stage Summary:
- Progress tracking fully wired: attempts → concept mastery, exam gaps → reinforced
  mastery, training sessions stored, dashboard aggregates all.

---
Task ID: 6
Agent: main (Z.ai Code)
Task: Lint, fix errors, verify with agent-browser

Work Log:
- Fixed: exercises.ts parse error (stray array close), exercises.ts prime-in-string
  (used \psi^{\prime}), training-mode.tsx finish-before-declaration (useCallback + ref),
  exam-mode.tsx invalid useMemo dep, concept-view.tsx missing RenderBlock export
- Final lint: 0 errors, 0 warnings
- agent-browser verification:
  ✓ Dashboard renders (stats, study flow, 7 sections, concept counts)
  ✓ Concept view: 5 layers expand, KaTeX math renders (Schrödinger equation visible)
  ✓ Visualizations: 13 SVG elements, 4 tabs, interactive sliders
  ✓ Exercises list: 11 exercises with section filters + difficulty stars
  ✓ Exercise view: guided question textboxes, "Pista 1" progressive hint button,
    "Mostrar solución" button
  ✓ Solution steps: "Siguiente paso" reveals step; each step has ¿Por qué? /
    Significado físico / ¿Qué información lo permitió? / ¿Y si cambiara? buttons
  ✓ Footer: pushed naturally on long pages, sticky on short pages
- Updated layout.tsx metadata title to "Mecánica Cuántica · Griffiths Cap. 2"
- Confirmed title shows correctly in browser

Stage Summary:
- Platform is fully functional and browser-verified. All core interactions work.
- Dev server running clean on port 3000.

---
## Current project status (assessment)
- Stable and functional. All 22 system requirements from the user spec are implemented:
  educational philosophy (WHY before HOW), Chapter 2 focus, 5-layer concepts,
  ¿Por qué? buttons on every solution step, guided resolution, progressive hints,
  error analysis (8 types), problem variations, interactive visualizations,
  "What is Griffiths doing?" section, exam mode with concept-gap report,
  intensive training mode, progression levels, clean academic UI, sticky footer.
- Extensible architecture: adding Chapter 3+ only requires new data files
  (chapters.ts, concepts.ts, exercises.ts) — no code changes.

## Current goals / completed modifications / verification results
- DONE: structure, concept system, exercise system, hint system, solution system,
  error analysis, basic visualizations, student progress — all 8 first-implementation
  items from the user spec.
- Verified via agent-browser: dashboard, concept layers, visualizations,
  exercises, solution steps with ¿Por qué? buttons all render and interact correctly.

## Unresolved issues or risks, and priority recommendations for next phase
- Content depth: 16 concepts / 11 exercises is a solid foundation but the book's
  Chapter 2 has ~50 problems. Next phase: add more exercises per section
  (especially 2.2 infinite well superpositions, 2.3 HO operator algebra,
  2.6 finite well transcendental solving, 2.7 S-matrix derivations).
- The harmonic oscillator and free-particle visualizations are qualitative; a
  more quantitative Hermite-based rendering would be a nice enhancement.
- Consider adding a "review before exam" adaptive mode that picks the student's
  weakest concepts (data already tracked in ConceptProgress).
- The decision tree could be rendered as an actual graph (D3/Mermaid) for a
  more visual feel; currently it's a navigable card flow which is clear but linear.

---
Task ID: 7
Agent: web-dev-reviewer (cron)
Task: QA + Phase 2 development (styling polish, more content, quantitative visualizations, adaptive review mode, more model problems)

Work Log:
- Reviewed worklog: project stable, 22 system requirements met in Phase 1
- QA with agent-browser: tested dashboard, concept layers, visualizations, exercises, exam mode,
  decision tree, API endpoints (/api/attempts, /api/progress, /api/exam, /api/training)
- Confirmed no console errors, lint clean (0 errors, 0 warnings)
- Verified progress tracking end-to-end: POST attempt → mastery updates → GET progress returns updated concept
- VLM assessment of dashboard visual quality (8/10) identified: sidebar density, hover lift, math serif,
  active states, footer contrast as improvement areas

Phase 2 — Styling polish (globals.css + sidebar + dashboard):
- Added subtle paper-like background texture (radial-gradient dots) for academic feel
- Added scroll-margin-top for anchor scrolling (fixes sticky-header overlap on decision tree ¿Por qué?)
- Added refined thin scrollbars (8px, rounded, hover-darken)
- Added .lift-on-hover utility (translateY(-2px) + box-shadow on hover) — applied to dashboard cards
- Added .nav-active-bar utility (left gradient indicator for active concept in sidebar)
- Sidebar: active concept item now has teal tint + left gradient bar + larger dot indicator
- Sidebar nav items: active uses teal→emerald gradient instead of solid primary; icon scale on hover
- Dashboard hero: gradient background with blurred accent circles, gradient text on "resolver"
- Dashboard study-flow cards: per-step gradient number badges (teal/amber/violet/sky/emerald/rose),
  icon scale on hover, lift-on-hover
- Dashboard section cards: badge-style concept/exercise counts, section id in teal pill
- Dashboard training/exam/review cards: now 3-column grid with lift-on-hover

Phase 2 — More original exercises (exercises-phase2.ts, 5 new exercises, total 17):
- ex-2-2c: Valores esperados ⟨x⟩, ⟨x²⟩, Δx en el pozo infinito (con simetría para ⟨x⟩)
- ex-2-2d: ⟨H⟩ constante vs ⟨x⟩ oscilante (distinguir constantes del movimiento)
- ex-2-3b: ⟨x²⟩, ⟨p²⟩ por álgebra de operadores (a, a†) + verificación Heisenberg
- ex-2-3c: Estado fundamental por a|0⟩=0 (derivación de gaussiana + verificación E₀=½ℏω)
- ex-2-6b: Penetración en región prohibida del pozo finito (dependencia con E)
- ex-2-7b: Simetría de la S-matrix para V par (S₁₁=S₂₂, S₁₂=S₂₁)
- Re-exported as ALL_EXERCISES + alias EXERCISES so all components auto-include new set

Phase 2 — Quantitative visualizations (visualizations.tsx):
- Replaced qualitative HO viz with quantitative, properly-normalized Hermite ψ_n:
  * Uses physics Hermite polynomials H_n + standard normalization 1/√(2^n n! √π)
  * Shows ψ_n offset to its energy level E_n = (n+½)ℏω
  * Shows |ψ_n|² (quantum prob density) + classical prob density 1/(π√(2E-x²)) for comparison
  * Shading of forbidden region |x| > x_T, turning point markers
  * Displays ⟨x²⟩, Δx = √(n+½), turning points ±√(2E)
  * Principle of correspondence explained (quantum → classical as n→∞)
- Added NEW wave-packet evolution visualization (WavePacketViz):
  * Gaussian packet for free particle: |Ψ(x,t)|² with analytic form
  * Sliders for k₀, σ, t + play/pause animation (requestAnimationFrame)
  * Shows v_g = ℏk₀/m (group velocity = classical), ω₀ = ℏk₀²/2m
  * Shows σ(t) = σ₀√(1+(αt)²) spreading, center x_c = v_g·t
  * Explains dispersion + Heisenberg (small σ → large Δp → fast spreading)
- Added "Paquete de onda" tab to main Visualizations component (5 tabs now)

Phase 2 — Adaptive review mode (review-mode.tsx, new feature):
- New view 'review' added to UI store + sidebar + page router
- 4-phase flow: analyze → plan → running → done
- Analyzes student's ConceptProgress from /api/progress
- Builds plan: weakest concepts (mastery < 80%) first, up to 6, with reasons
- Falls back to balanced 7-section starter plan if no progress data yet
- Each plan item shows concept title, mastery %, error count, progress bar
- Color-coded by weakness: rose (<50%), amber (<80%), emerald (≥80%)
- Running phase: serves ExerciseView for each concept's representative exercise
- Self-report correctness → records attempt → advances → updates mastery
- Done phase: summary + links to progress dashboard

Phase 2 — More model problems (model-problems.ts, 2 new, total 8):
- mp-step-potential: Escalón de potencial (V=0 x<0, V=V₀ x>0)
  * Two regimes: E>V₀ (transmission T=4kk'/(k+k')²) and E<V₀ (total reflection + penetration)
- mp-finite-well-scattering: Pozo finito en régimen de dispersión (E>V₀)
  * T(E) formula with resonances (sin(2k'a)=0 → T=1)
  * Shows same potential can ligar (E<V₀) or dispersar (E>V₀)

Verification:
- Lint: 0 errors, 0 warnings
- agent-browser: 17 exercises visible, wave packet viz renders, review mode full flow works,
  new model problems (Escalón, Pozo finito dispersión) render correctly
- VLM re-assessment: polished academic look, sidebar active states excellent visual anchoring,
  card hover effects create coded visual system, "SaaS-meets-Textbook" aesthetic

Stage Summary:
- Phase 2 complete. Platform now has: 17 exercises (was 11), 8 model problems (was 6),
  5 visualizations including animated wave packet (was 4), quantitative Hermite-based HO,
  adaptive review mode, polished styling (hero gradient, hover lifts, active states,
  scrollbars, paper texture, anchor scroll offset).
- All features verified working in browser. Lint clean. Dev server stable.

## Current project status (assessment)
- Stable, feature-rich, polished. All 22 original requirements + Phase 2 enhancements:
  * Quantitative Hermite HO with classical comparison (principle of correspondence)
  * Animated wave-packet evolution (dispersion + group velocity)
  * Adaptive review mode that targets weakest concepts from real progress data
  * 5 new exercises covering operator algebra, superposition dynamics, penetration, S-matrix symmetry
  * 2 new model problem dissections (step potential, finite well scattering with resonances)
  * Polished academic UI with gradient hero, hover lifts, active nav indicators, refined scrollbars

## Current goals / completed modifications / verification results
- DONE: QA pass, styling polish, more exercises, quantitative visualizations, adaptive review,
  more model problems. All verified via agent-browser + VLM.
- Content now: 16 concepts, 8 model problems, 17 exercises, full decision tree.
- Visualizations: infinite well, quantitative Hermite HO, animated wave packet, finite well, barrier.

## Unresolved issues or risks, and priority recommendations for next phase
- Content: still only ~17/50+ Griffiths Ch.2 problems. Next phase: add more 2.3 (ladder operator
  derivations, recursion formula), 2.4 (Fourier transform exercises), 2.5 (delta barrier T/R).
- Decision tree is navigable-card style; a true graph (D3/Mermaid) render would be more visual.
- Consider adding a "bookmarks" feature: let students star concepts/exercises to revisit.
- The exam mode samples randomly; could weight by student's weak concepts (like review mode does).
- Wave packet could show real/imaginary parts of Ψ (not just |Ψ|²) to illustrate phase evolution.
- Mobile sidebar could use a bottom-sheet pattern instead of overlay for better UX.

---
Task ID: 8
Agent: web-dev-reviewer (cron, Phase 3)
Task: QA + Phase 3 development (graph-style decision tree, bookmarks feature, more exercises, wave packet phase view, styling polish)

Work Log:
- Reviewed worklog: Phase 2 complete with 17 exercises, 8 model problems, adaptive review mode
- QA with agent-browser: confirmed all views render, no console errors, lint clean
- Identified next-phase items from worklog recommendations

Phase 3 — Graph-style decision tree (decision-tree-view.tsx rewrite):
- Replaced linear card navigation with interactive SVG graph visualization
- BFS-layered layout: computes node depth, positions nodes by depth layer
- 23 nodes rendered as colored rounded rectangles with wrapped question text
- Edges drawn as arrows (active path highlighted in teal with label badges)
- Node states: current (solid teal), in-path (light teal), terminal (emerald), unvisited (muted)
- Click any node to navigate; breadcrumb path also clickable
- View toggle: "Grafo" (graph) vs "Lista" (list = original card flow), default graph
- Legend explaining node colors; horizontal scroll for wide graphs
- Fixed critical bug: lucide-react `Map` icon collided with JS global `Map` constructor
  → renamed import to `MapIcon`; this was crashing the whole page (Runtime TypeError)
- Added guards for empty arrays (Math.max on empty → -Infinity)

Phase 3 — Bookmarks/favorites feature (new, full stack):
- Prisma: added Bookmark model (studentId, itemType, itemId, note, createdAt) with
  compound unique [studentId, itemType, itemId]; ran db:push
- API: /api/bookmarks (GET list, POST toggle, DELETE) — upsert/toggle semantics
- BookmarkButton component: star icon, toggles bookmarked state, toast feedback,
  loads initial state from API; size sm/md variants
- BookmarksView: lists starred concepts/exercises with tab toggle, item cards link
  back to the concept/exercise, remove button, empty-state CTA
- Integrated BookmarkButton into concept-view header and exercise-view header
- Added "Mis favoritos" nav item in sidebar (Star icon) and dashboard shortcut card
- Added 'bookmarks' to UI store View type + page router

Phase 3 — More exercises (exercises-phase3.ts, 4 new, total 21):
- ex-2-3d: Deriva el espectro del oscilador con [a,a†]=1 (full algebraic derivation)
- ex-2-3e: Teorema del virial en el oscilador (⟨T⟩=⟨V⟩=½E_n, verified algebraically)
- ex-2-4b: Transformada de Fourier del paquete gaussiano (Parseval, Δx·Δk saturation)
- ex-2-5b: Coeficientes T y R de la barrera delta (with limits E→∞, E→0)
- Merged via ALL_EXERCISES = Phase1 + Phase2 + Phase3

Phase 3 — Wave packet phase visualization (visualizations.tsx):
- Added "Mostrar partes Re/Im de Ψ (fase)" checkbox toggle
- Computes complex Ψ(x,t) = (1/√(1+iαt)) exp(-(x-vg t)²/(4σ²(1+iαt))) e^{i(k₀x-ω₀t)}
- Renders Re(Ψ) (solid blue) and Im(Ψ) (dashed orange) when toggled
- Added module-scope complex helpers (cmul, cdiv, cexp) to avoid in-component hoisting issues
- Phase explanation: shows how internal oscillations modulate gaussian envelope

Phase 3 — Styling polish:
- Concept view layers: framer-motion animated expand/collapse (height+opacity),
  numbered badges with gradient when open, icon scale on open, shadow transitions
- Footer: gradient background, logo badge, two-line structured content, italic motto
- Dashboard: added bookmarks shortcut card with star icon and gradient background
- Sidebar: active concept gets teal tint + gradient left bar (from Phase 2, confirmed)
- Server stability: created start-dev.sh using setsid for fully-detached background
  process (fixes issue where compound shell commands killed the dev server)

Verification:
- Lint: 0 errors, 0 warnings
- agent-browser: 21 exercises visible (was 17), new exercises (ladder, Fourier, delta
  barrier, virial) all render; graph decision tree shows 23 nodes and navigation works;
  wave packet phase toggle shows 2 polylines (Re/Im); bookmarks view renders with
  concept/exercise tabs; bookmark star toggles and persists to DB
- VLM assessment of bookmarks view: "clean, highly navigable, readable, clear empty state"
- Server stays alive across all tests (setsid detachment fixed the kill-on-shell-exit issue)

Stage Summary:
- Phase 3 complete. Platform now has: 21 exercises (was 17), graph-style decision tree,
  bookmarks feature (full stack: DB + API + UI), wave packet Re/Im phase view,
  animated concept layers, polished footer.
- All features verified working in browser. Lint clean. Dev server stable.

## Current project status (assessment)
- Stable, feature-rich, polished. Cumulative enhancements across 3 phases:
  * Graph-style decision tree (SVG, interactive, 23 nodes, path highlighting)
  * Bookmarks/favorites (star concepts & exercises, persist to DB, dedicated view)
  * 4 more exercises: ladder operator derivation, virial theorem, Fourier transform,
    delta barrier T/R
  * Wave packet Re/Im phase visualization (complex Ψ computation)
  * Animated concept layer expansion (framer-motion)
  * Polished footer with logo badge and gradient

## Current goals / completed modifications / verification results
- DONE: graph decision tree, bookmarks, more exercises, wave packet phase, styling polish.
- Content now: 16 concepts, 8 model problems, 21 exercises, graph decision tree.
- Visualizations: infinite well, quantitative Hermite HO, animated wave packet (with
  phase toggle), finite well, barrier.
- All verified via agent-browser + VLM.

## Unresolved issues or risks, and priority recommendations for next phase
- Content: ~21/50+ Griffiths Ch.2 problems. Next: add 2.1 normalization theorem,
  2.2 odd/even superposition time evolution, 2.6 transcendental graphical solving,
  2.7 transfer matrix composition.
- Exam mode samples randomly; could weight by student's weak concepts (like review mode).
- Mobile sidebar uses overlay; a bottom-sheet pattern would improve mobile UX.
- Consider a "study streak" / daily goal tracker (without gamification excess).
- The graph decision tree could support pan/zoom for large graphs (currently scroll only).
- Add a print/export feature for study notes (concepts marked as favorites).

---
Task ID: 9
Agent: web-dev-reviewer (cron, Phase 4)
Task: QA + Phase 4 development (study streak tracker, more exercises, adaptive exam, print/export notes, styling polish)

Work Log:
- Reviewed worklog: Phase 3 complete with 21 exercises, graph decision tree, bookmarks, wave packet phase view
- QA with agent-browser: confirmed all views render, no console errors, lint clean, server stable
- Identified next-phase items from worklog recommendations

Phase 4 — Study streak / daily goal tracker (new feature, full stack):
- Prisma: added StudyDay model (studentId, date YYYY-MM-DD, exercisesDone, conceptsRead,
  goalsMet, minutesStudied) with compound unique [studentId, date]; ran db:push
- API: /api/study (GET returns 14-day series + current streak + longest streak + totals;
  POST records activity for today, upserts the day row incrementing the right field)
  * Streak computation: consecutive days with activity (ending today or yesterday)
  * Longest streak: scans all history
- StudyStreakWidget component: shows current streak (flame icon), today's goal progress
  (target icon, 3 exercises/day), 14-day totals, 14-day activity bar chart (today highlighted
  in orange), subtle nudge messages (non-gamified: "constancia sobre intensidad")
- Wired activity recording:
  * exercise-view: recordAttempt() also POSTs /api/study {activity:'exercise'}
  * concept-view: useEffect records /api/study {activity:'concept'} once per concept visit
- Widget placed on dashboard between quick stats and study flow

Phase 4 — More exercises (exercises-phase4.ts, 4 new, total 25):
- ex-2-1c: Teorema de normalización — E debe ser real (decomposing E=E_R+iE_I, |Ψ|² argument)
- ex-2-2e: Superposición par/impar y evolución temporal (pozo simétrico, ⟨x⟩ oscila por paridad mixta)
- ex-2-6c: Resolución gráfica de trascendentales del pozo finito (z=la, z₀, N≈⌊z₀/π⌋+1)
- ex-2-7c: Composición de matrices de transfer (dos deltas en serie, interferencia Fabry-Pérot)
- Merged via ALL_EXERCISES = Phase1 + Phase2 + Phase3 + Phase4

Phase 4 — Adaptive exam mode (exam-mode.tsx):
- Fetches student's weak concepts (mastery < 80%) when entering setup via /api/progress
- Adaptive sampling: ~half the exam targets weakest concepts first, then section coverage,
  then random fill. Falls back to balanced random for new students
- Added "Examen adaptativo" toggle (checkbox) in setup screen with explanation and
  weak-concept chips showing concept title + mastery %
- Uses Target icon; violet theme to distinguish from regular exam

Phase 4 — Print/export study notes (bookmarks-view.tsx):
- "Exportar / imprimir notas" button in bookmarks header (appears only when bookmarks exist)
- Generates a printable HTML document (opens new window, triggers print dialog):
  * Serif font (Georgia) for academic feel
  * Concepts: title, section, intuition layer, math layer
  * Exercises: title, section, statement, final answer
  * blocksToHtml() helper converts all Block types (p, math, callout, list, steps, kv) to HTML
  * Page-break-inside:avoid for clean printing
  * Date stamp and chapter header

Phase 4 — Styling polish:
- Concept view: added "Capas leídas: ●●●○○ 3/5" progress indicator (5 gradient pills that
  fill as layers open) next to bookmark button — gives at-a-glance reading progress
- Exercise view: replaced plain text meta with colored pill badges:
  * Section: teal pill
  * Type: sky pill
  * Difficulty: emerald (★), amber (★★), rose (★★★) pills with star icons
- Bookmarks view: export button in header (top-right, standard action button pattern)

Verification:
- Lint: 0 errors, 0 warnings
- agent-browser: 25 exercises visible (was 21), all 4 new exercises render; study streak
  widget shows on dashboard ("días seguidos"); adaptive exam toggle renders with
  weak-concept info; concept layer progress indicator ("Capas leídas") shows; export
  button appears in bookmarks when bookmarks exist
- VLM assessment of bookmarks view: "clean, professional, well-organized, clear visual
  hierarchy, good whitespace, consistent typography; Export button appropriately placed"
- Server stays alive across all tests (start-dev.sh setsid detachment)

Stage Summary:
- Phase 4 complete. Platform now has: 25 exercises (was 21), study streak/daily goal
  tracker (full stack), adaptive exam mode (weights by weak concepts), print/export study
  notes, concept layer progress indicator, refined exercise difficulty badges.
- All features verified working in browser. Lint clean. Dev server stable.

## Current project status (assessment)
- Stable, feature-rich, polished. Cumulative enhancements across 4 phases:
  * Study streak / daily goal tracker (DB + API + widget, non-gamified nudges)
  * 4 more exercises: normalization theorem, odd/even superposition, transcendental solving,
    transfer matrix composition
  * Adaptive exam mode (weights questions by student's weak concepts)
  * Print/export study notes (generates printable HTML from bookmarks)
  * Concept layer progress indicator + refined exercise difficulty pill badges

## Current goals / completed modifications / verification results
- DONE: study streak, more exercises, adaptive exam, print/export, styling polish.
- Content now: 16 concepts, 8 model problems, 25 exercises, graph decision tree.
- All major features from worklog recommendations now implemented:
  graph decision tree ✓, bookmarks ✓, adaptive review ✓, more exercises ✓,
  quantitative visualizations ✓, wave packet phase ✓, study streak ✓,
  adaptive exam ✓, print/export ✓.

## Unresolved issues or risks, and priority recommendations for next phase
- Content: ~25/50+ Griffiths Ch.2 problems. Next: add 2.3 recursion formula Hermite,
  2.4 group vs phase velocity conceptual, 2.5 delta well + barrier comparison,
  2.6 number of bound states as function of z₀.
- Mobile sidebar uses overlay; bottom-sheet pattern would improve mobile UX.
- Graph decision tree could support pan/zoom for large graphs.
- Study streak widget: add a weekly calendar view (not just 14-day strip).
- Exam mode: add a timer + question review screen before finishing.
- Add a "concept relationships" graph view (prerequisites + related, from concept data).
- Consider keyboard shortcuts (j/k for next/prev concept, ? for help).

---
Task ID: 10
Agent: web-dev-reviewer (cron, Phase 5)
Task: QA + Phase 5 development (exam timer + review, keyboard shortcuts, more exercises, concept graph, styling polish)

Work Log:
- Reviewed worklog: Phase 4 complete with 25 exercises, study streak, adaptive exam, print/export
- QA with agent-browser: confirmed all views render, no console errors, lint clean, server stable
- Identified next-phase items from worklog recommendations

Phase 5 — Exam timer + question review screen (exam-mode.tsx):
- Added 'review' phase between 'running' and 'done' (setup → running → review → done)
- Countdown timer: optional time limits (sin límite / 10 / 15 / 20 / 30 min) selected in setup
  * Timer effect ticks every second, auto-advances to review when time's up
  * Low-time warning (<60s) shown in red
- Review screen: shows all questions with status badges (✓ resuelto / ✗ incorrecto / sin contestar)
  * Inline quick-change buttons to toggle any answer without leaving review
  * Jump-to-question (click number badge) returns to running at that question
  * "Ir a la primera sin contestar" button for efficiency
  * Finalize button + elapsed time display
- Running header: timer + "Revisar" button (jump to review anytime) + Abortar

Phase 5 — Keyboard shortcuts (keyboard-shortcuts.tsx, new):
- useKeyboardShortcuts hook + KeyboardHelpDialog component
- Shortcuts: J/→ (next concept), K/← (prev concept), G (concept map), H (home/dashboard),
  B (bookmark current), ? (toggle help dialog)
- Igores inputs/textareas and modifier keys (Ctrl/Meta/Alt)
- Help dialog with styled <kbd> key caps, opened via ? or top-bar keyboard icon button
- Concept view: added prev/next nav buttons at bottom with "Anterior (K)" / "Siguiente (J)"
  labels and "1/16" position indicator — visual counterpart to keyboard nav

Phase 5 — More exercises (exercises-phase5.ts, 4 new, total 29):
- ex-2-3f: Hermite recursion formula (construct H_2, H_3 + verify ψ_2 satisfies EDO)
- ex-2-4c: Group vs phase velocity (v_f=p/2m vs v_g=p/m, superluminal v_f no violation)
- ex-2-5c: Delta well vs barrier comparison (ligados: 1 vs 0; dispersión: igual T)
- ex-2-6d: Bound states vs z₀ (N≈⌊z₀/π⌋+1, cases z₀=1/5/10, limit z₀→∞)
- Merged via ALL_EXERCISES = Phase1+2+3+4+5

Phase 5 — Concept relationships graph (concept-graph-view.tsx, new):
- New view 'concept-graph' in UI store + sidebar ("Mapa de relaciones") + page router
- SVG circular layout: 16 concept nodes positioned around a circle
- Two edge types: prerequisites (solid arrow, from concept→its prereqs) and related
  (dashed line between related pairs)
- Color-coded by section (7 distinct oklch colors)
- Click node to select → highlights connected edges + shows detail card with
  prerequisite/related chips (clickable to navigate)
- Legend explaining edge types + section colors
- VLM-improved: darker edges (oklch 0.45/0.55 alpha), multi-line labels (wrap at 18 chars,
  2 lines max), better contrast, smaller nodes to reduce overlap

Phase 5 — Styling polish:
- Study streak widget: enhanced 14-day strip with day-of-month numbers, weekday labels,
  goal-met ✓ checkmark above each day, emerald gradient for goal-met days, legend
- Mobile sidebar: backdrop-blur overlay, sidebar bg-sidebar/95 backdrop-blur, slide-in
  shadow, close (X) button in header for mobile, aria-label

Verification:
- Lint: 0 errors, 0 warnings
- agent-browser: 29 exercises visible (was 25), all 4 new exercises render; concept graph
  renders 16 nodes; keyboard help dialog opens with ? key; exam timer option renders;
  concept prev/next nav shows ("SIGUIENTE (J)", "1/16"); streak calendar with day numbers
- VLM assessment of concept graph v2: "readability improved significantly, darker edges
  provide better contrast, multi-line labels prevent overlap" — substantial improvement
- Server stays alive across all tests (start-dev.sh setsid detachment)

Stage Summary:
- Phase 5 complete. Platform now has: 29 exercises (was 25), exam timer + review screen,
  keyboard shortcuts + help dialog, concept relationships graph, concept prev/next nav,
  enhanced study streak calendar, improved mobile sidebar.

## Current project status (assessment)
- Stable, feature-rich, polished. Cumulative enhancements across 5 phases:
  * Exam timer (optional limits) + review screen before finalizing
  * Keyboard shortcuts (j/k/g/h/b/?) with styled help dialog
  * Concept relationships graph (SVG, 16 nodes, prereq + related edges, color-coded)
  * 4 more exercises: Hermite recursion, group vs phase velocity, delta well vs barrier,
    bound states vs z₀
  * Concept prev/next nav + enhanced study streak calendar + improved mobile sidebar

## Current goals / completed modifications / verification results
- DONE: exam timer+review, keyboard shortcuts, more exercises, concept graph, styling polish.
- Content now: 16 concepts, 8 model problems, 29 exercises, graph decision tree,
  concept relationships graph.
- All major features from worklog recommendations now implemented across 5 phases.

## Unresolved issues or risks, and priority recommendations for next phase
- Content: ~29/50+ Griffiths Ch.2 problems. Next: add 2.2 time-dependent expectation values,
  2.3 coherent states intro, 2.5 multiple deltas, 2.7 unitarity proof.
- Concept graph could use pan/zoom for large graphs and a force-directed layout.
- Add a "concept search" feature (fuzzy search across concept/exercise titles + content).
- Consider adding audio narration for concept layers (accessibility).
- Study streak: add weekly summary email/notification (would need a backend scheduler).
- Exam: add per-question time tracking (not just total).
- Add a "spaced repetition" mode (SM-2 algorithm) for long-term retention.

---
Task ID: 11
Agent: web-dev-reviewer (cron, Phase 6)
Task: QA + Phase 6 development (spaced repetition SM-2, search palette, more exercises, per-question exam timer)

Work Log:
- Reviewed worklog: Phase 5 complete with 29 exercises, exam timer+review, keyboard shortcuts, concept graph
- QA with agent-browser: confirmed all views render, no console errors, lint clean, server stable
- Identified next-phase items from worklog recommendations

Phase 6 — Spaced repetition mode (SM-2 algorithm, full stack):
- Prisma: added SM2Card model (studentId, exerciseId, easeFactor, interval, repetitions,
  dueAt, lastReviewAt, totalReviews) with compound unique [studentId, exerciseId]; ran db:push
- API: /api/sm2 (GET returns dueCards, totalCards, reviewedToday, 7-day upcoming forecast;
  POST records review with SM-2 algorithm: quality 0-5 → updates ease/interval/reps/dueAt)
  * SM-2 logic: q<3 resets reps, due tomorrow; q>=3 increases reps, interval grows by ease factor
  * Ease updated as ease += (0.1 - (5-q)*(0.08+(5-q)*0.02)), clamped [1.3, ∞)
- SpacedRepetitionMode component: 3 phases (overview → reviewing → done)
  * Overview: due/total/reviewed-today stats + 7-day forecast bar chart + start button + how-it-works
  * Reviewing: serves ExerciseView + 4-level quality selector (Negro/Difícil/Bien/Fácil)
  * Done: summary with per-card quality + interval + avg quality
- SM2QualitySelector: embedded in exercise-view after error classification — lets student
  self-rate recall quality, creates/updates SM-2 card, shows next-review interval in toast
- Added 'spaced-repetition' to UI store + sidebar ("Memoria a largo plazo", Zap icon) + page router
- Added dashboard shortcut card for SM-2 mode

Phase 6 — Search palette (command palette, fuzzy search):
- SearchPalette component using cmdk (CommandDialog): searches across ALL concepts, ALL exercises,
  MODEL_PROBLEMS, and navigation items
  * Each item has searchable value (title + subtitle + tags + section + type)
  * Color-coded by item type (teal concepts, sky exercises, violet model problems)
  * Section badges + difficulty stars in results
- useSearchPalette hook: listens for Cmd/Ctrl+K to toggle
- SearchTrigger button in top bar with ⌘K kbd hint
- Verified: typing "pozo" filters to 62 results across groups

Phase 6 — More exercises (exercises-phase6.ts, 4 new, total 33):
- ex-2-2f: Time-dependent expectation values in superposition (⟨p⟩ oscillates by cross-terms)
- ex-2-3g: Coherent states intro (a|α⟩=α|α⟩, classical trajectory, Heisenberg saturation)
- ex-2-5d: Two delta wells: interference and resonances (splitting, Fabry-Pérot, band theory)
- ex-2-7d: Unitarity proof of S-matrix (conservation of probability → S†S=I → R+T=1)
- Merged via ALL_EXERCISES = Phase1+2+3+4+5+6

Phase 6 — Per-question exam time tracking:
- Added timeSpentMs to ExamQ interface + questionStart state
- markAnswer records time spent on current question (Date.now() - questionStart)
- useEffect resets questionStart when `current` changes during running
- Running header shows live per-question timer (seconds)
- Review screen shows per-question time badge (MM:SS format) next to status

Verification:
- Lint: 0 errors, 0 warnings
- agent-browser: 33 exercises visible (was 29), all 4 new exercises render; SM-2 mode renders
  with stats + forecast; search palette opens via Cmd+K and trigger button, filters correctly
  (62 results for "pozo"); SM-2 quality selector appears in exercise solution; per-question
  timer shows in exam running header
- VLM assessment of SM-2 mode: "layout clear, stats useful, explanation well-placed"
- SM-2 API tested end-to-end: POST creates card (interval=1, due tomorrow), GET returns
  due/total/reviewedToday/upcoming forecast correctly
- Server stays alive across all tests

Stage Summary:
- Phase 6 complete. Platform now has: 33 exercises (was 29), spaced repetition mode (SM-2,
  full stack), search palette (Cmd+K, fuzzy across all content), per-question exam timer,
  4 more exercises (time-dependent expectations, coherent states, multiple deltas, unitarity).

## Current project status (assessment)
- Stable, feature-rich, polished. Cumulative enhancements across 6 phases:
  * Spaced repetition (SM-2): DB + API + mode + quality selector in exercises
  * Search palette (Cmd+K): fuzzy search across concepts/exercises/model problems/navigation
  * 4 more exercises: time-dependent ⟨p⟩, coherent states, multiple deltas, unitarity proof
  * Per-question exam timer (live + recorded in review)

## Current goals / completed modifications / verification results
- DONE: SM-2 spaced repetition, search palette, more exercises, per-question timer.
- Content now: 16 concepts, 8 model problems, 33 exercises, graph decision tree,
  concept relationships graph, SM-2 cards, search palette.
- All major features from worklog recommendations now implemented across 6 phases.

## Unresolved issues or risks, and priority recommendations for next phase
- Content: ~33/50+ Griffiths Ch.2 problems. Next: add 2.1 Ehrenfest theorem, 2.3 squeezed states,
  2.4 wave packet spreading derivation, 2.6 graphical transcendental solving exercise.
- SM-2: add a "cram mode" (override scheduling for pre-exam intensive review).
- Search: add recent searches + keyboard navigation hints in palette.
- Concept graph: add pan/zoom + force-directed layout for large graphs.
- Exam: add question tagging (flag for review during exam, distinct from answered).
- Add a "study session summary" email/print at end of training/exam sessions.
- Consider adding collaborative features (shared bookmarks, study groups) — would need auth.
