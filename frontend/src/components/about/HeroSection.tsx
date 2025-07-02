import { motion } from "framer-motion";


const HeroSection = () => {
  return (
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
          <span>About BlogSpace</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We're on a mission to empower every voice and make storytelling
          accessible to everyone, everywhere.
        </p>
      </motion.div>
    </div>
  </section>
  )
}

export default HeroSection
