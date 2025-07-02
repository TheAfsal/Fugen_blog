import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  user: { id: string } | null;
}

const CTASection = ({ user }: CTASectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-slate">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 ">
            Ready to Start Writing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of writers who trust BlogSpace to share their stories
            with the world.
          </p>
          {!user && (
            <Button
              asChild
              size="lg"
              className=" px-8 py-4 text-lg rounded-xl"
            >
              <Link to="/register" className="flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
