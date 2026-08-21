# Mariani accessibility remediation report

**Completed:** 19 August 2026  
**Scope:** the five requested remediation areas in the React/Vite repository  
**Technical reference:** WCAG 2.2  

This report describes technical changes and verification. It is not a legal compliance opinion and does not claim that the site is “ADA compliant,” AODA compliant, or fully WCAG conformant.

## Changes made

### Routing, titles, and skip navigation

- `index.html` — replaced the generic fallback title with `Mariani Metal | Architectural Metal & Glass Fabrication`.
- `src/App.jsx` — added a centralized, route-aware document-title controller for region selection, home, portfolio, About, Awards, CSR, News, Contact, Careers, Reference, policy, AODA, and Static routes. Detail pages retain content-specific titles. Added the global skip link before routed page content.
- `src/App.css` — added the visually hidden-until-focused skip-link positioning. It transitions into the viewport on `:focus`/`:focus-visible`.
- `src/Components/SkipLink/SkipLink.jsx` — added the native `Skip to main content` anchor, targeting `#main-content`, with high-contrast focused styling.

### Video behavior

- `src/Components/Homecomponents/Herosection1/AccessibleHeroVideo.jsx` — added the shared accessible hero-video implementation. Automatic playback is always muted; sound is enabled only after an explicit user action; Pause/Play and Mute/Sound controls are native named buttons; control state follows video events; off-screen video pauses; and `prefers-reduced-motion: reduce` prevents automatic playback.
- `src/Components/Homecomponents/Herosection1/Herosection1.jsx` — replaced duplicated Canada video logic with the shared video component while retaining the Canada asset and existing hero layout.
- `src/Components/Homecomponents/Herosection1/USHerosection1.jsx` — replaced duplicated U.S. video logic with the shared video component while retaining the U.S. asset and existing hero layout.
- `src/Components/RegionSelector/RegionModal.jsx` — kept the background video muted, marked it decorative, added a compact named Pause/Play button, and disabled automatic playback when reduced motion is requested. Converted the full-screen selector to the page `main`, made the visible logo the H1, and removed inappropriate heading semantics from the slogan and region links.

### Reusable heading components

- `src/Components/Headings/Singleheading/SingleHeading.jsx` — replaced the visual-only `span` with a semantic heading and added an `as` prop so pages can choose H1 while section usage defaults to H2.
- `src/Components/Headings/Leftheadingtop/Leftheadingtop.jsx` — made the visible title a configurable semantic heading (H2 by default) and its descriptive copy a paragraph.
- `src/Components/Headings/Leftheadingtop/Leftheadingright.jsx` — made the visible title a configurable semantic heading and its descriptive copy a paragraph.
- `src/Components/Headings/Leftheadingtop/Rightheadingleft.jsx` — made the visible title a configurable semantic heading and its descriptive copy a paragraph.
- `src/Components/Headings/Centerheading/Centerheading.jsx` — retained the original Framer Motion behavior while making the visible section title a configurable semantic heading.

### Home and Static content hierarchy

- `src/Pages/Homepage/Homepage.jsx` — wrapped Canada home content in `main#main-content` without moving the header or footer.
- `src/Pages/USHome/USHomepage.jsx` — wrapped U.S. home content in `main#main-content`.
- `src/Pages/StaticPage/StaticPage.jsx` — added the main target and configured its first content heading as the page H1, with subsequent shared content starting at H2.
- `src/Components/Homecomponents/Stepssection/Stepsectionnew.jsx` — retained the visible “Comprehensive Fabrication & Architectural Solutions” text as the home H1; allowed Static usage to render it as H2; changed its explanatory subheading to a paragraph.
- `src/Components/Homecomponents/FlipCard/FlipCard.jsx` — changed the section title from H1 to H2, its descriptive line to a paragraph, and card titles from skipped H4 headings to H3.
- `src/Components/Homecomponents/SectorsWeBuildFor/ExpertiseSection.jsx` — changed the section title from H1 to H2 and descriptive line to a paragraph. Synchronized `aria-hidden` with the two visual card faces so only the currently displayed duplicate title is exposed to assistive technology.
- `src/Components/Homecomponents/Herosection2/Herosection2.jsx` — changed “Precision in Practice” from a duplicate page H1 to H2 and “Featured Projects” to descriptive paragraph text.
- `src/Components/Homecomponents/Herosection2/Herosection3.jsx` — applied the same hierarchy correction to the U.S. version.
- `src/Components/Homecomponents/StaticPageBanner/StaticCarousel.jsx` — made the active visible carousel headline the Static page H1.

### Portfolio, About, News, Awards, CSR, Contact, Careers, and policy pages

