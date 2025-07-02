"use client";

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Zap, Shield, Users } from "lucide-react";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { LoadingSpinner } from "@/components/post/LoadingSpinner";

// Lazy-loaded components
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/sections/CTASection"));

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create and publish your posts in seconds with our intuitive editor.",
    color: "text-brand-yellow",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your content is protected with enterprise-grade security.",
    color: "text-brand-coral",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with like-minded writers and readers from around the world.",
    color: "text-brand-slate",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "BlogSpace has transformed how I share my stories. The interface is beautiful and the community is amazing!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Tech Blogger",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "The best blogging platform I've used. Clean, fast, and feature-rich. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Travel Writer",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I love how easy it is to format my posts and engage with readers. BlogSpace is fantastic!",
    rating: 5,
  },
];

export const LandingPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection user={user} />
      </Suspense>
      <FeaturesSection features={features} />
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection testimonials={testimonials} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CTASection user={user} />
      </Suspense>
    </div>
  );
};