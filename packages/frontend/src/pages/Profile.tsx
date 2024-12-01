import React from "react";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileForm } from "../components/profile/ProfileForm";
import { ProfilePictures } from "../components/profile/ProfilePictures";
import { ProfileBio } from "../components/profile/ProfileBio";

export function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProfileHeader />
        <div className="mt-8 space-y-8">
          <ProfilePictures />
          <ProfileBio />
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
