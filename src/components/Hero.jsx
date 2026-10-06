import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-50 dark:bg-gray-900 overflow-hidden min-h-screen flex items-center">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text & CTAs */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Now accepting students for 2026 Batch
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Design Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Dream Career.
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
              Stop guessing your future. Get AI-driven resume analysis, precise career roadmaps, and 1-on-1 mentorship from industry experts to land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                to="/book" 
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all text-center"
              >
                Book a Free Session
              </Link>
              <Link 
                to="/roadmap" 
                className="px-8 py-4 bg-white text-gray-800 font-bold rounded-xl shadow-md border border-gray-100 hover:bg-gray-50 hover:-translate-y-1 transition-all text-center"
              >
                Generate Roadmap
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="Student" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                  +10k
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400">★★★★★</div>
                <span>Trusted by 10,000+ students</span>
              </div>
            </div>
          </div>

          {/* Right Side: Hero Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Students collaborating" 
              className="rounded-3xl shadow-2xl relative z-10 border-8 border-white dark:border-gray-800"
            />
            
            {/* Floating UI Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl z-20 border border-gray-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                🚀
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Success Rate</p>
                <p className="text-xl font-black text-gray-900">95% Placed</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}