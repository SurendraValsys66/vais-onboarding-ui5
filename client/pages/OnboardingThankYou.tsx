import React from "react";
import {
  clearOnboarding,
  clearOnboardingSkipReminder,
  emitOnboardingSkipReminderUpdate,
  getOnboarding,
} from "@/lib/onboardingStorage";
import { useNavigate } from "react-router-dom";
import OnboardingVideoLayout from "@/components/onboarding/OnboardingVideoLayout";
import ConfettiCanvas from "@/components/onboarding/ConfettiCanvas";
import CongratulatinModal from "@/components/onboarding/CongratulatinModal";
import { markStepCompleted } from "@/lib/masteryStorage";

export default function OnboardingThankYou() {
  const navigate = useNavigate();
  const data = getOnboarding();

  const continueToApp = () => {
    markStepCompleted("onboardingCompleted");
    clearOnboarding();
    clearOnboardingSkipReminder();
    emitOnboardingSkipReminderUpdate(null);
    navigate("/");
  };

  const handleClose = () => {
    continueToApp();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://cdn.builder.io/o/assets%2Fca3c5e060b9e43be9ac23c9d5ca30b53%2F4cc5fc7138e447e19726c8591642a50b?alt=media&token=db33d9de-75b4-4476-bd4c-3e6af0d53bcc&apiKey=ca3c5e060b9e43be9ac23c9d5ca30b53"
          type="video/mp4"
        />
      </video>

      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Logo */}
      <div className="pointer-events-auto absolute left-4 top-4 md:left-6 md:top-6 z-20">
        <a href="/" className="inline-flex items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Ff2a051d62a994479965d33c6eada9792%2F9b770886bd6142129584a6e279795c21?format=webp&width=800"
            alt="VAIS Logo"
            className="h-9 w-auto"
          />
        </a>
      </div>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        <ConfettiCanvas mode="blast" />
      </div>

      {/* Modal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <CongratulatinModal onClose={handleClose} onContinue={continueToApp} />
      </div>
    </div>
  );
}
