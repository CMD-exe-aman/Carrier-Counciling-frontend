export default function Testimonials() {
  const data = [
    { name: "Aman", text: "Excellent counselling!" },
    { name: "Priya", text: "Helped me choose the right path!" },
    { name: "Rahul", text: "Resume review was amazing!" },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 px-6">
      <h2 className="text-3xl font-bold text-center">Testimonials</h2>

      <div className="mt-10 flex gap-6 overflow-x-auto p-4">
        {data.map((t, i) => (
          <div
            key={i}
            className="min-w-[250px] bg-white rounded-xl shadow-lg p-6"
          >
            <p className="italic">"{t.text}"</p>
            <h4 className="mt-3 font-bold text-right text-blue-600">- {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
