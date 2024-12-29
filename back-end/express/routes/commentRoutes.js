const express = require("express")
const { insertComment, getThreadComments, deleteComment } = require("../controllers/commentController")
const multer = require("multer")

const upload = multer()

const router = express.Router()

router.get("",getThreadComments);
router.post("/postComment",upload.none(),insertComment);
router.delete("/deleteComment",deleteComment)
module.exports = router;