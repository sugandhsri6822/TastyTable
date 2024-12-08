import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

const App = () => {
  const appId = "b0a1b8e1"; // Replace with your Edamam app ID
  const appKey = "8ccd0500d33c988a063cad8df06fd86c"; // Replace with your Edamam app key
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState('');
  const [searchQuery, setSearchQuery] = useState('chicken');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecipesFunction();
  }, [searchQuery]);

  const getRecipesFunction = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API response data:", data);
      setFoodRecipes(data.hits || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setFoodRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchFunction = (e) => {
    setSearchRecipe(e.target.value);
  };

  const getSearchFunction = (e) => {
    e.preventDefault();
    setSearchQuery(searchRecipe);
    setSearchRecipe('');
  };

  return (
    <div className="bg-blue-50 min-h-screen font-sans text-gray-900">
      <header className="bg-blue-500 py-6 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Find Here Recipes
          </h1>
        </div>
      </header>
      <div className="container mx-auto mt-8 p-4 sm:px-6 lg:px-8">
        <form
          onSubmit={getSearchFunction}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <div className="relative flex-grow w-full sm:w-1/2">
            <input
              type="text"
              name="search"
              value={searchRecipe}
              onChange={updateSearchFunction}
              placeholder="Search for recipes..."
              className="w-full py-3 px-4 bg-gray-100 border border-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-full text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-900 focus:bg-transparent focus:shadow-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-900 text-white font-semibold py-3 px-6 rounded-full transform hover:scale-105 transition-transform focus:outline-none focus:ring-offset-2 focus:ring-offset-blue-700"
          >
            Search Recipe
          </button>
        </form>
      </div>

      <div className="container mx-auto mt-8 p-4 sm:px-6 lg:px-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {foodRecipes.length === 0 ? (
              <p>No recipes found.</p>
            ) : (
              foodRecipes.map(({ recipe }) => (
                <RecipeCard key={recipe.uri} recipe={recipe} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
