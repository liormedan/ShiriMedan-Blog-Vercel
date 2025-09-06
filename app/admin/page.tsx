"use client";
import React from "react";
import { FirebaseCMSApp } from "firecms";
import firebaseConfig from "@/src/config/firebase.json";
import { navigationCollections } from "@/src/cms/collections";
import { cmsAuthenticator } from "@/src/cms/auth";

export default function AdminPage() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <FirebaseCMSApp
        name="Shiri Medan Admin"
        authentication={cmsAuthenticator}
        firebaseConfig={firebaseConfig as any}
        collections={navigationCollections}
      />
    </div>
  );
}

