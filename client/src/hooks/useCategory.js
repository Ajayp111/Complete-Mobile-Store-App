import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch categories
export default function useCategory() {
  // State to hold the categories data
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from the API
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      // Updating the categories state with the received data
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch categories on component mount using useEffect
  useEffect(() => {
    getCategories(); // Calling the getCategories function
  }, []);

  return categories;
}
