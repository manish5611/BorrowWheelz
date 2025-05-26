import React from "react";

const team = [
  {
    name: "Manish Yoga Kirthi B N",
    title: "Web Designer",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "Dinesh Kumar R",
    title: "Lead Developer",
    img: "https://via.placeholder.com/150",
  },
];

const skills = [
  "Responsive Web Design",
  "Frontend Development",
  "UI/UX Design",
  "Tailwind CSS & React",
  "Cross-browser Compatibility",
  "Performance Optimization",
];

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-teal-50 min-h-screen py-12 px-6 text-gray-800 mt-14">
      <div className="max-w-5xl mx-auto text-center">
        {/* Intro Section */}
        <div className="text-left mb-14 space-y-4 md:flex md:space-x-10 animate-fadein">
          <div className="md:w-1/2">
            <p className="text-4xl font-extrabold text-indigo-700 flex items-center gap-2">
              <span className="animate-bounce">🚀</span> WE
            </p>
            <p className="mt-2 text-lg text-gray-700">
              are a design-obsessed, technology-savvy team dedicated to building
              stunning, user-friendly digital products. We pride ourselves on
              writing clean code and crafting elegant user interfaces that solve
              real business problems. We build lasting relationships by deeply
              understanding our clients' goals and aligning our work to those
              needs.
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <p className="text-lg text-gray-700">
              We believe great design is more than aesthetics — it impacts how
              users perceive and engage with brands. That’s why we combine
              thoughtful design with modern technologies to create scalable,
              expressive, and effective web solutions.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold uppercase mb-6 text-indigo-700 tracking-wide flex items-center gap-2 justify-center">
            <span className="animate-bounce">👨‍💻</span> Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 justify-items-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 border border-indigo-100 hover:scale-105 transition-all duration-200 animate-fadein w-96"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover grayscale hover:grayscale-0 border-4 border-indigo-200 shadow"
                />
                <p className="mt-4 font-semibold text-indigo-800 text-lg">
                  {member.name}
                </p>
                <p className="italic text-sm text-gray-500">{member.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stuff We're Good At */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold uppercase mb-6 text-indigo-700 tracking-wide flex items-center gap-2 justify-center">
            <span className="animate-spin-slow">✨</span> Stuff We’re Good At
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-base">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="bg-white px-4 py-3 rounded-xl shadow-md border border-indigo-100 flex items-center gap-2 justify-center hover:bg-indigo-50 transition-all animate-fadein"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-indigo-400 text-lg animate-bounce">✔️</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center text-xs text-gray-400 animate-fadein">
          &copy; {new Date().getFullYear()} BorrowWheelz Team. All rights reserved.
        </div>
      </div>
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein {
            animation: fadein 0.7s;
          }
          .animate-bounce {
            animation: bounce 1.2s infinite alternate;
          }
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-8px);}
          }
          .animate-spin-slow {
            animation: spin-slow 2.5s linear infinite;
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
