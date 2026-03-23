# Phase 10 Verification Matrix

## Viewports
- `375px`: confirm navbar spacing, hero headline wrapping, service card fit, contact form stacking, footer collapse
- `768px`: confirm hero composition, section spacing, testimonials layout, contact two-column transition
- `1280px`: confirm hero headline scale, navbar alignment, section max widths, footer three-column layout

## Hero Sequence
- first frame is visible without a blank canvas flash
- fresh load at page top activates the hero lock and keeps the viewport pinned
- early scroll advances frames smoothly
- wheel, touch, and keyboard input all advance the locked hero sequence
- loading overlay clears after initial priority frames are available
- reaching the final frame unlocks body scroll and lands at the end of the hero track
- footer and navbar top-scroll links still target `#hero`
- navbar and footer links to lower sections release the hero lock before navigation

## Crawl / Metadata
- `/robots.txt` resolves and includes the sitemap line
- `/sitemap.xml` resolves and only lists crawlable pages
- root metadata includes canonical URL, description, Open Graph, and Twitter fields
- branded icon replaces the default starter favicon at runtime

## Regression Checks
- contact form still submits and validates correctly
- mobile menu still locks and restores body scroll correctly
- mobile menu does not clear a still-active hero body lock
- `About` image still loads without layout shift
- services, about, testimonials, FAQ, and contact anchors still scroll correctly
- scrolling back to the hero after completion does not replay-lock the page

## Manual Safari / Lighthouse Follow-up
- validate sticky hero and touch-scroll behavior on iOS Safari
- run Lighthouse against a local production build and target `90+` performance
