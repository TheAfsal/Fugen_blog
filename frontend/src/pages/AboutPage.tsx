"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/10 via-transparent to-brand-coral/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-primary to-brand-slate bg-clip-text text-transparent">
                About BlogSpace
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to empower every voice and make storytelling
              accessible to everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-brand-coral to-brand-yellow bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At BlogSpace, we believe that everyone has a story worth
                telling. Our platform removes the barriers between writers and
                their audience, creating a space where creativity flourishes and
                communities thrive.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We're not just building a blogging platform – we're crafting the
                future of digital storytelling, where technology serves
                creativity and community comes first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-primary mb-2">
                      50K+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Active Writers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-coral mb-2">
                      1M+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Stories Shared
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-yellow mb-2">
                      25+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Countries
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-slate mb-2">
                      99.9%
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Uptime
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mx-auto mb-6 ${value.color}`}
                    >
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
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
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold z-10">
                  {item.year.slice(-2)}
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-semibold text-brand-primary">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
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
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-brand-mint text-brand-primary text-xl">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-brand-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
