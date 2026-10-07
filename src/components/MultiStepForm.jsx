import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    msg: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  // -------------------------
  // VALIDATION LOGIC
  // -------------------------
  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!data.name.trim()) newErrors.name = "Name is required";
      else if (data.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    }
    if (step === 2) {
      if (!data.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^[0-9]{10}$/.test(data.phone)) newErrors.phone = "Enter a valid 10-digit phone number";

      if (!data.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Enter a valid email";
    }
    if (step === 3) {
      if (!data.msg.trim()) newErrors.msg = "Message cannot be empty";
      else if (data.msg.length < 10) newErrors.msg = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // -------------------------
  // SUBMIT FUNCTION
  // -------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};
    if (!data.name.trim()) newErrors.name = "Name required";
    if (!data.phone.trim()) newErrors.phone = "Phone required";
    if (!data.email.trim()) newErrors.email = "Email required";
    if (!data.msg.trim()) newErrors.msg = "Message required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.msg,
    };

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccessPopup(true);
      setData({ name: "", phone: "", email: "", msg: "" });
      setStep(1);
      setTimeout(() => setSuccessPopup(false), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // -------------------------
  // ANIMATION VARIANTS
  // -------------------------
  const fadeSlide = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 py-24">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* LEFT SIDE: Info & Trust Signals */}
        <div className="lg:w-5/12 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Book Your 1-on-1 <br /> Strategy Session
            </h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Take the guesswork out of your future. Speak with an expert counselor to map out your perfect career trajectory.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">🎯</div>
                <div>
                  <h4 className="font-bold text-lg">Actionable Roadmap</h4>
                  <p className="text-blue-100 text-sm">Step-by-step guidance for your goals.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">📄</div>
                <div>
                  <h4 className="font-bold text-lg">Resume & Profile Review</h4>
                  <p className="text-blue-100 text-sm">Optimize your profile for recruiters.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">🔒</div>
                <div>
                  <h4 className="font-bold text-lg">100% Confidential</h4>
                  <p className="text-blue-100 text-sm">Your data and ambitions are safe with us.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
            <p className="italic text-sm text-blue-50">
              "The counselling session completely changed my perspective. I was confused between Engineering and Design, and now I have a clear path to NID!"
            </p>
            <p className="font-bold mt-3 text-sm">— Rahul S., 12th Grade Student</p>
          </div>
        </div>

        {/* RIGHT SIDE: Multi-Step Form */}
        <div className="lg:w-7/12 p-8 md:p-14 relative">
          
          {/* Custom Stepper */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>

            {[1, 2, 3].map((num) => (
              <div key={num} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 ${
                  step >= num ? "bg-blue-600 border-blue-100 text-white" : "bg-white border-gray-200 text-gray-400"
                }`}>
                  {step > num ? "✓" : num}
                </div>
                <span className={`absolute -bottom-6 text-xs font-bold whitespace-nowrap ${
                  step >= num ? "text-blue-600" : "text-gray-400"
                }`}>
                  {num === 1 ? "Basics" : num === 2 ? "Contact" : "Details"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="step1" variants={fadeSlide} initial="hidden" animate="visible" exit="exit">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Let's start with your name</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-2 font-medium">{errors.name}</p>}
                  </div>
                  <button type="button" onClick={handleNext} className="mt-8 w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30">
                    Continue →
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="step2" variants={fadeSlide} initial="hidden" animate="visible" exit="exit">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">How can we reach you?</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-2 font-medium">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={handleBack} className="w-1/3 py-4 text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <button type="button" onClick={handleNext} className="w-2/3 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30">
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="step3" variants={fadeSlide} initial="hidden" animate="visible" exit="exit">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">What do you need help with?</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message / Query</label>
                    <textarea
                      name="msg"
                      value={data.msg}
                      onChange={handleChange}
                      placeholder="I am confused between Science and Commerce..."
                      rows={5}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 resize-none"
                    ></textarea>
                    {errors.msg && <p className="text-red-500 text-sm mt-2 font-medium">{errors.msg}</p>}
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={handleBack} className="w-1/3 py-4 text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading} 
                      className="w-2/3 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                      {loading ? "Submitting..." : "Book Session ✓"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

        </div>
      </div>

      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {successPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 bg-gray-900 text-white py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 z-50 border border-gray-700"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl shadow-inner">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-lg">Booking Confirmed!</h4>
              <p className="text-gray-300 text-sm">We'll reach out to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}