import { useState } from "react";

export default function ContactUs() {
  // REMOVED 'phone' from formData since you don't have an input for it
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Validation rules
  const validate = (field, value) => {
    let msg = "";
    if (field === "name") {
      if (!value.trim()) msg = "Name is required.";
      else if (value.length < 3) msg = "Name must be at least 3 characters.";
    }
    if (field === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) msg = "Email is required.";
      else if (!emailPattern.test(value)) msg = "Enter a valid email.";
    }
    if (field === "subject") {
      if (!value.trim()) msg = "Subject is required.";
    }
    if (field === "message") {
      if (!value.trim()) msg = "Message cannot be empty.";
      else if (value.length < 10) msg = "Message must be at least 10 characters.";
    }
    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      setErrors({ ...errors, [name]: validate(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  // Check if form is valid (no errors and no empty fields)
  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    Object.values(formData).every((v) => v.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Force validation check on all fields if user clicks submit before blurring
    const newErrors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      subject: validate("subject", formData.subject),
      message: validate("message", formData.message),
    };
    
    setErrors(newErrors);

    // If any error exists, stop submission
    if (Object.values(newErrors).some((e) => e !== "")) return;

    try {
      setLoading(true);
      setSubmitError(null);
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to send message. Please try again.");

      setSuccess(true);
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-300 flex items-center justify-center p-6 py-20">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Contact Information */}
        <div className="md:w-2/5 bg-blue-600 p-10 font-bold text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Have questions about our career counseling services? Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">📍</div>
                <span>Banglore,Karnataka</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">📞</div>
                <span>+91 9546000000</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">✉️</div>
                <span>insconamankumar@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Component */}
        <div className="md:w-3/5 p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              ✅ Your message has been sent successfully!
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              ❌ {submitError}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  onBlur={handleBlur}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition
                    ${errors.name && touched.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"}`}
                />
                {errors.name && touched.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onBlur={handleBlur}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition
                    ${errors.email && touched.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"}`}
                />
                {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                onBlur={handleBlur}
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition
                  ${errors.subject && touched.subject ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"}`}
              />
              {errors.subject && touched.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                onBlur={handleBlur}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition
                  ${errors.message && touched.message ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"}`}
              ></textarea>
              {errors.message && touched.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300
                ${isFormValid 
                  ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30" 
                  : "bg-gray-400 opacity-70"}`}
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}