import { Link } from "react-router-dom";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Text and Image */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="relative z-10">
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-6 leading-tight">
              Empowering students to build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">future-proof careers.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Navigating the transition from high school streams to college placements can be overwhelming. We created Career Counsel to provide data-driven insights, personalized 1-on-1 mentorship, and AI-powered tools to help you make confident, informed decisions about your future.
            </p>
            
            {/* Mission and Vision Badges */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
               <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl shadow-inner">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Our Mission</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Clarity for everyone</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl shadow-inner">
                    💡
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Our Vision</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Zero career confusion</p>
                  </div>
               </div>
            </div>

            <Link 
              to="/book" 
              className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Speak to a Counselor Today
            </Link>
          </div>

          {/* Right Side: Image with Decorative Elements */}
          <div className="relative">
            {/* Decorative Background Blob */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Team mentoring session"
              className="rounded-2xl shadow-2xl relative z-10 border-4 border-white dark:border-gray-800"
            />
            
            {/* Floating Badge on Image */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-gray-100 dark:border-gray-700">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-gray-800 dark:text-gray-200">Actively Accepting Students</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Trust Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
           <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">10k+</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2 font-semibold uppercase tracking-wide text-sm">Students Mentored</div>
           </div>
           <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">50+</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2 font-semibold uppercase tracking-wide text-sm">Expert Counselors</div>
           </div>
           <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-700">95%</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2 font-semibold uppercase tracking-wide text-sm">Success Rate</div>
           </div>
           <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">24/7</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2 font-semibold uppercase tracking-wide text-sm">AI Tool Support</div>
           </div>
        </div>

      </div>
    </section>
  );
}