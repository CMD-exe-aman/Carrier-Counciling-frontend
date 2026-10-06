import { Link } from "react-router-dom";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      features: ["Consultation", "Resume Tips"],
      // Starter uses a Blue theme
      color: "from-blue-400 to-blue-600",
      bgClass: "bg-blue-50",
      borderClass: "border-blue-400",
      path: "/book", 
    },
    {
      name: "Pro",
      price: "₹999",
      amount: 999,
      features: ["1-on-1 Session", "Resume Rewrite", "Career Roadmap"],
      // Pro uses a Purple theme
      color: "from-purple-400 to-purple-600",
      bgClass: "bg-purple-50",
      borderClass: "border-purple-400",
      path: "/payment", 
    },
    {
      name: "Elite",
      price: "₹1999",
      amount: 1999,
      features: ["Everything in Pro", "Mock Interview", "Priority Support"],
      // Elite uses a Pink theme
      color: "from-pink-400 to-pink-600",
      bgClass: "bg-pink-50",
      borderClass: "border-pink-400",
      path: "/payment", 
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-white dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl text-center font-bold">Pricing</h2>

      <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((p, i) => (
          <div
            key={i}
            // Applying the dynamic background and border to every card
            className={`flex flex-col justify-between rounded-2xl p-8 shadow-xl transition hover:scale-105 border-2 ${p.bgClass} ${p.borderClass}`}
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
              <p className="text-4xl font-extrabold mt-2 text-gray-900">{p.price}</p>

              <ul className="mt-4 space-y-2 text-gray-700">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-medium">
                    <span className="text-green-500 font-bold">✔</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to={p.path}
              state={{ planName: p.name, amount: p.amount }}
              className={`mt-6 block w-full py-3 text-center text-white font-bold rounded-lg bg-gradient-to-r hover:opacity-90 transition-opacity ${p.color}`}
            >
              Choose Plan
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}