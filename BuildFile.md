# אפיון מערכת – בלוג **shirimedan** עם בקאנד עריכה

תת־אפליקציה תחת **myenter** — רצה כפרויקט **Vercel** נפרד ובעל **Google Cloud Project** ייעודי לבלוג (OAuth, Webhooks וכד'). הפריסה המועדפת: `blog.myenter.com`.

---

## 1) מטרות וערכי מוצר

* **מטרה עסקית**: פלטפורמת בלוג ליצירת, עריכת ופרסום תכנים של *shirimedan*, עם חוויית קריאה מהירה ונקייה, ויכולת סקיילינג עתידית.
* **מטרה טכנית**: סטאק מודרני, פריסה קלה ל‑Vercel, בקאנד עריכה בטוח וגמיש, וזרימת עבודה (Workflow) נוחה לעורכים.
* **הנחות יסוד**: הבלוג הוא תת־אפליקציה של myenter אך רץ **כפרויקט Vercel עצמאי** ובעל **Google Cloud Project ייעודי**. ברירת המחדל: `blog.myenter.com`. אפשרות חלופית בלבד: proxy ל־`/blog` מהאתר הראשי.

---

## 2) משתמשים ורולים

* **Owner/Admin**: ניהול מלא (הגדרות, משתמשים, הרשאות, תבניות, אינטגרציות).
* **Editor**: עריכה ופרסום של תכנים, ניהול מדיה, תגים וקטגוריות.
* **Author/Contributor**: יצירה ועריכה של טיוטות, בקשת אישור לפרסום.
* **Viewer**: קורא קצה (אורח), אין צורך בחשבון.

*תמיכה ב‑SSO/OAuth (Google) עבור Admin/Editor/Author.*

---

## 3) מודל תוכן (Content Model)

**Post**

* id/slug (אוטומטי או מותאם)
* title, subtitle (רשות)
* excerpt/summary (תקציר)
* body (Rich Text/MDX, בלוקים, קוד, הטמעות)
* coverImage (תמונת שער), gallery\[] (רשות)
* tags\[], categories\[]
* author (ייחוס ל‑User/Author)
* status: `draft` | `in_review` | `scheduled` | `published`
* publishedAt, updatedAt
* seo: title, description, canonicalUrl, noindex (רשות)
* social: OG image (אוטומטי/מותאם)
* relations: relatedPosts\[] (רשות)

**Page** (תוכן סטטי: אודות, צור קשר)

* slug, title, body, seo, publishedAt

**Media Asset**

* id, type (image/video/audio), alt, caption, credits, width/height, filesize, source (local/S3/Cloud), focalPoint

**Taxonomy**

* Tag: name, slug, description
* Category: name, slug, description, order

---

## 4) דרישות עריכה (Editor UX)

* עורך **Rich Text/MDX** עם בלוקים: כותרות, ציטוטים, קוד, טבלאות, גלריות, הטמעות (YouTube/Twitter/Spotify), ורכיבי React קלים (Callout, InfoBox).
* **תצוגה מקדימה חיה (Preview/Draft Mode)** לפני פרסום.
* **Versioning & History**: היסטוריית שינויים, השוואה, Rollback.
* **Draft → Review → Publish**: זרימת אישורים בסיסית (Editor מאשר).
* **תזמון (Scheduling)**: פרסום עתידי.
* **ניהול מדיה**: העלאה, חיתוך/מיקוד (focal point), Alt text חובה לנגישות.
* SEO מובנה: שדות כותרת/תיאור, הטמעת Open Graph, מפת אתר (sitemap) ורסס (RSS/Atom).
* **Autosave** ואף אפשרות **Collaborative editing** (רצוי, לא חובה ב‑MVP).

---

## 5) ארכיטקטורה מוצעת

### פרונט (Next.js 14/15, App Router) – רץ ב‑Vercel

* SSR לעמודים דינמיים, SSG/ISR לפוסטים.
* Revalidate on-demand באמצעות Webhooks מה‑CMS (פרסום/עדכון).
* תמיכה ב‑i18n (אופציונלי לפאזה 2).
* עיצוב TailwindCSS, תאימות כהה/בהיר, נגישות WCAG 2.1 AA.

### בקאנד עריכה (Headless CMS)

בחר אחת מהחלופות — **המלצה: A כברירת מחדל**

**A) Sanity** (מנוהל, סטודיו משולב/נפרד)

* יתרונות: מהיר להתחלה, סטודיו עשיר, סקאלבילי, Webhooks, CDN למדיה, Schemas בקוד, Collab טוב.
* פריסה: סטודיו בנתיב `/studio` או פרויקט נפרד; תוכן נשלף ל‑Next דרך SDK/GraphQL.

