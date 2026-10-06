import { useState } from "react";

export default function RoadmapGenerator() {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState(null); // '10th' or '12th'
  const [interest, setInterest] = useState(null);
  const [result, setResult] = useState(null);

  // --- DATA DICTIONARIES ---
  const tenthOptions = [
    { id: "science", label: "Science & Logic (Math, Biology)", icon: "🔬" },
    { id: "commerce", label: "Business & Finance (Numbers, Money)", icon: "📈" },
    { id: "arts", label: "Creativity & Society (Writing, Law, Art)", icon: "🎨" },
  ];

  const twelfthOptions = [
    { id: "coding", label: "I like Coding & Computers", icon: "💻" },
    { id: "biology", label: "I like Biology & Medicine", icon: "🧬" },
    { id: "law", label: "I like Debating & Rules", icon: "⚖️" },
    { id: "design", label: "I like Drawing & Design", icon: "🖌️" },
  ];

  const recommendations = {
    tenth: {
      science: {
        stream: "Science (PCM / PCB)",
        why: "You enjoy logical problem solving, technology, or the natural world.",
        careers: ["Engineering", "Medical", "Pure Sciences", "Architecture"],
        exam: "JEE (Engineering) / NEET (Medical)",
      },
      commerce: {
        stream: "Commerce",
        why: "You have a knack for understanding businesses, markets, and finance.",
        careers: ["Chartered Accountant (CA)", "BBA / MBA", "Investment Banking"],
        exam: "CA Foundation / CUET",
      },
      arts: {
        stream: "Arts / Humanities",
        why: "You are creative, socially aware, and interested in human behavior.",
        careers: ["UPSC / Civil Services", "Lawyer", "Journalism", "Design"],
        exam: "CLAT (Law) / NIFT (Design) / CUET",
      },
    },
    twelfth: {
      coding: {
        path: "Software Engineer / IT Professional",
        desc: "Design, build, and maintain software systems and applications.",
        exam: "JEE Mains & Advanced, BITSAT, State CETs",
        skills: "Problem Solving, Logic, Programming languages (Python, Java, C++)",
      },
      biology: {
        path: "Doctor / Biotechnologist",
        desc: "Diagnose illnesses, treat patients, or research biological systems.",
        exam: "NEET (for MBBS/BDS), ICAR AIEEA (for Biotech)",
        skills: "Empathy, High Memory Retention, Analytical thinking",
      },
      law: {
        path: "Corporate Lawyer / Advocate",
        desc: "Navigate the legal system, draft contracts, and represent clients.",
        exam: "CLAT (Common Law Admission Test), AILET",
        skills: "Public Speaking, Critical Reading, Argumentation",
      },
      design: {
        path: "UI/UX Designer / Fashion Designer",
        desc: "Create visually appealing, functional, and user-friendly products.",
        exam: "NIFT Entrance, UCEED (for IITs), NID DAT",
        skills: "Creativity, Visual Communication, Empathy for users",
      },
    },
  };

  // --- LOGIC HANDLERS ---
  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
    setStep(2);
  };

  const handleInterestSelect = (selectedInterest) => {
    setInterest(selectedInterest);
    // Generate Result
    if (level === "10th") {
      setResult(recommendations.tenth[selectedInterest]);
    } else {
      setResult(recommendations.twelfth[selectedInterest]);
    }
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setLevel(null);
    setInterest(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Career Roadmap Generator</h2>
      <p className="text-center text-gray-500 mb-8">Find the perfect stream and entrance exams for your future.</p>

      {/* STEP 1: Select Level */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-semibold mb-6 text-center">Where are you currently studying?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleLevelSelect("10th")}
              className="p-8 border-2 border-blue-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏫</div>
              <h4 className="text-2xl font-bold text-gray-700">10th Standard</h4>
              <p className="text-gray-500 mt-2">Help me choose a Stream (Science, Commerce, Arts)</p>
            </button>
            <button
              onClick={() => handleLevelSelect("12th")}
              className="p-8 border-2 border-green-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎓</div>
              <h4 className="text-2xl font-bold text-gray-700">12th Standard</h4>
              <p className="text-gray-500 mt-2">Help me choose a Career & Entrance Exam</p>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Select Interest */}
      {step === 2 && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(1)} className="text-blue-500 mb-4 hover:underline">
            ← Back
          </button>
          <h3 className="text-xl font-semibold mb-6 text-center">What are your primary interests?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(level === "10th" ? tenthOptions : twelfthOptions).map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleInterestSelect(opt.id)}
                className="p-6 border rounded-xl hover:shadow-lg hover:border-blue-500 transition-all bg-gray-50 hover:bg-white flex flex-col items-center text-center"
              >
                <span className="text-3xl mb-3">{opt.icon}</span>
                <span className="font-semibold text-gray-700">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Results */}
      {step === 3 && result && (
        <div className="animate-fade-in bg-blue-50 p-8 rounded-xl border border-blue-100">
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-3">
              Your Recommended Roadmap
            </span>
            <h3 className="text-3xl font-bold text-gray-800">
              {level === "10th" ? result.stream : result.path}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h4 className="font-bold text-gray-700 mb-2 border-b pb-2">Why it suits you:</h4>
            <p className="text-gray-600">{level === "10th" ? result.why : result.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-700 mb-2 border-b pb-2">
                {level === "10th" ? "Top Career Paths:" : "Required Skills:"}
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                {level === "10th"
                  ? result.careers.map((career, i) => <li key={i}>{career}</li>)
                  : result.skills.split(", ").map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
              <h4 className="font-bold text-gray-700 mb-2 border-b pb-2 ">Crucial Entrance Exams:</h4>
              <p className="text-gray-700 font-medium">{result.exam}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}