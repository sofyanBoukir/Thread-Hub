const express = require("express");
const { getNotifications, postLikeNotification, postCommentNotification, postCommunityInvitationNotification } = require("../controllers/notificationController");
const multer = require("multer")

const router = express.Router();


const upload = multer()

router.get("/:receiverId",getNotifications);
router.post("/postLikeNotification",upload.none(),postLikeNotification);
router.post("/postCommentNotification",upload.none(),postCommentNotification);
router.post("/postCommunityInvitationNotification",upload.none(),postCommunityInvitationNotification);

module.exports = router;