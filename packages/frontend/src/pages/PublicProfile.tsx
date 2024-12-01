import React from "react";
import { PublicProfileHeader } from "../components/public-profile/PublicProfileHeader";
import { PublicProfileGallery } from "../components/public-profile/PublicProfileGallery";
import { PublicProfileInfo } from "../components/public-profile/PublicProfileInfo";
import { PublicProfileReviews } from "../components/public-profile/PublicProfileReviews";
import { PublicProfileAvailability } from "../components/public-profile/PublicProfileAvailability";

export function PublicProfile() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <PublicProfileHeader />
        <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <PublicProfileGallery />
            <PublicProfileInfo />
            <PublicProfileReviews />
          </div>
          <div className="space-y-8">
            <PublicProfileAvailability />
          </div>
        </div>
      </div>
    </div>
  );
}
