import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StepProgress from "@/components/onboarding/StepProgress";
import {
  saveOnboarding,
  getOnboarding,
  saveOnboardingSkipReminder,
  emitOnboardingSkipReminderUpdate,
} from "@/lib/onboardingStorage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import OnboardingVideoLayout from "@/components/onboarding/OnboardingVideoLayout";
import {
  ClipboardList,
  Lightbulb,
  Cpu,
  Headphones,
  Cog,
  Calculator,
  Banknote,
  Users,
  Factory,
  Megaphone,
  Landmark,
  ShoppingCart,
  Code,
  FileText,
  BarChart3,
  GraduationCap,
  TrendingUp,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

type CategoryOption = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const CATEGORY_OPTIONS: readonly CategoryOption[] = [
  { label: "Administrative Support", icon: ClipboardList },
  { label: "Business Strategy", icon: Lightbulb },
  { label: "Computing", icon: Cpu },
  { label: "Customer Support", icon: Headphones },
  { label: "Engineering", icon: Cog },
  { label: "Financial Management", icon: Calculator },
  { label: "Financial Services", icon: Banknote },
  { label: "HR Management", icon: Users },
  { label: "Manufacturing", icon: Factory },
  { label: "Marketing", icon: Megaphone },
  { label: "Public Administration", icon: Landmark },
  { label: "Purchasing", icon: ShoppingCart },
  { label: "Software Development", icon: Code },
  { label: "Content Management", icon: FileText },
  { label: "Data Science", icon: BarChart3 },
  { label: "Education", icon: GraduationCap },
  { label: "Sales", icon: TrendingUp },
  { label: "Healthcare", icon: Stethoscope },
  { label: "Hospitality", icon: UtensilsCrossed },
  { label: "Other", icon: Sparkles },
];

type CategoryValue = (typeof CATEGORY_OPTIONS)[number]["label"];

export default function OnboardingCategory() {
  const navigate = useNavigate();
  const initial = getOnboarding();
  const [value, setValue] = useState<CategoryValue | "">(
    (initial.vaisCategory as CategoryValue | "") ?? "",
  );

  const onNext = () => {
    if (!value) return;
    saveOnboarding({ vaisCategory: value });
    navigate("/onboarding/complete");
  };

  const onSkip = () => {
    const reminder = saveOnboardingSkipReminder({
      stepRoute: "/onboarding/category",
      stepLabel: "Choose your product category",
      stepNumber: 5,
      totalSteps: 6,
    });
    emitOnboardingSkipReminderUpdate(reminder);
    navigate("/");
  };

  return (
    <OnboardingVideoLayout
      logoSrc="https://cdn.builder.io/api/v1/image/assets%2Ff2a051d62a994479965d33c6eada9792%2F9b770886bd6142129584a6e279795c21?format=webp&width=800"
      summaryValues={initial}
      summaryTotal={6}
      currentStep={5}
      content={
        <div className="space-y-8">
          <div>
            <div className="text-sm font-medium text-valasys-gray-700">
              Final touch
            </div>
            <StepProgress
              current={5}
              total={6}
              title="Which of these categories align with your product?"
              subtitle="Choose the closest match so VAIS can tailor recommendations."
            />
          </div>
          <div>
            <RadioGroup
              value={value}
              onValueChange={(v) => {
                setValue(v as CategoryValue);
                if (v) {
                  saveOnboarding({ vaisCategory: v as CategoryValue });
                }
              }}
              className="grid grid-cols-2 gap-3"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <motion.div
                  key={option.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Label
                    htmlFor={`category-${option.label}`}
                    className={`flex items-center gap-2 rounded-lg border-2 p-3 cursor-pointer transition-all ${
                      value === option.label
                        ? "border-valasys-orange bg-valasys-orange/5"
                        : "border-valasys-gray-200 hover:border-valasys-orange/40"
                    }`}
                  >
                    <RadioGroupItem
                      id={`category-${option.label}`}
                      value={option.label}
                      className="h-5 w-5"
                    />
                    <option.icon className="h-5 w-5 text-valasys-orange flex-shrink-0" />
                    <span className="text-sm font-medium text-valasys-gray-900">
                      {option.label}
                    </span>
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={onSkip}
              className="text-sm font-semibold text-valasys-gray-600 transition-colors hover:text-valasys-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valasys-orange underline-offset-4 hover:underline"
            >
              Skip for now
            </button>
            <Button
              onClick={onNext}
              disabled={!value}
              className="bg-valasys-orange hover:bg-valasys-orange-light text-white"
            >
              Finish →
            </Button>
          </div>
        </div>
      }
    />
  );
}
