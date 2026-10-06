export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Fill out the form and our counsellor will reach out to you.
        </p>

        <form
          className="mt-10 bg-white shadow-xl rounded-2xl p-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form Submitted!");
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Phone Number"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border rounded-lg px-4 py-3"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