**B) Strapi / Payload / Keystone (Self‑hosted Node)**

* יתרונות: שליטה מלאה וסכמה ברורה, פלאגינים.
* פריסה: שרת נפרד (Railway/Render/Fly.io) + אחסון מדיה (S3/R2/Cloudinary). אינטגרציית Webhooks ל‑Vercel.

**C) Django Wagtail (Python)**

* יתרונות: אקו‑סיסטם פייתון, עורך חזק, בקרות עריכה מצוינות.
* פריסה: שירות נפרד (Railway/Render/GCP Cloud Run). חשיפת REST/GraphQL ל‑Next.

**D) Git‑based (TinaCMS + GitHub)**

* יתרונות: ללא שרת נפרד, נוח למפתח יחיד.
* חסרונות: פחות ידידותי לעורכים מרובים/Workflow מתקדם.

---

## 6) אינטגרציות ואבטחה

* **אימות (Admin UI)**: NextAuth (Google) מול **Google Cloud Project ייעודי לבלוג** (OAuth Clients נפרדים ל־`dev`/`preview`/`prod`).
* **רולבאק/גרסאות**: נתמך על ידי Sanity/Strapi/Wagtail.
* **Webhooks**: `POST /api/revalidate` ב‑Next לגירוי ISR לאחר פרסום.
* **מדיה**: Sanity Assets / Cloudinary (העדפה ל‑AVIF/WEBP, Responsive Images).
* **אנליטיקה**: Vercel Analytics + אפשרות Plausible/GA4.
* **שגיאות**: Sentry לפרונט + בקאנד.
* **נגישות**: Alt חובה, יחס ניגודיות, קיצורי מקלדת בעורך אם אפשר.

---

## 7) דומיין ופריסה

**החלטה:** הבלוג ירוץ בפרויקט Vercel נפרד + Google Cloud Project נפרד, דומיין: `blog.myenter.com`. ניתן (אופציונלית) להגיש גם דרך `/blog` באתר הראשי באמצעות Rewrites/Proxy.

* **אפשרות 1 (מומלץ):** סאב‑דומיין `blog.myenter.com` → פרויקט Vercel נפרד לבלוג.
* **אפשרות 2:** נתיב משנה `myenter.com/blog` → Reverse Proxy/rewrites מהאתר הראשי לבלוג.

**סביבות**: `dev` / `preview` / `prod` עם Env Vars נפרדים, ו‑OAuth Clients תואמים.

---

## 8) ביצועים ו‑SEO

* Lighthouse 90+ על מובייל ודסקטופ.
* תמונות עם `next/image`, טעינה עצלה (lazy), פריסה רספונסיבית.
* קאשינג בעזרת ISR + CDN של Vercel.
* מפות אתר דינמיות `/sitemap.xml`, הזנות `/rss.xml`.
* מטה‑דאטה מובנה (Open Graph, Twitter Cards), OG images דינמיים.

---

## 9) MVP – היקף מינימלי

* יצירה/עריכה/פרסום של Post עם: כותרת, גוף, תמונת שער, תגיות.
* עמוד בית עם פיד, עמוד פוסט, עמוד תגית/קטגוריה, עמוד אודות.
* עורך תוכן עם Preview, טיוטה/פרסום/תזמון, ניהול מדיה בסיסי.
* Webhook ל‑ISR, אנליטיקה בסיסית, SEO בסיסי.

---

## 10) פאזה 2 (אחרי עלייה לאוויר)

* שיתוף פעולה בזמן אמת (live collaboration), הערות פנימיות על פסקאות.
* תוכן עשיר מתקדם: אינפוגרפיקות, בלוקים מותאמים (Callout, CodeSandbox Embed).
* חיפוש פנימי (Algolia/Meilisearch) + חיפוש לפי תגיות.
* i18n (עברית/אנגלית), Pagination משופר, Related Posts אוטומטי.
* אזור Newsletter (אירוח ב‑Buttondown/Beehiiv) + הרשמות.

---

## 11) מדדי הצלחה (KPIs)

* TTFB < 200ms (CDN), LCP < 2.5s, CLS \~0.
* זמן עריכה ממוצע לפוסט < 30 דק׳ (מרגע יצירה עד פרסום).
* יחס קליקים מתוצאות חיפוש (CTR) עולה ב‑20% בתוך 3 חודשים.
* 0 תקלות קריטיות בפרסום (ניטור Sentry/uptime).

---

## 12) תרשים רצף – פרסום פוסט (גבוה־רמה)

