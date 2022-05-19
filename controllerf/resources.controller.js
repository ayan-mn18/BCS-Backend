const { Resource } = require("../models");
const {
  errorMessage,
  successMessage,
} = require("../utilf/responseSender.utils");

const createResource = async (req, res) => {
  try {
    const resource = await Resource.create({});
    successMessage(
      res,
      `Resource Created Successfully will resource id ${resource._id}`,
      (data = resource)
    );
  } catch (error) {
    errorMessage(res, "Issues in creating resource", error);
  }
};

const getResource = async (req, res) => {
  try {
    const resource = await Resource.findOne({});
    successMessage(
      res,
      `Resource fetched Successfully with resource id ${resource._id}`,
      (data = resource)
    );
  } catch (error) {
    errorMessage(res, "Issues in fetching response", error);
  }
};

const updateResource = async (req, res) => {
  try {
    // Updating every possible url in the response .
    // Updating the body given .
    // Returning the final data .
  } catch (error) {
    errorMessage(
      res,
      "Issues in updating resource , please try again !",
      error
    );
  }
};

module.exports = {
  createResource,
  getResource,
  updateResource,
};
