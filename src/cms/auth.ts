import type { Authenticator, FirebaseUser } from "firecms";

// Allow access only to emails listed in NEXT_PUBLIC_ADMIN_EMAILS (comma-separated)
export const cmsAuthenticator: Authenticator<FirebaseUser> = async ({ user }) => {
  const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // If no list provided, deny by default to be safe
  if (allowed.length === 0) return false;

  const email = user?.email?.toLowerCase();
  if (!email) return false;
  return allowed.includes(email);
};
