import React from "react";

const categories = [
  {
    title: "New Arrivals",
    subtitle: "Shop now",
    image: "/path/to/new-arrivals.jpg", // Replace with your image path
  },
  {
    title: "Accessories",
    subtitle: "Shop now",
    image: "/path/to/accessories.jpg",
  },
  {
    title: "Workspace",
    subtitle: "Shop now",
    image: "/path/to/workspace.jpg",
  },
];

const CategoryCard = ({ category }) => (
  <div className="relative overflow-hidden rounded-lg shadow-sm group">
    <img
      src={category.image}
      alt={category.title}
      className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute bottom-4 left-4 text-white">
      <h3 className="text-lg font-semibold">{category.title}</h3>
      <p className="text-sm">{category.subtitle}</p>
    </div>
  </div>
);

const ShopByCategory = () => {
  return (
    <section className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <a href="#" className="text-sm text-indigo-600 hover:underline">
          Browse all categories →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