- `src/Pages/Portfoliopage/Portfoliopage.jsx` — added `main#main-content`; made “Landmark Projects” the Canada portfolio H1; retained the descriptive section as H2.
- `src/Pages/Portfoliopage/USPortfoliopage.jsx` — added the same semantic structure for the U.S. portfolio.
- `src/Pages/Portfoliodetails/Portfoliodetails.jsx` — added the main target, made the project name H1, added content-specific project titles, and made the not-found state use a main/H1 and meaningful title.
- `src/Pages/Portfoliopage/Referencepage/Referencepage.jsx` — converted the existing two-line visible title into one H1, converted the active country heading to H2, and made the animated content wrapper the main target.
- `src/Pages/Legacypage/Legacypage.jsx` — added the main target, converted the existing visible “The Legacy of Mariani” text to H1, changed invalid paragraph nesting to neutral containers, and retained subsequent sections as H2.
- `src/Pages/Newspage/Newspage.jsx` — added the main target, made “News & Insights” H1, and “Featured Articles” H2.
- `src/Components/NewsComponent/Newssection/Newssection.jsx` — made “Latest” an H3 under the page’s Featured Articles section.
- `src/Components/NewsComponent/Newslist/Newslist.jsx` — made primary article titles H3.
- `src/Components/NewsComponent/Newslatest/Newslatest.jsx` — made article titles in the nested Latest list H4.
- `src/Components/NewsComponent/Newstabs/Newstabs.jsx` — made titles in the nested categorized list H4.
- `src/Pages/Awardspage/Awardspage.jsx` — added the main target and made “Awards & Recognitions” H1.
- `src/Components/Legacycomponents/Awardcomponent/Awardlist.jsx` — made each parallel award title H2.
- `src/Components/Legacycomponents/Awardcomponent/Industrylist/Industrylist.jsx` — made “Industry Certifications” H2.
- `src/Components/Legacycomponents/Awardcomponent/Professionalsection/Professionalsection.jsx` — made “Professional Affiliations” H2 and each affiliation title H3.
- `src/Pages/Csrpage/Csrpage.jsx` — added the main target; made “CSR & Sustainability” H1; made the introduction, Education & Scholarship, and Community Engagement headings H2.
- `src/Components/Legacycomponents/Csrcomponent/Educationtab/Educationtab.jsx` — made the displayed education item title H3.
- `src/Components/Legacycomponents/Csrcomponent/Communitytab/Communitytab.jsx` — made the displayed community item title H3.
- `src/Pages/Contactpage/Contactpage.jsx` — added the main target, converted the visible “Contact Us” text to H1, and “Speak with Us” to H2.
- `src/Pages/Careerpage/Careerpage.jsx` — added the shared main-content ID and focus target to its existing semantic main.
- `src/Pages/Careerpage/CareerDetailpage.jsx` — added the shared main-content ID and focus target to its existing semantic main; retained its content-specific career title.
- `src/Pages/Policies/PrivacyPolicy.jsx` — converted the existing content wrapper to `main#main-content`; retained its existing H1/H2 structure.
- `src/Pages/Policies/TermsConditions.jsx` — added the same main target while retaining its existing heading structure.
- `src/Pages/Policies/PoliciesPage.jsx` — added the same main target while retaining its H1/H2/H3/H4 structure.
- `src/Pages/Policies/AodaCompliance.jsx` — added the same main target while retaining its existing heading structure.

### Report artifact

- `ACCESSIBILITY_REMEDIATION_REPORT.md` — documents the implementation, verification, unresolved issues, and manual-test boundaries. The earlier `ACCESSIBILITY_AUDIT.md` was preserved and was not edited during this remediation.

## Accessibility result

### 1. HTML page titles — Fixed

- **Change:** centralized unique titles for static routes and content-specific titles for project/career details.
- **Why accessible:** browser tabs, history, bookmarks, and screen-reader page announcements now identify the page and region.
- **WCAG 2.2:** 2.4.2 Page Titled (A).
- **Verification:** 17 rendered representative routes returned the expected distinct title, including the region selector, home, portfolio listing/detail, About, Awards, CSR, News, Contact, Careers/detail, Reference, policy pages, AODA, and Static.

### 2. Video control/autoplay — Fixed technically; media content requires manual review

- **Change:** all three MP4 assets were found to contain both video and audio tracks. Automatic playback now starts muted. Home heroes have native named Pause/Play and Mute/Sound controls. The region background remains muted and has Pause/Play. Reduced-motion mode prevents automatic playback.
- **Why accessible:** audio no longer starts automatically; users can stop recurring visual movement; controls are keyboard-focusable and have state-specific accessible names; people requesting reduced motion receive a paused video.
- **WCAG 2.2:** 1.4.2 Audio Control (A), 2.1.1 Keyboard (A), 2.2.2 Pause, Stop, Hide (A); `prefers-reduced-motion` also improves support related to 2.3.3 Animation from Interactions (AAA).
- **Verification:** rendered hero started muted and playing; Pause changed the media to paused and the control to “Play background video”; Sound On changed `muted` to false and the label to “Mute background video”; reduced-motion emulation left the video paused and muted.
- **Still manual:** determine whether the audio contains meaningful speech/information requiring captions, transcript, or another media alternative under WCAG 1.2.x.

### 3. Primary skip link — Fixed

- **Change:** one global native skip anchor precedes routed content; each real page exposes exactly one `main#main-content` with `tabIndex={-1}`.
- **Why accessible:** the link is the first Tab stop, becomes visibly positioned at 16px from the top/left when focused, and moves focus to the main target.
- **WCAG 2.2:** 2.4.1 Bypass Blocks (A), 2.4.7 Focus Visible (AA).
- **Verification:** keyboard-event emulation produced `:focus-visible`; the link rendered fully in the viewport and activation set `#main-content` as the focused element.

