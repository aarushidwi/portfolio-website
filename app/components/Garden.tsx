"use client";

import { useEffect, useState } from "react";

interface Plant {
  id: string;
  type: string;
  emoji: string;
  plantedAt: number;
}

const PLANT_TYPES = [
  { name: "Sunflower", emoji: "🌻" },
  { name: "Rose", emoji: "🌹" },
  { name: "Tulip", emoji: "🌷" },
  { name: "Cactus", emoji: "🌵" },
  { name: "Tree", emoji: "🌳" },
  { name: "Mushroom", emoji: "🍄" },
];

export default function Garden() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState(PLANT_TYPES[0]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [landmines, setLandmines] = useState<string[]>([]);

  useEffect(() => {
    // Load plants from localStorage
    const savedPlants = localStorage.getItem("gardenPlants");
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    }

    // Generate or load landmines
    const savedLandmines = localStorage.getItem("gardenLandmines");
    if (savedLandmines) {
      setLandmines(JSON.parse(savedLandmines));
    } else {
      // Generate 6 random landmine positions
      const mines: string[] = [];
      while (mines.length < 6) {
        const row = Math.floor(Math.random() * 6);
        const col = Math.floor(Math.random() * 6);
        const mineId = `${row}-${col}`;
        if (!mines.includes(mineId)) {
          mines.push(mineId);
        }
      }
      setLandmines(mines);
      localStorage.setItem("gardenLandmines", JSON.stringify(mines));
    }

    // Track visitors
    const visitors = localStorage.getItem("gardenVisitors");
    const newCount = visitors ? parseInt(visitors) + 1 : 1;
    setTotalVisitors(newCount);
    localStorage.setItem("gardenVisitors", newCount.toString());
  }, []);

  useEffect(() => {
    // Save plants to localStorage whenever they change
    if (plants.length > 0) {
      localStorage.setItem("gardenPlants", JSON.stringify(plants));
    }
  }, [plants]);

  const plantSeed = (row: number, col: number) => {
    const spotId = `${row}-${col}`;

    // Check if spot is already taken
    if (plants.some(p => p.id === spotId)) {
      return;
    }

    // Check if it's a landmine
    if (landmines.includes(spotId)) {
      setTimeout(() => {
        alert('💥 BOOM! Bye!');
      }, 100);
      return;
    }

    const newPlant: Plant = {
      id: spotId,
      type: selectedPlant.name,
      emoji: selectedPlant.emoji,
      plantedAt: Date.now(),
    };

    const updatedPlants = [...plants, newPlant];
    setPlants(updatedPlants);
  };

  const clearGarden = () => {
    if (confirm("Are you sure you want to clear the garden?")) {
      setPlants([]);
      localStorage.removeItem("gardenPlants");

      // Generate new landmines
      const mines: string[] = [];
      while (mines.length < 6) {
        const row = Math.floor(Math.random() * 6);
        const col = Math.floor(Math.random() * 6);
        const mineId = `${row}-${col}`;
        if (!mines.includes(mineId)) {
          mines.push(mineId);
        }
      }
      setLandmines(mines);
      localStorage.setItem("gardenLandmines", JSON.stringify(mines));
    }
  };

  const getPlantAtSpot = (row: number, col: number) => {
    return plants.find(p => p.id === `${row}-${col}`);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <p className="text-[#8892b0] mb-6">
          Welcome to my virtual garden! Click on any plot to plant a seed and watch our community garden grow.
        </p>
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="text-[#64ffda]">Select your plant:</span>
          <div className="flex gap-2 flex-wrap justify-center">
            {PLANT_TYPES.map((plant) => (
              <button
                key={plant.name}
                onClick={() => setSelectedPlant(plant)}
                className={`px-4 py-2 rounded transition-all ${
                  selectedPlant.name === plant.name
                    ? "bg-[#64ffda] text-[#0a192f]"
                    : "bg-[#112240] text-[#8892b0] hover:bg-[#1d3a5f]"
                }`}
              >
                {plant.emoji} {plant.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 text-sm text-[#8892b0]">
          <span>🌱 Plants: {plants.length}</span>
          <span>👥 Visitors: {totalVisitors}</span>
        </div>
      </div>

      {/* Garden Grid */}
      <div className="bg-gradient-to-b from-[#2d5016] to-[#1f3810] rounded-lg p-4 mx-auto max-w-md shadow-xl">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }, (_, i) => {
            const row = Math.floor(i / 6);
            const col = i % 6;
            const plant = getPlantAtSpot(row, col);

            return (
              <button
                key={i}
                onClick={() => plantSeed(row, col)}
                className={`aspect-square rounded flex items-center justify-center text-3xl transition-all ${
                  plant
                    ? "bg-[#3d6b20] hover:scale-110"
                    : "bg-[#4a7c2f] hover:bg-[#5a8c3f] hover:border-2 hover:border-[#90ee90]"
                }`}
                title={plant ? `${plant.type} planted` : "Click to plant"}
              >
                {plant ? plant.emoji : ""}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={clearGarden}
          className="text-sm text-[#8892b0] hover:text-[#64ffda] transition-colors"
        >
          Clear Garden
        </button>
      </div>
    </div>
  );
}
