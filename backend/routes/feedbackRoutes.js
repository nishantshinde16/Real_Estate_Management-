const express = require("express");

const {
  createFeedback,
  getFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getFeedbacks);
router.put("/:id", updateFeedbackStatus);
router.delete("/:id", deleteFeedback);

module.exports = router;