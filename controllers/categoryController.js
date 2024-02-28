import categoryModel from "../models/categoryModel.js";
import slugify from "slugify"; //create URL-friendly slugs

// Controller to create a new category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name }); // Checking if the category already exists in the database
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name), // Creating a slug for the category name
    }).save(); // Saving the new category to the database
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

// Controller to update a category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body; // Extracting 'name' from the request body
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) }, // Updating category name and slug
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// Controller to get all categories
export const categoryControlller = async (req, res) => {
  try {
    const categories = await categoryModel.find({}); // Retrieving all categories from the database
    res.status(200).send({
      success: true,
      message: "All Categories List",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// Controller to get a single category by slug
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug }); // Finding a category by its slug
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    }); // Sending a success message with the retrieved category
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting Single Category",
    });
  }
};

// Controller to delete a category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params; // Extracting 'id' from the request parameters
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
