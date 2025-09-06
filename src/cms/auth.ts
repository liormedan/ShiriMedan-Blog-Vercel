import type { Authenticator, FirebaseUser } from "firecms";

// Allow all authenticated users for now. You can restrict by email/domain.
export const cmsAuthenticator: Authenticator<FirebaseUser> = async ({ user }) => {
  // Example restriction (uncomment and set env):
  // const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  //   .split(",")
  //   .map((s) => s.trim().toLowerCase())
  //   .filter(Boolean);
  // if (allowed.length > 0 && user?.email && !allowed.includes(user.email.toLowerCase())) return false;
  return true;
};

