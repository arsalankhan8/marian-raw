# Mariani website accessibility audit

**Audit date:** 18 August 2026  
**Technical target:** WCAG 2.2, Levels A and AA  
**Audited targets:** the public site at <https://marianimetal.com/> and the React/Vite application in this repository  
**Purpose:** developer-focused technical assessment; not legal advice or a legal compliance opinion

## Executive summary

The public website and this repository are materially different builds. The public site is an older one-page experience; most of its navigation and all tested project links currently return a 404 response. Its home page also lacks a mobile viewport declaration, a main-content landmark and a bypass mechanism, has an empty visual heading, exposes the home-logo link as “Model agency Vogue,” removes visible keyboard focus, and uses undersized low-contrast navigation text. On a 320 CSS-pixel device emulation, the browser lays the page out at 980 CSS pixels rather than reflowing to the device width.

The repository candidate is more complete and includes several good practices, especially in its career forms and mobile-menu controls. It nevertheless has site-wide structural and interaction problems: most marketing routes have no `main` or meaningful `h1`; the desktop About submenu is pointer-dependent; several tabs, cards and navigation controls are clickable `div`, `span`, or `p` elements; contact fields lack programmatic labels; carousel content remains keyboard-focusable while off screen; recurring motion has no pause control; several focus indicators are removed; route titles are usually identical; and verified color and target-size failures remain.

**Technical conclusion:** neither the tested production home page nor the repository candidate currently satisfies all WCAG 2.2 Level A requirements, so neither can conform to Level AA as a complete website. This is a technical conformance conclusion about the audited state, not a conclusion about ADA, AODA, Accessible Canada Act, or other legal compliance. A production deployment of the repository could eliminate some of the public site's defects, but it would not be WCAG 2.2 AA without source remediation and manual assistive-technology validation.

The first business priority is to establish which build is authoritative and fix the public 404 navigation. The first accessibility engineering priorities are semantic page shells and skip links, native keyboard-operable controls, visible focus, form names/errors, headings and page titles, carousel focus/motion, contrast, and touch targets.

## Bottom-line assessment

| Target | Current technical assessment | Estimated WCAG 2.2 conformance |
|---|---|---|
| Public site | Severe access barriers on the only reachable page; linked content is unavailable | **Below Level A** on the tested page; therefore not Level AA |
| Repository candidate | Better foundation but repeatable Level A and AA failures across shared components | **Below Level A** as a complete site; therefore not Level AA |

