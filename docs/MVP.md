# MVP – בלוג shirimedan

## מטרות
- השקה מהירה של בלוג תוכן ל־`blog.myenter.com`.
- חיבור ל־Sanity (Headless CMS) ו־Next.js (App Router) על Vercel.
- תצוגה מהירה, נגישות בסיסית, SEO בסיסי, ו־Preview/Draft.

## מסכים (Public)
- `/` דף בית: רשימת פוסטים אחרונים + פילטר לפי תגיות/קטגוריות בסיסי.
- `/posts/[slug]` פוסט: כותרת, גוף (MDX/PortableText), תמונת שער, מטא‑דאטה.
- `/tag/[slug]` דף תגית: רשימת פוסטים לפי תגית.
- `/category/[slug]` דף קטגוריה: רשימת פוסטים לפי קטגוריה.
- `/about` עמוד סטטי.
- `/*` דף 404 בסיסי.

## מסכים (Internal)
- `/studio` Sanity Studio מוטמע.
- Preview/Draft Mode לצפייה בתוכן טיוטה.

## פיצ'רים (MVP)
- סכמות תוכן: Post, Page, Tag, Category, Author, Media (שדות ליבה בלבד).
- רנדרינג תוכן עשיר (MDX/PortableText) עם רכיבי בסיס: כותרות, קוד, תמונות, אמבד פשוט.
- SEO בסיסי: `generateMetadata`, OG/Twitter defaults, `robots.txt`, `sitemap.xml`.
- NextAuth (Google) עבור גישת Preview/Studio בלבד.
- ISR + API `/api/revalidate` ל־on‑demand revalidate מ־Sanity webhook.
- TailwindCSS, עיצוב בסיסי, RTL + WCAG 2.1 AA ברמת MVP.
- אנליטיקות Vercel (בסיסיות) והכנות ל־Sentry (לא חובה ב־MVP).

## מחוץ ל־MVP (פאזה 2)
- i18n רב‑לשוני, חיפוש (Algolia/Meili), ניוזלטר, OG images דינמיים לפוסט.
- תזמון מתקדם, היסטוריה מתקדמת, עריכה שיתופית מלאה.

## קריטריוני קבלה
- דפים נטענים ומוגשים מ־Vercel, תוכן מגיע מ־Sanity.
- Preview/Draft עובד מאובטח (Google OAuth) + Revalidate מעדכן CDN.
- Lighthouse: TTFB סביר, LCP < 2.5s, CLS≈0 בדפי ליבה.

