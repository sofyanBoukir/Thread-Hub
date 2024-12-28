const express = require("express");
const { getNotifications, postLikeNotification, postCommentNotification, postCommunityInvitationNotification } = require("../controllers/notificationController");

const router = express.Router();

router.get("/:receiverId",getNotifications);
router.post("/postLikeNotification",postLikeNotification);
router.post("/postCommentNotification",postCommentNotification);
router.post("/postCommunityInvitationNotification",postCommunityInvitationNotification);