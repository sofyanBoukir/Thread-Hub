const express = require("express")
const { insertComment, getThreadComments } = require("../controllers/commentController")


const router = express.Router()

router.get("/:threadId",getThreadComments);
router.post("/postComment",insertComment);