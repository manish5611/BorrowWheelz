import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f9fafe] px-8 py-6 font-sans text-[#1e1e1e]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-16">
        <h1 className="text-2xl font-semibold ">
          Good morning, <span className="font-normal text-gray-600">Filip</span>
        </h1>
        <input
          type="text"
          placeholder="Search for projects"
          className="rounded-lg px-4 py-2 border border-gray-300 w-64"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Earnings Card */}
        <div className="bg-[#4f46e5] text-white rounded-xl p-6 col-span-1 flex flex-col justify-between">
          <div>
            <p className="text-sm mb-2">Earnings</p>
            <h2 className="text-3xl font-bold">€8,350</h2>
          </div>
          <p className="text-sm mt-6 opacity-80">+10% since last month</p>
        </div>

        {/* Rank & Projects */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {/* Rank */}
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-600 mb-1">Rank</p>
            <h3 className="text-xl font-bold">98</h3>
            <p className="text-xs text-gray-400">In top 30%</p>
          </div>
          {/* Projects */}
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-600 mb-1">Projects</p>
            <h3 className="text-xl font-bold">32</h3>
            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md">mobile app</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md">branding</span>
            </div>
          </div>
        </div>

        {/* Your Projects */}
        <div className="bg-white p-6 rounded-xl shadow col-span-1">
          <h4 className="text-md font-semibold mb-4">Your Projects</h4>
          <div className="mb-4 flex items-center gap-3">
            <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=1" alt="" />
            <div>
              <p className="text-sm font-medium">Logo design for Bakery</p>
              <p className="text-xs text-gray-400">1 day remaining</p>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=2" alt="" />
            <div>
              <p className="text-sm font-medium">Personal branding project</p>
              <p className="text-xs text-gray-400">5 days remaining</p>
            </div>
          </div>
          <a href="#" className="text-sm text-indigo-600 font-medium">
            See all projects
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Recent Invoices */}
        <div className="bg-white p-6 rounded-xl shadow col-span-1 md:col-span-1">
          <h4 className="text-md font-semibold mb-6">Recent Invoices</h4>
          <div className="mb-4">
            <p className="text-sm font-medium">Alexander Williams</p>
            <p className="text-xs text-gray-400">JQ Holdings</p>
            <div className="flex justify-between mt-2">
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Paid</span>
              <span className="font-semibold">€1,200.87</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">John Philips</p>
            <p className="text-xs text-gray-400">Inchar Techs</p>
            <div className="flex justify-between mt-2">
              <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">Late</span>
              <span className="font-semibold">€12,989.88</span>
            </div>
          </div>
        </div>

        {/* Recommended Project */}
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h4 className="text-md font-semibold mb-4">Recommended Project</h4>
          <div className="flex items-center gap-3 mb-2">
            <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=3" alt="" />
            <div>
              <p className="font-semibold">Thomas Martin</p>
              <p className="text-xs text-gray-400">Updated 10m ago</p>
            </div>
            <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">Design</span>
          </div>
          <p className="text-sm font-medium mb-2">
            Need a designer to form branding essentials for my business.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Looking for a talented brand designer to create all the branding materials for my new startup.
          </p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">€8,700 <span className="text-sm font-normal">/ month</span></p>
            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">Full time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
