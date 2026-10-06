import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Features() {
  const feats = [
    { 
      title: "1-on-1 Counselling", 
      desc: "Speak directly with industry veterans to map out your next 5 years.",
      icon: "💬", 
      path: "/book",
      color: "bg-blue-100 text-blue-600"
    },
    { 
      title: "AI Resume Review", 
      desc: "Get instant, actionable feedback on your resume using our advanced AI.",
      icon: "📄", 
      path: "/resume",
      color: "bg-purple-100 text-purple-600"
    },
    { 
      title: "Interview Prep", 
      desc: "Mock interviews with personalized feedback to build your confidence.",
      icon: "🎯", 
      path: "/book",
      color: "bg-pink-100 text-pink-600"
    },
    { 
      title: "Career Roadmaps", 
      desc: "Custom step-by-step guides for JEE, NEET, Tech, and Commerce paths.",
      icon: "🗺️", 
      path: "/roadmap",
      color: "bg-green-100 text-green-600"
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Everything you need</span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
            Powerful Tools for Your Success
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            We combine human expertise with cutting-edge technology to give you an unfair advantage in your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {feats.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 hover:shadow-2xl hover:border-blue-200 transition-all group"
            >
              <Link 
                to={f.path} 
                className="block w-full h-full p-8"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 ${f.color} group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {f.desc}
                </p>
                
                <div className="mt-6 flex items-center text-blue-600 font-bold text-sm">
                  Try it out <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}