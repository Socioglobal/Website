# Socioglobal

Marketing site for Socioglobal, a B2B revenue and outbound agency in Canada
serving technology firms across North America.

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion. No CMS — all
copy lives as typed constants in [`content/site.ts`](content/site.ts).

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the GoHighLevel values
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit and delivery tests |

## GoHighLevel

Every form on the site — the pipeline calculator, the checklist, the tier
enquiries and the booking request — posts to `/api/lead`, which forwards to
GHL. Booking is handled by GHL's own calendar widget on `/book-a-call`.

All settings are environment variables; see [`.env.example`](.env.example) for
the annotated list.

### 1. Contacts — pick a transport (or use both)

**API v2 (preferred).** In the sub-account go to
*Settings → Private Integrations*, create a token with the scopes
`contacts.write`, `contacts.readonly` and `opportunities.write`, then set:

```
GHL_API_TOKEN=pit-...
GHL_LOCATION_ID=...
```

Contacts are **upserted by email**, so a repeat submission updates the existing
contact instead of creating a duplicate. Each lead also gets a note on the
contact containing the message and, for calculator leads, the full breakdown
the visitor saw.

**Inbound webhook.** Simpler, no token: add an *Inbound Webhook* trigger to a
GHL workflow and set `GHL_WEBHOOK_URL` to its URL. The workflow creates the
contact and decides what happens next.

Set both and both run.

### 2. Tags

Tags are how a workflow decides what to do, so each lead carries where it came
from and what it was looking at:

| Tag | Meaning |
| --- | --- |
| `website-lead` | On every lead from this site |
| `source-calculator` · `source-checklist` · `source-book-a-call` · `source-tier-enquiry` | Which form |
| `tier-pipeline-conversion` (etc.) | Tier CTA the visitor came from |
| `segment-msps-it-services` (etc.) | Segment CTA the visitor came from |
| `size-11-25-employees` (etc.) | Company size they selected |
| `used-pipeline-calculator` | They measured a non-zero revenue gap |

### 3. Custom fields (optional)

Custom field ids are specific to your location, so map our field names to your
ids as JSON. Ids are under *Settings → Custom Fields*.

```
GHL_CUSTOM_FIELD_MAP={"annualGap":"abc123","companySize":"def456"}
```

Mappable names: `companySize`, `outboundApproach`, `tier`, `segment`,
`avgDealValue`, `dealsPerMonth`, `targetDealsPerMonth`, `closeRatePercent`,
`monthlyGap`, `annualGap`, `meetingsNeeded`.

Anything you do not map is left out of the contact record — it still appears in
the contact note, so nothing is lost.

### 4. Opportunities (optional)

Set both to open an opportunity for every lead. Calculator leads carry their
annual revenue gap as the opportunity value.

```
GHL_PIPELINE_ID=...
GHL_PIPELINE_STAGE_ID=...
```

### 5. Booking calendar

```
NEXT_PUBLIC_GHL_CALENDAR_ID=...
```

The id is the last path segment of your calendar's booking link
(`link.msgsndr.com/widget/booking/<id>`). With it set, `/book-a-call` renders
the live GHL widget; without it the page shows a placeholder and the form still
works. Bookings made in the widget go straight into GHL — they do not pass
through `/api/lead`.

### Failure behaviour

Delivery is deliberately best-effort: a GHL outage is logged but never fails
the visitor's submission, and each transport is attempted independently. Watch
for `[ghl]` and `[lead]` lines in the server logs.

## Tests

```bash
npm test
```

Covers the calculator arithmetic, lead validation, the GHL payload mapping, and
the delivery layer end to end against a mock GHL server (upsert, note,
opportunity, webhook, and failure handling).

> The delivery layer has been verified against a mock server matching GHL's
> documented API v2 shapes, not against a live GoHighLevel account. Run one
> real submission after adding credentials and confirm the contact, its tags
> and its note appear as expected.

## Structure

```
app/                 routes, metadata, JSON-LD, sitemap, robots, OG image
  api/lead/          form handler
components/
  sections/          one file per homepage section
  ui/                shadcn-style primitives, icons, motion
content/site.ts      every piece of copy, typed
lib/
  calculator.ts      pipeline calculator arithmetic (pure, tested)
  lead.ts            lead shape, validation, normalisation
  ghl.ts             GoHighLevel delivery
  accents.ts         accent colour classes
tests/               node:test suites
```

## Design system

Colour, type and surface tokens are CSS variables in
[`app/globals.css`](app/globals.css), exposed through the Tailwind theme.

Two things to know before editing them:

1. Each colour has an `-rgb` channel twin, and the Tailwind theme is built on
   those. This is what makes opacity modifiers such as `bg-white/90` work — a
   plain hex in a custom property silently produces no utility at all.
2. The vivid accents (`--emerald`, `--coral`, `--amber`, `--violet`) fail WCAG
   AA as text, so each has an `-ink` twin used for anything set as type. Use
   the vivid value for fills, icons and borders; use `-ink` for text.
