const workerModel = require("../models/workerModel");

const getWorkerInfoController = async (req, res) => {
  try {
    const worker = await workerModel.findOne({ userId: req.body.userId });
    if (!worker) {
      return res.status(404).send({
        success: false,
        message: "Worker not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Worker data successfully fetched",
      data: worker,
    });
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching worker details",
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const worker = await workerModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );
    if (!worker) {
      return res.status(404).send({
        success: false,
        message: "Worker not found for update",
      });
    }
    res.status(200).send({
      success: true,
      message: "Worker profile updated successfully",
      data: worker,
    });
  } catch (error) {
    console.error("Error updating worker:", error);
    res.status(500).send({
      success: false,
      message: "Error updating worker details",
      error,
    });
  }
};

module.exports = { getWorkerInfoController, updateProfileController };
