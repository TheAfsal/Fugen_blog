import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "/heroImage.jpg";

interface HeroSectionProps {
  user: { id: string } | null;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/20 via-transparent to-brand-coral/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Share Your
              <br />
              Amazing Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Create, publish, and discover incredible content with our modern
              blogging platform. Join thousands of writers sharing their passion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {user ? (
              <Button
                asChild
                size="lg"
                className="hover:bg-brand-primary/90 px-8 py-4 text-lg rounded-xl"
              >
                <Link to="/blog" className="flex items-center">
                  View Blog Posts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  className="text-white px-8 py-4 text-lg rounded-xl"
                >
                  <Link to="/register" className="flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 text-lg rounded-xl bg-transparent"
                >
                  <Link to="/blog">Explore Posts</Link>
                </Button>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-1 border">
              <div
                className="aspect-video rounded-xl flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroImage})`,
                }}
              >
                <div className="text-center rounded-xl">
                  <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-gray-100 dark:text-gray-300">
                    Beautiful, Fast, Modern
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection