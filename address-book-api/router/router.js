const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contactController");
const GroupsController = require("../controllers/groupController");
const ContactGroupsController = require("../controllers/contactGroupController");

router
  .route("/contact")
  .get(ContactController.showAll)
  .post(ContactController.create);

router.put("/contact/:id", ContactController.update);
router.delete("/contact/:id", ContactController.delete);

router
  .route("/groups")
  .get(GroupsController.showAll)
  .post(GroupsController.create);
router.put("/groups/:id", GroupsController.update);
router.delete("/groups/:id", GroupsController.delete);

router.get("/contactGroup", ContactGroupsController.showAll);
router.post("/contactGroup", ContactGroupsController.create);
router.put("/contactGroup/:id", ContactGroupsController.update);
router.delete("/contactGroup/:id", ContactGroupsController.delete);

module.exports = router;
