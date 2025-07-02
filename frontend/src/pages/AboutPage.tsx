"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Globe } from "lucide-react";
import HeroSection from "@/components/about/HeroSection";
import MissingSection from "@/components/about/MissingSection";
import { ValueCard } from "@/components/about/ValueCard";
import TimelineItem from "@/components/about/TimelineItem";
import TeamMemberCard from "@/components/about/TeamMemberCard";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description:
      "We believe in the power of community and authentic connections between writers and readers.",
    color: "text-brand-coral",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Constantly pushing the boundaries of what a blogging platform can be.",
    color: "text-brand-yellow",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Making quality content creation tools available to everyone, everywhere.",
    color: "text-brand-slate",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "BlogSpace was founded with a simple mission: make blogging beautiful and accessible.",
  },
  {
    year: "2021",
    title: "Growing Community",
    description: "Reached 10,000 active writers and launched our mobile app.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Expanded to support 15 languages and opened offices in 3 countries.",
  },
  {
    year: "2023",
    title: "AI Integration",
    description:
      "Introduced AI-powered writing assistance and content recommendations.",
  },
  {
    year: "2024",
    title: "The Future",
    description:
      "Continuing to innovate with new features and community-driven development.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Former tech journalist with a passion for democratizing content creation.",
  },
  {
    name: "Mike Chen",
    role: "CTO",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Full-stack engineer with 10+ years building scalable platforms.",
  },
  {
    name: "Emily Davis",
    role: "Head of Design",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "UX designer focused on creating intuitive and beautiful user experiences.",
  },
  {
    name: "Alex Rodriguez",
    role: "Head of Community",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Community builder dedicated to fostering meaningful connections between creators.",
  },
];

export const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Section */}
      <MissingSection />

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-primary to-brand-mint bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                title={value.title}
                description={value.description}
                icon={value.icon}
                color={value.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-slate to-brand-coral bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From a simple idea to a global platform
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-mint"></div>

            {timeline.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-yellow to-brand-mint bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate people behind BlogSpace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