WCAG conformance is binary at a claimed level: every applicable success criterion at that level and lower must be met for each full page in scope. “Mostly accessible,” an automated score, or an accessibility statement is not a conformance claim. See the [WCAG 2.2 conformance requirements](https://www.w3.org/TR/WCAG22/#conformance-reqs).

## Scope and method

### Pages and states sampled

Public production:

- `https://marianimetal.com/`
- Primary links to `about.html`, `media.html`, `video.html`, `contacts.html`, and `privacy.html`
- All nine project links exposed by the home-page carousel

Repository production build, served locally:

- `/` (region selector), `/canada`, `/US`
- `/C.A.-Portfolio`, `/U.S.-Portfolio`, `/canada/portfolio/the-spirit-garden`
- `/canada/about`, `/US/about`, `/canada/awards`, `/canada/csr`, `/US/csr`
- `/canada/news`, `/US/news`, `/canada/contact`, `/US/contact`
- `/canada/reference`, `/canada/careers`, `/canada/careers/structural-steel-welder`
- `/canada/privacy`, `/canada/terms`, `/canada/policies`, `/canada/aoda`, and `/Static`

### Tests performed

- Source review of React components, routes, rendered semantics, media, form markup, ARIA, focus styling, animation configuration, and responsive CSS
- Successful production build with Vite
- Chromium rendering at 1440×1000 and 320×800; DOM geometry, landmarks, headings, names, labels, focusability, and document overflow inspected
- Targeted Tab, Shift+Tab, Enter, and Space checks on navigation, menus, forms, cards, carousels, and mobile controls
- Computed-style focus checks and deterministic contrast calculations for solid-color combinations
- Link destination checks on the live website

The repository's existing `npm run lint` does not pass: ESLint reports 90 errors and 11 warnings, primarily unused imports/variables and hook dependency findings. These are not counted as WCAG failures, but the absent passing quality gate raises regression risk. No accessibility test package or automated accessibility CI gate is configured.

### Severity scale

- **Critical:** blocks a primary journey or makes a major body of content unavailable to one or more user groups.
- **High:** likely prevents completion or understanding for keyboard, screen-reader, low-vision, or cognitive users; commonly a Level A failure or widespread AA failure.
- **Medium:** significant friction or a scoped failure with a workaround.
- **Low:** limited impact, quality issue, or best-practice/AAA improvement.

## A. Confirmed issues

### P-01 — Public navigation destinations are unavailable

- **URL/page:** `https://marianimetal.com/`
- **Exact element/component:** primary navigation links (`About`, `Media`, `Video`, `Contact`), footer `Privacy Policy`, and all nine project-card links.
- **Severity:** Critical
- **WCAG 2.2:** No single success criterion directly says that every hyperlink destination must exist. This is recorded as a functional accessibility blocker rather than forcing an inaccurate WCAG mapping. It prevents meaningful evaluation of criteria on the linked pages.
- **Why it matters:** users cannot reach company information, contact content, privacy information, project details, or media. The barrier affects everyone and is especially costly to users who expend more effort navigating or orienting.
- **Evidence:** every tested primary destination and project link returned the public site's “404 Page Not Found” response on 18 August 2026.
- **Recommended fix:** establish the canonical deployment, restore valid routes or redirects, add automated link checking to deployment, and retest every restored page for accessibility.
- **Can be fixed in code/configuration:** Yes—routing, deployment, or content-publishing configuration.
- **Manual testing required:** Yes, to confirm each restored destination and its content.

### P-02 — Public page does not reflow as a mobile page

- **URL/page:** `https://marianimetal.com/`
- **Exact element/component:** document `<head>` and the fixed-width horizontal project presentation.
- **Severity:** High
- **WCAG 2.2:** 1.4.10 Reflow (AA). Resize Text (1.4.4) still requires the manual zoom test listed in section B.
- **Why it matters:** users on small screens and users who magnify content receive a desktop canvas scaled down to unreadable dimensions, with content extending beyond the visual viewport.
- **Evidence:** no `meta name="viewport"` is present. At a 320-pixel device emulation, `window.innerWidth` was 980 CSS pixels and project content extended across a much wider fixed carousel instead of reflowing to 320 CSS pixels.
- **Recommended fix:** add `<meta name="viewport" content="width=device-width, initial-scale=1">`; replace fixed desktop dimensions with responsive layouts; test 320 CSS pixels and 400% zoom without two-dimensional scrolling except for genuinely two-dimensional content.
- **Can be fixed in code:** Yes.
- **Manual testing required:** Yes, for 200%/400% zoom, mobile browsers, landscape orientation, and text-spacing overrides.

### P-03 — Keyboard focus is visually suppressed on the public site

- **URL/page:** `https://marianimetal.com/`
- **Exact element/component:** logo link, main navigation, About submenu links, project links, and footer links.
- **Severity:** High
- **WCAG 2.2:** 2.4.7 Focus Visible (AA); 2.4.13 Focus Appearance is an additional AAA consideration, not an AA requirement.
- **Why it matters:** keyboard users cannot tell which control will activate.
- **Evidence:** targeted keyboard traversal reached the links, but computed focus styles reported `outline: none` with no replacement box shadow or other visible focus treatment, including when `:focus-visible` matched.
- **Recommended fix:** add a consistent high-contrast `:focus-visible` outline with adequate thickness and offset; do not remove the user-agent outline unless a visible replacement is present.
- **Can be fixed in code:** Yes, primarily global CSS.
- **Manual testing required:** Yes, across backgrounds, sticky elements, Windows High Contrast/forced-colors, and Safari.

### P-04 — Public page has no bypass mechanism or main landmark

- **URL/page:** `https://marianimetal.com/`
- **Exact element/component:** document body, global header/navigation, and page content.
- **Severity:** High
- **WCAG 2.2:** 2.4.1 Bypass Blocks (A), 1.3.1 Info and Relationships (A)
- **Why it matters:** keyboard and screen-reader users must traverse repeated navigation and lack a reliable main-content destination.
- **Evidence:** the rendered page contains no `main` element and no skip-to-content link. The `Our projects` link with `href="#"` is a carousel/panel control, not a bypass link.
- **Recommended fix:** wrap unique content in `<main id="main-content">` and add a first-focusable skip link targeting it. Ensure the target receives programmatic focus where needed.
- **Can be fixed in code:** Yes.
- **Manual testing required:** Yes, to verify the skip link appears on focus and lands before unique content.

### P-05 — Public heading and logo name do not describe the page

- **URL/page:** `https://marianimetal.com/`
- **Exact element/component:** the only `h1`, containing the home-logo image and link; `<img alt="Model agency Vogue">`.
- **Severity:** High
- **WCAG 2.2:** 1.1.1 Non-text Content (A), 1.3.1 Info and Relationships (A), 2.4.4 Link Purpose (A), 2.4.6 Headings and Labels (AA)
- **Why it matters:** the apparent page heading has no text, and the logo's accessible alternative names the wrong organization. A screen-reader user hears a misleading home-link name and gets no meaningful top-level heading.
- **Evidence:** the sole heading is effectively `<h1><a ...><img ... alt="Model agency Vogue"></a></h1>`.
- **Recommended fix:** use `alt="Mariani Metal — Home"` for the linked logo (or `alt="Mariani Metal"` with suitable link context), and add a visible, descriptive page `h1` outside the logo. Do not use a heading solely as a logo wrapper.
- **Can be fixed in code/content:** Yes.
- **Manual testing required:** Content approval is advisable; technical verification is straightforward.

### P-06 — Public navigation and footer text contrast is insufficient

- **URL/page:** `https://marianimetal.com/`
- **Exact element/component:** small teal navigation and footer text over the translucent white header/background.
- **Severity:** Medium
- **WCAG 2.2:** 1.4.3 Contrast (Minimum) (AA)
- **Why it matters:** small text becomes difficult to read for users with low vision or color-vision deficiencies.
- **Evidence:** foreground `rgb(39,126,125)` over the observed composited header background is approximately **4.0:1**. The navigation is about 12px and footer text about 10px, so normal-text minimum **4.5:1** applies.
- **Recommended fix:** darken the text token or make the header background opaque enough to maintain at least 4.5:1 in every state; test hover, visited, active, and sticky variants.
- **Can be fixed in code/design tokens:** Yes.
- **Manual testing required:** Yes, wherever translucent layers sit over changing backgrounds.

### R-01 — Most repository routes lack a semantic page shell and bypass mechanism

- **URL/page:** `/`, `/canada`, `/US`, both portfolio listings, About, Awards, CSR, News, Contact, Reference, policy routes, and `/Static`; only sampled career/detail content consistently rendered `main`.
- **Exact element/component:** shared `Header.jsx`, `HeaderSticky.jsx`, `MobileHeader.jsx`, route templates, and page wrappers.
- **Severity:** High
- **WCAG 2.2:** 1.3.1 Info and Relationships (A), 2.4.1 Bypass Blocks (A)
- **Why it matters:** users navigating by landmarks cannot identify the page's primary content, and keyboard users have no way to skip repeated navigation.
- **Evidence:** rendered landmark inventories showed no `main` on most routes; desktop header wrappers are `div` elements rather than `header`, and the desktop navigation is not a `nav`. The only `nav` on many rendered pages is the footer navigation. No skip link is implemented.
- **Recommended fix:** create one shared shell with `<header>`, named `<nav>`, `<main id="main-content">`, and `<footer>`; add a first-focusable skip link; allow exceptional full-screen routes to expose an equivalent main landmark.
- **Can be fixed in code:** Yes, centrally.
- **Manual testing required:** Yes, for landmark names/order and skip-link behavior.

### R-02 — Heading structure is missing or misleading on marketing routes

- **URL/page:** `/`, `/canada`, `/US`, portfolio listings/details, About, Awards, CSR, News, Contact, Reference, and `/Static`.
- **Exact element/component:** `src/Components/Headings/Singleheading/SingleHeading.jsx` renders a `span`; related visual-heading helpers also render spans; `FlipCard.jsx` and `ExpertiseSection.jsx` each render additional `h1` elements on home pages.
- **Severity:** High
- **WCAG 2.2:** 1.3.1 Info and Relationships (A), 2.4.6 Headings and Labels (AA)
- **Why it matters:** screen-reader heading navigation cannot discover major sections, and duplicate or skipped levels provide a false outline.
- **Evidence:** About, Awards, CSR, News, Contact, Reference, portfolio listing, and sampled project detail routes rendered no `h1` for their visual page title. Home source contains multiple section-level `h1` elements (`CORE EXPERTISE`, `Sectors We Build For`, and another primary heading), followed by `h4`/`h3` card headings. The region selector starts with `h3` and later `h2` headings. Visually hidden-by-opacity duplicate card headings remain in the DOM.
- **Recommended fix:** make the page title the single meaningful `h1`; use `h2` for primary sections and `h3` for nested cards; let heading components accept an explicit semantic level; keep visual size independent from heading rank; remove duplicated semantic headings from hidden card faces or mark truly inactive content unavailable to assistive technology.
- **Can be fixed in code/content:** Yes.
- **Manual testing required:** Yes, to approve the content outline on each template.

### R-03 — Desktop About submenu is pointer-dependent

- **URL/page:** all repository pages with the desktop header, including `/canada` and `/US`.
- **Exact element/component:** About dropdown in `src/Components/Header/Header.jsx:89-90` and corresponding pointer handlers in `HeaderSticky.jsx:320-323` and `:375-378`.
- **Severity:** High
- **WCAG 2.2:** 2.1.1 Keyboard (A), 4.1.2 Name, Role, Value (A)
- **Why it matters:** keyboard-only and switch users cannot expose the submenu; assistive technology is not told that About controls expandable content or whether it is open.
- **Evidence:** the dropdown state is driven by `onMouseEnter`/`onMouseLeave`. In targeted Tab traversal, focus moved from About directly to Portfolio and submenu links were absent. There is no desktop toggle with `aria-expanded` and `aria-controls`.
- **Recommended fix:** implement About as a keyboard-operable disclosure button adjacent to a normal destination link, or an established accessible navigation-menu pattern. Support Enter/Space, Escape, focus entry/exit, outside click, and state relationships. Avoid ARIA `menu` roles unless full menu keyboard behavior is implemented.
- **Can be fixed in code:** Yes.
- **Manual testing required:** Yes, with keyboard and screen readers at desktop and sticky-header states.

### R-04 — Several custom controls are mouse-only and lack semantics/state

- **URL/page:** `/canada` and `/US` home; `/canada/csr` and `/US/csr`; `/canada/news` and `/US/news`; `/canada/reference`; `/C.A.-Portfolio` and `/U.S.-Portfolio`.
- **Exact element/component:** flip-card clickable `div` in `FlipCard.jsx`; Community tabs (`span`, `Communitytab.jsx:48,60`); News tabs (`p`, `Newstabs.jsx:26,37`); Reference tabs (`p`, `Referencepage.jsx:395`); portfolio `Reference List` clickable `div` (`Portfoliopagesliderv2.jsx:342`, US equivalent `:272`).
- **Severity:** High
- **WCAG 2.2:** 2.1.1 Keyboard (A), 1.3.1 Info and Relationships (A), 4.1.2 Name, Role, Value (A)
- **Why it matters:** these controls are omitted from sequential keyboard navigation or do not respond to keyboard activation; tab identity and selected state are not exposed.
- **Evidence:** source attaches click/hover handlers to non-focusable generic elements without equivalent keyboard handlers. Rendered keyboard traversal did not reach them. The tab interfaces lack `tablist`/`tab`/`tabpanel`, `aria-selected`, and panel relationships.
- **Recommended fix:** use native `button` elements. For tabs, follow the WAI-ARIA Tabs pattern with roving focus, arrow-key behavior, `aria-selected`, `aria-controls`, and labelled panels. For flip cards, avoid hover-only disclosure; use a disclosure button or keep all essential content visibly available.
- **Can be fixed in code:** Yes.
- **Manual testing required:** Yes, for keyboard conventions, announced state, and touch behavior.

### R-05 — Contact form fields have no persistent or programmatic labels

- **URL/page:** `/canada/contact`, `/US/contact`.
- **Exact element/component:** full name, phone, email, and message controls in `src/Components/Forms/ContactPageform/ContactPageform.jsx:36-71`; placeholders are the only field prompts.
- **Severity:** High
- **WCAG 2.2:** 1.3.1 Info and Relationships (A), 3.3.2 Labels or Instructions (A), 1.3.5 Identify Input Purpose (AA)
- **Why it matters:** placeholders disappear while typing, are not robust labels, and make review/error correction difficult. Users of assistive technology and autofill do not receive dependable purpose metadata.
- **Evidence:** rendered accessible-name inspection returned no labels for all four fields. Source has no associated `label`, `aria-label`, or `aria-labelledby`; name, phone, and email omit appropriate `autocomplete` tokens. Fields are `required`, but no persistent visible required-field instruction is shown.
- **Recommended fix:** add visible `<label for>` text and matching IDs, identify required fields in text and programmatically, use `autocomplete="name"`, `tel`, and `email`, and use `type="tel"` for phone. Keep placeholders as optional examples only.
- **Can be fixed in code/content:** Yes.
- **Manual testing required:** Yes, for screen-reader naming and browser/password-manager autofill.

### R-06 — Hidden/off-screen carousel content remains in the keyboard order

- **URL/page:** `/canada`, `/US`, `/canada/portfolio/the-spirit-garden`, and other pages using the same Swiper/card patterns.
- **Exact element/component:** Expertise carousel and Related Projects carousel links/cards.
- **Severity:** High
- **WCAG 2.2:** 2.4.3 Focus Order (A), 2.4.7 Focus Visible (AA)
- **Why it matters:** focus moves into controls a sighted keyboard user cannot see, making the current position and next action unclear.
- **Evidence:** home-page traversal visited all ten expertise-card controls, including off-screen slides. The sampled project page exposed all 31 related-project links with `tabIndex=0`; geometry confirmed that links far outside the visible carousel remained focusable and slides were not `aria-hidden` or `inert`.
- **Recommended fix:** remove inactive slides from the accessibility and tab order using the carousel library's accessibility support or managed `inert`/`aria-hidden`; expose only visible controls; on slide changes, synchronize state without unexpectedly moving focus. Add a correctly named carousel region and slide position information.
- **Can be fixed in code:** Yes.
- **Manual testing required:** Yes, at each breakpoint and with screen readers.

### R-07 — Long-running video, carousel, and marquee motion cannot be paused

- **URL/page:** `/`, `/canada`, `/US`, home sections, project details, and Awards.
- **Exact element/component:** region-selector background video (`RegionModal.jsx:93-95`); looping hero videos (`Herosection1.jsx:103-107` and US equivalent); autoplay Swipers (`ExpertiseSection.jsx:329-334`, `Portfoliodetailslider.jsx:48-52`, `HomeSlider1.jsx:31-32`); infinite certification marquee in `Industrylist.jsx`.
- **Severity:** High
- **WCAG 2.2:** 2.2.2 Pause, Stop, Hide (A)
- **Why it matters:** persistent motion can interfere with reading and can trigger vestibular or attention-related symptoms. A mute control does not pause visual motion.
- **Evidence:** inspected videos loop for approximately 36–51 seconds and have no pause control. Carousels advance every 4–5 seconds, and the certification list loops continuously. Hover pausing is not an available, persistent mechanism for keyboard, touch, or screen-reader users.
- **Recommended fix:** provide an obvious Pause/Play control that controls every moving region and retains state; pause on keyboard focus where appropriate; stop automatic movement after user interaction; honor `prefers-reduced-motion: reduce` by disabling nonessential autoplay and transitions.
- **Can be fixed in code/design:** Yes.
- **Manual testing required:** Yes, including OS reduced-motion settings and cognitive/vestibular review.

### R-08 — Some focused form controls have no visible focus indicator

- **URL/page:** `/canada` and `/US` contact section; `/canada/careers` and career detail application form.
- **Exact element/component:** home/contact-section inputs styled with `focus:outline-none` (`src/Components/Forms/HomePageform/HomePageform.jsx:26`); visually hidden resume inputs (`CareerApplicationForm.jsx:288-293` and `Careerpage.jsx:1022-1030`) whose custom labels have no `focus-within` treatment.
- **Severity:** High
- **WCAG 2.2:** 2.4.7 Focus Visible (AA)
- **Why it matters:** users cannot reliably see the current keyboard location, particularly on file upload.
- **Evidence:** focused home-form inputs retained no outline and no visible border/style change in keyboard inspection. Resume inputs receive keyboard focus while their custom visible upload label does not change appearance.
- **Recommended fix:** restore a high-contrast `:focus-visible` treatment for all native inputs; style upload wrappers with `:focus-within`; verify indicator visibility against every state and background.
- **Can be fixed in code:** Yes.
- **Manual testing required:** Yes, across browsers and forced-colors mode.

### R-09 — Some icon controls have no accessible name and one nests interactive elements

- **URL/page:** `/C.A.-Portfolio`, `/U.S.-Portfolio`, `/Static`.
- **Exact element/component:** portfolio next/down arrow buttons at `Portfoliopagesliderv2.jsx:404-427` and US equivalent `:334-357`; three Static-carousel indicator buttons at `StaticCarousel.jsx:149-152`; a `button` nested inside a React Router `Link` in each portfolio listing.
- **Severity:** Medium
- **WCAG 2.2:** 1.1.1 Non-text Content (A), 2.1.1 Keyboard (A), 4.1.2 Name, Role, Value (A)
- **Why it matters:** screen-reader users encounter unnamed “button” controls; nested commands create ambiguous focus/activation behavior.
- **Evidence:** rendered accessibility inspection found two unnamed arrow buttons on each portfolio listing and three unnamed indicator buttons on `/Static`. Their image alternatives are generic/misdirected (`alt="up"` on a down asset). Source nests a `button` inside a link.
- **Recommended fix:** make each action one native control only; give it a contextual label such as “Next portfolio project” or “Go to slide 2”; mark the icon `alt=""`/`aria-hidden="true"`; remove nested interactive markup and use a styled link or button according to behavior.
- **Can be fixed in code:** Yes.
- **Manual testing required:** A short screen-reader/keyboard confirmation is required.

### R-10 — Most routes reuse the same document title

- **URL/page:** all sampled repository routes except `/canada/careers/structural-steel-welder`.
- **Exact element/component:** fixed `<title>Mariani Metal - Fabricators Limited</title>` in `index.html`; routing in `App.jsx` does not generally update it.
- **Severity:** Medium
- **WCAG 2.2:** 2.4.2 Page Titled (A)
- **Why it matters:** tabs, browser history, bookmarks, and screen-reader page announcements do not identify the current page or region.
- **Evidence:** About, Portfolio, Contact, News, CSR, policies, home, region selector, and `/Static` all retained the same generic title. The career-detail route is a positive exception (`Structural Steel Welder | Mariani Careers`).
- **Recommended fix:** set unique, concise route metadata such as `Contact | Mariani Metal Canada`; update it synchronously on route changes; include region only when it distinguishes content.
- **Can be fixed in code/content:** Yes.
- **Manual testing required:** Content review only; technical behavior can be automated.

### R-11 — Verified solid-color text combinations fail minimum contrast

- **URL/page:** shared header/footer, CSR, News, Careers, and Contact.
- **Exact element/component:** inactive header link `#939598` on white; inactive CSR tab `#C2C2C2` on `#F9F9F9`; inactive News tab `#BFBFBF` on white; footer label `#7B8387` on white; career placeholder `#8C9295` on white; career helper `#727A7E` on `#F6F8F9`; Contact placeholder white at 50% opacity on `#00688F`.
- **Severity:** Medium
- **WCAG 2.2:** 1.4.3 Contrast (Minimum) (AA)
- **Why it matters:** essential labels, categories, and instructions are difficult to perceive for low-vision users.
- **Evidence:** calculated ratios are approximately **3.00:1**, **1.69:1**, **1.84:1**, **3.86:1**, **3.15:1**, **4.11:1**, and **2.75:1**, respectively. These are normal-sized text and require 4.5:1; the approximately 26px CSR text still requires at least 3:1 and fails.
- **Recommended fix:** replace low-contrast gray tokens with values meeting 4.5:1 for normal text; do not depend on placeholder opacity; test disabled and inactive visual styling without making available controls look unavailable.
- **Can be fixed in code/design tokens:** Yes.
- **Manual testing required:** Yes for text over photographs, videos, gradients, translucent layers, and hover/focus states.

### R-12 — Carousel pagination targets are too small and too closely spaced

- **URL/page:** `/canada`, `/US`, and sampled portfolio details.
- **Exact element/component:** clickable Swiper bullets and project gallery indicators.
- **Severity:** Medium
- **WCAG 2.2:** 2.5.8 Target Size (Minimum) (AA)
- **Why it matters:** users with motor impairments, tremor, or touch imprecision are more likely to activate the wrong target.
- **Evidence:** home bullets render about 8×8px with centers about 16px apart. Project gallery indicators render about 11×3px (22×3px active), with centers about 19px apart. They neither reach 24×24 CSS pixels nor satisfy the spacing exception.
- **Recommended fix:** give every dot a minimum 24×24 interactive hit area while retaining the small visual mark inside; increase spacing; keep labels such as “Go to slide 3 of 15.”
- **Can be fixed in code/CSS:** Yes.
- **Manual testing required:** Yes, on real touch devices and at responsive breakpoints.

### R-13 — Image alternatives are generic, redundant, or describe UI direction rather than purpose

- **URL/page:** News, Awards, portfolio listing/details, banners, and region selector.
- **Exact element/component:** examples include `alt="blog image"` (`Newslist.jsx:9`), `alt="img"` (`Newslatest.jsx:10`), repeated `alt="award"`, repeated `alt="certification logo"`, portfolio `alt="location"`, control icon `alt="up"`, and banner `alt="banner"`; the region selector repeats `alt="Mariani Metal"` for adjacent brand imagery.
- **Severity:** Medium
- **WCAG 2.2:** 1.1.1 Non-text Content (A)
- **Why it matters:** generic alternatives do not convey equivalent information; redundant alternatives add noise; an icon's direction is not the control's purpose.
- **Evidence:** the quoted values occur directly in source and repeat across distinct images. Conversely, sampled images did have an `alt` attribute, so this is an alternative-quality issue, not a fabricated “missing alt” count.
- **Recommended fix:** use concise subject/purpose text when an image conveys information; use the organization/certification/award name where material; use `alt=""` for decorative and duplicated imagery; put control purpose on the button/link name and hide its icon from the accessibility tree.
- **Can be fixed in code/content/CMS:** Yes.
- **Manual testing required:** Yes—content owners must decide which project and award images are informative.

## B. Potential issues requiring manual testing

These are not counted as confirmed failures without the stated human test.

| Potential issue | Pages/components | Possible WCAG 2.2 criteria | Evidence and required test | Likely fix if confirmed |
|---|---|---|---|---|
| Captions, audio description, and transcript adequacy | Repository hero/background videos and linked promotional media; public `Video` route is 404 | 1.2.2, 1.2.3, 1.2.5 | Repository videos have no `<track>` and only a mute control, but the audit did not editorially verify whether speech, meaningful sound, or visual-only information is present. Watch each asset with audio off and video off; inspect all restored live media. | Author synchronized captions, descriptive transcript, and audio description/alternative where the content requires them; use an accessible player. |
| Flashing or rapid luminance changes | All videos and animated transitions | 2.3.1 | Source/DOM inspection cannot establish flash thresholds. Analyze the actual media frames and transitions. | Re-edit offending sequences or replace the asset. |
| Reduced-motion experience beyond mandatory pause controls | Framer Motion route/scroll effects, smooth scrolling, Swipers, marquee | 2.3.3 Animation from Interactions (AAA), plus usability | No `prefers-reduced-motion` implementation was found. Most nonessential scroll and page-transition motion is not automatically an AA failure, while the recurring auto-motion in R-07 is. Test the OS setting and keyboard/touch interaction. | Add a global reduced-motion policy and component-level fallbacks. |
| Focus obscured by sticky headers/overlays | Shared sticky header, mobile navigation, cookie/third-party UI if deployed | 2.4.11 Focus Not Obscured (Minimum) (AA) | Focus must be followed through every state and viewport. The public carousel also placed a later project focus target at/off the right edge. | Use `scroll-margin`, correct stacking, managed focus, and inactive-slide removal. |
| Mobile menu focus lifecycle | `MobileHeader.jsx` | 2.1.2 No Keyboard Trap, 2.4.3 Focus Order, 2.4.11, 4.1.2 | The open/toggle buttons expose `aria-expanded`, but Escape, initial focus, focus containment/return, background interaction, and screen-reader state require device/AT testing. | Implement a disclosure-navigation pattern or dialog-like behavior only if it truly acts as a modal. |
| Screen-reader reading order and dynamic announcements | Tabs, carousels, flip cards, route changes, form submission | 1.3.2, 4.1.3 | Code findings indicate risk, but NVDA/JAWS/VoiceOver testing was not performed in this audit. SPA route changes also need announcement/focus verification. | Correct DOM order/state, add deliberate route focus/announcement, and avoid noisy live regions. |
| Contrast over imagery/video and non-text control contrast | Hero text, project cards, image overlays, arrows, input borders, focus indicators | 1.4.3, 1.4.11 | Automated contrast against a single computed background is unreliable for moving/video/photo backgrounds. Check darkest/lightest frames and all states. | Add stable scrims or solid backgrounds; strengthen borders/icons/focus tokens. |
| 200%/400% zoom, text spacing, orientation, and browser matrix | All restored production routes and repository templates | 1.4.4, 1.4.10, 1.4.12, 1.3.4 | Narrow-width geometry was sampled, but full zoom/text-spacing/orientation completion tests were not. `overflow-x:hidden` can conceal rather than resolve overflow. | Remove fixed heights/clipping, allow wrapping, and avoid hidden overflow as a reflow strategy. |
| Touch gestures and target spacing beyond measured dots | Mobile menus, horizontal tabs, cards, map, sliders | 2.5.1, 2.5.2, 2.5.7, 2.5.8 | Real touch and pointer-cancellation/drag alternatives were not exhaustively tested. | Provide single-pointer alternatives, cancellation, and minimum hit areas. |
| Turnstile accessibility and accessible authentication | Career forms | 3.3.8 Accessible Authentication (Minimum) (AA), 2.1.1, 4.1.2 | The widget did not render locally without a valid site key. Test its accessible challenge, keyboard order, timeout, errors, and alternatives in production. | Configure the documented accessible mode/alternative and ensure server-side fallback/support. |
| Error prevention and server-response behavior | Contact and application forms | 3.3.1–3.3.4, 4.1.3 | Native constraints and client status were reviewed; the real endpoint, email/service failure, duplicate submission, and data persistence were not. | Add a linked summary, field errors, success status, retry behavior, and preservation of user data. |
| Career error association and focus recovery | Career resume upload and Turnstile states | 3.3.1, 3.3.3, 4.1.3 | The code provides specific text such as “smaller than 10 MB” and announces a shared `role="status"`, which are positives. Custom invalid states are not associated to controls with `aria-invalid`/`aria-describedby`, and focus is not moved. Test whether each error is understood and efficiently located with screen readers. | If the test exposes ambiguity, add field errors, programmatic invalid state, descriptions, and a linked/focused error summary. |
| Information conveyed only by color | Active tabs, selected carousel dots, form error/success states | 1.4.1 | Some active states also change shape/position, but all state combinations require visual and screen-reader review. | Add text/icon/weight/underline and programmatic state, not color alone. |

## C. Implementations that are already correct or directionally strong

The audit does not treat correct implementation as a defect:

- The repository sets `lang="en"` and includes a responsive viewport declaration. The public home sets `lang="en-US"` and has a meaningful home-page title.
- The repository footer uses semantic `footer` and `nav` elements. The public home also has a native `nav`, and its older Superfish About submenu did become reachable after keyboard focus, even though state and focus styling still need remediation.
- Repository mobile menu buttons are native buttons and expose `aria-label`, `aria-expanded`, and `aria-controls` for the main disclosure and submenu.
- Career listing/detail templates have the best document outlines sampled: one `h1`, logical `h2`/`h3` structure, and `main`. The career-detail route sets a page-specific title.
- Home inquiry and career application controls generally have visible labels and useful autocomplete tokens. Career fields use native `required`; application status uses `role="status"`.
- Decorative imagery is often correctly implemented with `alt=""` and/or `aria-hidden="true"`; sampled repository pages did not show images completely missing an `alt` attribute.
- Many icon SVGs are hidden from the accessibility tree while their parent link/button has a text name. Social links are named.
- Sampled repository pages had no duplicate IDs and no visible `aria-controls` references pointing to missing IDs.
- Text-heavy repository pages reflowed to the sampled 320px viewport without document-level horizontal scrolling. Reference tabs intentionally use a horizontal scroll container; this is preferable to clipped content, though their control semantics still need fixing.
- The accessible-name/contrast spot checks found important passing combinations: `#00688F` on white is approximately 6.22:1, white on `#00688F` is approximately 6.22:1, and `#00688F` on `#EEF3F9` is approximately 5.57:1.
- Some carousel arrow controls in newer components already have contextual labels such as “Previous Slide” and “Next Slide.”
- No keyboard trap was found in the specific closed/open states tested. That is not a substitute for the broader manual tests in section B.

## D. Items that cannot be verified automatically or were unavailable

- **Full assistive-technology compatibility:** NVDA/JAWS with Chrome/Edge, VoiceOver with Safari/iOS, TalkBack with Android, voice control, switch control, and magnification workflows.
- **Human meaning:** whether every alt text is equivalent, a heading is helpful, link wording is clear in context, instructions are cognitively understandable, or reading order matches intent.
- **Media equivalence:** caption accuracy/timing, speaker identification, audio descriptions, transcripts, and seizure thresholds.
- **Live forms and media:** public Contact, Video, Media, About, Privacy, and project routes returned 404 and could not be audited as pages.
- **Third parties:** production Turnstile, analytics/consent UI, embedded maps, or other code injected only with production keys/consent.
- **PDFs/documents:** no downloadable PDF, Word, or similar document was identified in the repository or reachable public crawl. This is not proof that none exists in a CMS or private route. Any future document needs its own tagged-structure, reading-order, text-alternative, form, language, title, and keyboard review.
- **Complete device/browser coverage:** only representative desktop and narrow Chromium conditions were rendered. Safari/iOS behavior and real touch hardware remain unverified.
- **Legal scope:** employee count, federally regulated status, whether the service is a public accommodation, contractual obligations, province/state reach, exemptions, and remedies require qualified legal advice.

## WCAG 2.2 coverage summary

Significant confirmed findings map to these WCAG 2.2 criteria:

| Principle | Confirmed criteria implicated | Main findings |
|---|---|---|
| Perceivable | 1.1.1, 1.3.1, 1.4.3, 1.4.4, 1.4.10 | Wrong/generic alternatives, missing landmarks/headings/labels, contrast, public mobile scaling/reflow |
| Operable | 2.1.1, 2.2.2, 2.4.1, 2.4.2, 2.4.3, 2.4.7, 2.5.8 | Pointer-only controls, unpausable motion, no bypass, generic titles, off-screen focus, invisible focus, small dots |
| Understandable | 3.3.2 | Missing persistent Contact form labels/instructions |
| Robust | 4.1.2 | Unnamed controls, missing custom-control role/state, nested interactive markup |

This is not a statement that unlisted criteria pass. Some are not applicable to sampled content; others require the manual checks above.

## U.S. ADA-related accessibility considerations

Technical WCAG conformance and ADA analysis are different questions.

- The U.S. Department of Justice states that the ADA applies to state/local government services (Title II) and to goods/services offered by businesses open to the public (Title III), including on the web. DOJ's current [web accessibility guidance](https://www.ada.gov/resources/web-guidance/) also says that, for businesses, there is no regulation setting a detailed web technical standard and identifies WCAG as helpful technical guidance.
- The specific DOJ web rule requiring WCAG 2.1 AA is a **Title II** rule for state and local governments; it should not be presented as a regulation directly governing this private Mariani site without a separate legal basis. See the [DOJ Title II web rule guidance](https://www.ada.gov/resources/2024-03-08-web-rule/).
- Whether Mariani or a particular web function is covered by Title III, another federal/state law, a contract, or procurement rule is a legal applicability question. This report makes no conclusion on it.
- Regardless of legal scope, the confirmed keyboard, form, low-vision, mobile, and screen-reader barriers are concrete evidence of unequal technical access and should be remediated.

Do not describe the site as “ADA compliant” merely because a scanner passes, a widget is installed, or an accessibility statement exists. Those facts do not test equal access in real tasks and are not legal determinations.

## Canadian accessibility considerations

- Ontario's official guidance says designated public-sector organizations and Ontario businesses/nonprofits with 50 or more employees must make covered public websites and web content conform to WCAG 2.0 AA, with stated exceptions for live captions and prerecorded audio description. See [Ontario: How to make websites accessible](https://www.ontario.ca/page/how-make-websites-accessible) and [Integrated Accessibility Standards, O. Reg. 191/11](https://www.ontario.ca/laws/regulation/110191). Employee count, content dates, control over content, and exemptions were not established here, so applicability is not concluded.
- The repository's AODA page or any accessibility statement is not evidence that the rendered site meets the technical requirements. The Level A/AA failures in this report need to be reconciled with any public conformance wording.
- The federal Accessible Canada Act is aimed at federally regulated entities. The Government of Canada's [summary of the Act](https://www.canada.ca/en/employment-social-development/programs/accessible-canada/act-summary.html) lists sectors such as federal government, banking, interprovincial transport, telecommunications, and broadcasting. This audit does not determine whether Mariani falls within federal jurisdiction.
- WCAG 2.2 AA is the recommended engineering target even where a specific rule references WCAG 2.0 or 2.1: it preserves the earlier A/AA requirements and adds relevant current criteria such as Focus Not Obscured (2.4.11) and Target Size (Minimum) (2.5.8). The legal baseline and effective dates should be confirmed separately.

## Top 10 remediation priorities

1. **Fix production routing/deployment.** Restore every primary and project destination, then audit the actual authoritative build.
2. **Create a semantic shared shell.** Add skip link, `header`, named navigation, exactly one `main`, and `footer` to all templates.
3. **Replace pointer-only controls.** Convert dropdowns, tabs, flip cards, Reference List, and other clickable generic elements to native, keyboard-complete controls.
4. **Make focus consistently visible.** Add global `:focus-visible`, upload `:focus-within`, and verify sticky/overlay visibility.
5. **Repair forms.** Add Contact labels/autocomplete/required instructions and associate all validation errors with fields.
6. **Normalize headings and titles.** One meaningful `h1` per page, logical nesting, and a unique route title.
7. **Make carousels accessible.** Keep inactive slides out of the accessibility/tab order, label controls/slides, and provide persistent Pause/Play.
8. **Remove unpausable automatic motion.** Include video and marquee controls and reduced-motion behavior.
9. **Fix the color tokens and mobile target sizes.** Meet 4.5:1 for normal text and 24×24 CSS-pixel target/spacing rules.
10. **Complete editorial/AT validation.** Rewrite image alternatives, caption/describe media where needed, and test real tasks with screen readers, keyboard, zoom, touch, and disabled users.

## Quick fixes suitable for immediate implementation

- Add the public viewport meta tag.
- Correct `alt="Model agency Vogue"` and replace generic control-icon alternatives.
- Add a global, high-contrast `:focus-visible` rule and `focus-within` styling for file upload.
- Add the shared skip link and `main` wrapper.
- Change obvious clickable `span`/`p`/`div` controls to `button` elements.
- Add labels, IDs, autocomplete tokens, and persistent required instructions to Contact.
- Add `aria-label` to Static pagination and portfolio arrow buttons; remove nested link/button markup.
- Set a title for each route.
- Darken the verified failing gray tokens and remove low-opacity placeholder styling.
- Increase carousel hit areas to at least 24×24 CSS pixels.
- Stop autoplay when reduced motion is requested while the full Pause/Play design is implemented.
- Add automated broken-link and accessibility checks to CI, while retaining manual release testing.

## Changes requiring design or content decisions

- Approve a page/section heading model and rewrite headings that are currently purely visual spans.
- Choose accessible inactive, hover, focus, error, and overlay color tokens.
- Decide whether flip cards should disclose, navigate, or simply show content; avoid a hover-only content model.
- Define a site-wide motion policy and visible Pause/Play treatment.
- Author accurate alternatives for awards, certifications, news, projects, and brand imagery.
- Decide which media is informative and budget for captions, transcripts, and audio description.
- Rewrite validation/help text and create a clear error-summary pattern.
- Update the public accessibility/AODA statement to identify a target, test environment, known limitations, and contact route without overstating conformance.

## Deeper manual testing required before a conformance claim

1. Complete every primary task using only keyboard, then switch control and voice control.
2. Run NVDA + Chrome/Firefox, JAWS + Edge/Chrome, VoiceOver + Safari/iOS, and TalkBack + Chrome.
3. Test SPA route announcements, focus placement, all disclosure/tab/carousel states, and dynamic form messages.
4. Test at 200% and 400% browser zoom, 320 CSS-pixel reflow, text-spacing overrides, portrait/landscape, and browser text-only zoom.
5. Test forced-colors/high-contrast, dark/color-inversion settings, and all photo/video frames behind text.
6. Review media for captions, transcript, audio description, player controls, sound autoplay, and flash thresholds.
7. Test Contact/application server success and every failure state, file restrictions, timeouts, and Turnstile alternatives.
8. Test all controls on real touch devices, including dragging alternatives, cancellation, and target spacing.
9. Audit any third-party or CMS-injected content and every future PDF/document.
10. Include task-based testing by people with disabilities; automated and expert inspection cannot substitute for lived-use feedback.

## Would an AudioEye-style widget solve these findings?

**It could supplement the program, but it would not solve this audit by installation alone.** AudioEye's own current platform description says its monitoring and automated fixes handle many common issues while some WCAG requirements cannot be reliably tested with automation alone. Its help desk/personalization tools can also give users visual preferences and an issue-reporting channel. See [AudioEye's automated accessibility platform description](https://www.audioeye.com/solution/automated-accessibility-platform/) and [AudioEye Help Desk documentation](https://help.audioeye.com/the-audioeye-accessibility-help-desk).

Potentially useful contributions include continuous detection of some machine-testable regressions, selected runtime remediations, user personalization controls, issue reporting, and expert-service workflow if those services are purchased and actively managed.

It would **not by itself**:

- restore the public site's broken routes or decide which deployment is authoritative;
- create a coherent source-level heading/landmark architecture;
- redesign pointer-only interactions and implement correct keyboard/focus behavior;
- guarantee that hidden carousel slides leave the focus/accessibility order;
- write truthful, context-specific alternatives or decide whether imagery is decorative;
- produce and editorially verify captions, transcripts, and audio descriptions;
- validate real form error recovery, Turnstile, server behavior, or mobile reflow;
- choose acceptable brand/design colors or motion behavior;
- complete screen-reader, zoom, touch, cognitive, and disabled-user testing;
- establish WCAG conformance or legal ADA/AODA/ACA compliance.

Use any widget/platform as monitoring and support around source remediation, not as a replacement for it. Prefer fixes in this repository because they remain present before third-party JavaScript loads, are testable in CI, and are less likely to diverge across routes or states.

## Recommended verification gates

- Add linting that passes, an HTML/React accessibility linter, automated browser accessibility rules, and a broken-link crawler to pull-request and deployment pipelines.
- Add keyboard-focused component tests for the desktop disclosure, mobile navigation, tabs, carousel visibility/focus, file upload, and validation summary.
- Add route assertions for one `main`, one page `h1`, unique title, language, named controls, and no focusable descendants inside inactive slides.
- Keep a manual WCAG 2.2 AA checklist and assistive-technology test matrix for release sign-off.
- Retest the production URL after deployment; a local candidate passing does not prove the deployed site passes.

## Concise CEO-ready summary

> The current public Mariani website has material accessibility and general usability barriers: most navigation destinations return 404, the home page does not reflow correctly on mobile, keyboard focus is invisible, and the page lacks a main landmark, skip link, and meaningful top-level heading. The replacement repository is a stronger base, but it still contains Level A failures in keyboard operation, semantics, names, and form labelling, plus Level AA failures in focus visibility, contrast, motion control, page titles, and target sizing. Based on the tested state, neither build currently conforms to WCAG 2.2 A or AA as a complete site. This is a technical assessment, not a legal conclusion. The recommended approach is to fix the production deployment, remediate the shared source components, add automated regression gates, and complete manual keyboard, screen-reader, zoom, mobile, media, and form testing. An accessibility widget may add monitoring and user tools, but it cannot replace these source fixes or prove ADA/AODA compliance.

## Authoritative references

- [W3C Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C: What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [W3C carousel accessibility tutorial](https://www.w3.org/WAI/tutorials/carousels/)
- [U.S. DOJ: Guidance on Web Accessibility and the ADA](https://www.ada.gov/resources/web-guidance/)
- [U.S. DOJ: Title II web and mobile accessibility rule](https://www.ada.gov/resources/2024-03-08-web-rule/)
- [Ontario: How to make websites accessible](https://www.ontario.ca/page/how-make-websites-accessible)
- [Ontario Integrated Accessibility Standards, O. Reg. 191/11](https://www.ontario.ca/laws/regulation/110191)
- [Government of Canada: Summary of the Accessible Canada Act](https://www.canada.ca/en/employment-social-development/programs/accessible-canada/act-summary.html)