### 4. Missing H1 — Fixed on implemented routes

- **Change:** existing visible primary titles/logos were converted to H1 instead of adding scanner-only hidden text.
- **Why accessible:** each sampled page exposes one visible, meaningful page-level heading while retaining the original typography and layout classes.
- **WCAG 2.2:** 1.3.1 Info and Relationships (A), 2.4.6 Headings and Labels (AA).
- **Verification:** all 17 sampled routes rendered exactly one H1.

### 5. Heading hierarchy — Fixed for the requested page/template structures

- **Change:** home’s subsequent H1s became H2; descriptions became paragraphs; card/item titles became H3/H4 where nested; reusable visual-heading spans became configurable native headings; page templates now follow H1 → H2 → H3/H4 according to content nesting.
- **Why accessible:** heading rank now expresses the existing content hierarchy rather than visual size, while existing CSS classes preserve the design.
- **WCAG 2.2:** 1.3.1 Info and Relationships (A), 2.4.6 Headings and Labels (AA).
- **Verification:** rendered heading outlines were inspected for the 17-route sample; no page lacked H1, no sampled page contained multiple page H1s, and the corrected content did not skip directly from H1 to H3/H4.

## Remaining accessibility issues outside this remediation scope

These were not introduced by the changes above and should not be interpreted as fixed:

- Desktop About submenu remains pointer-dependent and lacks a complete keyboard disclosure/state pattern.
- Flip cards, Community/News/Reference tabs, and the portfolio Reference List still include click-only generic elements.
- Contact-page form fields still rely on placeholders rather than persistent programmatic labels and autocomplete metadata.
- Inactive carousel slides remain focusable in some Swiper implementations; other carousels/marquees still autoplay independently of the three fixed videos.
- Some home and career form controls still suppress or fail to expose a visible focus indicator.
- Several solid-color text combinations remain below WCAG minimum contrast.
- Some carousel pagination targets remain below WCAG 2.2’s 24×24 CSS-pixel target/spacing requirement.
- Several image alternatives remain generic (`img`, `blog image`, `award`, `certification logo`, `location`, or direction-only icon text).
- Some icon-only portfolio/Static controls remain unnamed or use nested interactive markup.
- Career resume/CAPTCHA validation association and focus recovery still require remediation and production testing.
- `/Static` contains a CTA to `/infrastructure`, for which no route exists, and several News “Read More” controls do not currently navigate or perform an action.
- The full repository lint gate remains red because of existing unused-variable/import and hook-dependency findings.

Refer to `ACCESSIBILITY_AUDIT.md` for the broader evidence-based issue inventory and prioritization.

## Manual testing still required

- Complete keyboard-only traversal in Chrome, Edge, Firefox, and Safari, including Shift+Tab and sticky/mobile navigation states.
- Screen-reader validation with NVDA, JAWS, VoiceOver, and TalkBack for page-title announcements, landmark navigation, heading outline, skip-link landing, and video-control names/states.
- Listen to and watch every video to determine caption, transcript, audio-description, and flashing requirements.
- Verify the video controls with real keyboard and touch input; browser automation confirmed DOM/media state but is not a substitute for human interaction.
- Visual regression comparison at all supported breakpoints. Chromium geometry checks at desktop and 320px confirmed visible H1/main content and no changed-component overlap, but cannot approve every animation frame or device.
- Contrast over photos/video/gradients and focus indicators in forced-colors/high-contrast modes.
- Full 200%/400% zoom, text spacing, portrait/landscape, and real-device testing.
- Production form submission, validation, file upload, and Turnstile behavior.

## Final verification

- **Production build:** Passed with Vite; 2,424 modules transformed.
- **Rendered route checks:** 17/17 sampled routes had exactly one skip link, one `main#main-content`, one H1, and the expected title.
- **Keyboard skip link:** Passed in Chromium keyboard-event emulation; visible `:focus-visible` state and main-focus landing confirmed.
- **Video:** muted autoplay, Pause/Play, Sound/Mute state, and reduced-motion pause confirmed.
- **Runtime console:** no runtime exceptions or `console.error` events during the sampled rendered pass.
- **Narrow viewport:** representative home, portfolio, and Contact routes retained visible H1/main content at a 320px emulated viewport. Existing off-screen carousel slides remain a separate known issue.
- **Diff hygiene:** `git diff --check` passed; no whitespace errors.
- **Lint:** does not pass. Current result is 99 findings (88 errors, 11 warnings), compared with 101 findings (90 errors, 11 warnings) before remediation. The remaining findings are pre-existing repository quality issues; this work did not add a new lint failure.
- **Functionality/design:** existing route content, assets, classes, layouts, typography, and Framer Motion wrappers were retained. The intentional visible additions are the video Pause/Play control and the skip link while focused.

These fixes improve the named WCAG behaviors but do not establish full WCAG 2.2 conformance or legal compliance. The remaining source issues and manual tests must be completed before making a conformance claim.
