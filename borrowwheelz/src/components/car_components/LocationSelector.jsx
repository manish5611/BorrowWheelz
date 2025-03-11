import { useState, useEffect } from "react";

const locations = [
  { name: "Agra", image: "/images/agra.jpg" },
  { name: "Ahmedabad", image: "/images/ahmedabad.jpg" },
  { name: "Bangalore", image: "/images/bangalore.jpg" },
  { name: "Bangalore Airport", image: "/images/bangalore-airport.jpg" },
  { name: "Belagavi", image: "/images/belagavi.jpg" },
  { name: "Bhubaneswar", image: "/images/bhubaneswar.jpg" },
];

const LocationSelector = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    if (storedLocation) {
      setSelectedLocation(storedLocation);
      setShowModal(false);
    }
  }, []);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    localStorage.setItem("selectedLocation", location);
    onLocationSelect(location);
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Select Your City</h2>
            <div className="grid grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="cursor-pointer text-center p-2 border rounded-lg hover:bg-gray-100"
                  onClick={() => handleSelectLocation(loc.name)}
                >
                  <img src={loc.image} alt={loc.name} className="w-full h-24 object-cover rounded-md" />
                  <p className="mt-2 font-semibold">{loc.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationSelector;