```
Author -> CMS: Create Draft
CMS -> Next (Preview): Draft Preview (Draft Mode)
Author -> CMS: Submit for Review
Editor -> CMS: Approve + Schedule/Publish
CMS -> Next: Webhook /api/revalidate
Next -> Vercel CDN: Build/ISR Update
User -> Blog: View Updated Post
```

---

## 13) החלטת סטאק מומלצת (ברירת מחדל)

* **CMS**: Sanity (סטודיו ב‑/studio עם גישה מאובטחת).
* **Frontend**: Next.js (App Router), Tailwind, MDX לבלוקים מותאמים.
* **Auth**: NextAuth (Google) לעורכים בלבד.
* **מדיה**: Sanity Assets / Cloudinary (אם צריך טרנספורמציות מתקדמות).
* **פריסה**: פרונט ל‑Vercel, CMS מנוהל (אין שרת נוסף), דומיין `blog.myenter.com`.

*אם נדרש פייתון לבקאנד*: להוסיף שירות Wagtail נפרד (Cloud Run) ולהמשיך למשוך תכנים ל‑Next דרך API.

---

## 14) מסגרת זמנים ועלויות (הערכה)

* **MVP**: 2–4 שבועות (כולל תבנית, סכמות, עורך, דומיין, SEO בסיסי).
* **שדרוגים**: 2–3 שבועות לפאזה 2.
* **עלויות**: Vercel (חינם/Pro), Sanity (Free/Team), דומיין ושירותי מדיה.

---

## 15) צ'ק‑ליסט הקמה טכנית (היי‑לבל)

### צ'ק‑ליסט Google Cloud (לבלוג בלבד)

1. צור **Google Cloud Project** ייעודי (למשל: `myenter-blog-prod` ו/או `myenter-blog-dev`).
2. הקם **OAuth Consent Screen** (External), הוסף Authorized domains: `myenter.com` ו־`vercel.app`.
3. צור **OAuth Client** מסוג *Web application* לכל סביבה:

   * `https://blog.myenter.com/api/auth/callback` (Production)
   * `http://localhost:3000/api/auth/callback` (Development)
   * `https://<project>.vercel.app/api/auth/callback` (Preview יציב של הפרויקט)
4. קבע Scopes מינימליים (openid, email, profile). הוסף *Test Users* בסביבת Dev.
5. הוצא את המפתחות ל־Vercel Env Vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
6. הפעל *Audit Logs* ו־*Monitoring* לפרויקט הבלוג.

### צ'ק‑ליסט DNS/Vercel

* צור פרויקט **Vercel** נפרד לבלוג, הוסף דומיין `blog.myenter.com`.
* ב‑DNS: רשומת `CNAME` מ־`blog` אל `cname.vercel-dns.com`.
* ודא שה־`NEXTAUTH_URL` תואם לדומיין הפעיל (preview/production).

1. יצירת פרויקט Vercel לבלוג + דומיין `blog.myenter.com`.
2. הקמת Sanity Project + הגדרת Schemas (Post/Page/Tag/Category/Author/Media).
3. הוספת סטודיו ב‑`/studio` והגבלת גישה (OAuth + Access Control).
4. בניית עמודים: `/`, `/posts/[slug]`, `/tag/[slug]`, `/category/[slug]`, `/about`.
5. הטמעת Preview Mode (Draft Mode) + API Route ל‑`/api/revalidate`.
6. SEO: Sitemap, RSS, OG images דינמיים, מטה‑דאטה.
7. אנליטיקה ושגיאות: Vercel Analytics + Sentry.
8. הגדרת Webhooks בפרסום/עדכון בסניטי → `revalidate`.
9. בדיקות Lighthouse + נגישות + עומסים בסיסיים.
10. מסמך משתמש (מיני‑מדריך לעורך) + הרשאות רולים.

---

## 16) סיכוני מוצר וטכניים

* Vendor lock‑in ב‑CMS: מטופל ע״י יצוא תכנים תקופתי (backup) + שימוש ב‑portable text/MDX.
* ביצועים בתצוגת פוסטים ארוכים: חלוקת בלוקים, טעינת מדיה עצלה, pagination פנימי לתגובות/הטמעות.
* נגישות RTL/עברית: בדיקות RTL, גופנים מתאימים, מיקרו‑קופי.

---

### הערה אחרונה

האפיון מכוון ל‑MVP איכותי עם מסלול צמיחה ברור. אם תעדיף בקאנד פייתון “טהור”, נשנה ל‑Wagtail + Next ונשמור על חוויית עריכה דומה ועל פריסה קלה.
