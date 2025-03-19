const ContactController = require("./controllers/contactController");
const ContactGroupsController = require("./controllers/contactGroupController");
const GroupsController = require("./controllers/groupController");
const chalk = require("chalk");

const command = process.argv[2]; 
const entity = process.argv[3]; 


switch (command) {
  case "create":
    if (entity === "Contact") {
      const [name, phoneNumber, company, email] = process.argv.slice(4);
      ContactController.create(name, phoneNumber, company, email);
    } else if (entity === "Groups") {
      const [groupName] = process.argv.slice(4);
      GroupsController.create(groupName);
    } else if (entity === "ContactGroups") {
      const [contactId, groupId] = process.argv.slice(4);
      ContactGroupsController.create(contactId, groupId);
    } else {
      console.log(chalk.red("Entity tidak dikenali untuk perintah create."));
    }
    break;

  case "update":
    if (entity === "Contact") {
      const [id, name, phoneNumber, company, email] = process.argv.slice(4);
      ContactController.update(id, name, phoneNumber, company, email);
    } else if (entity === "Groups") {
      const [id, groupName] = process.argv.slice(4);
      GroupsController.update(id, groupName);
    } else if (entity === "ContactGroups") {
      const [id, contactId, groupId] = process.argv.slice(4);
      ContactGroupsController.update(id, contactId, groupId);
    } else {
    }
    break;

  case "delete":
    if (entity === "Contact") {
      const [id] = process.argv.slice(4);
      ContactController.delete(id);
    } else if (entity === "Groups") {
      const [id] = process.argv.slice(4);
      GroupsController.delete(id);
    } else if (entity === "ContactGroups") {
      const [id] = process.argv.slice(4);
      ContactGroupsController.delete(id);
    } else {
      console.log(chalk.red("Entity tidak dikenali untuk perintah delete."));
    }
    break;

  case "show":
    if (entity === "Contact") {
      ContactController.showAll();
    } else if (entity === "Groups") {
      GroupsController.showAll();
    } else if (entity === "ContactGroups") {
      ContactGroupsController.showAll();
    } else {
      console.log(chalk.red("Entity tidak dikenali untuk perintah show."));
    }
    break;

  case "help":
    console.log(
      chalk.cyan(`
      Command List:
      - node main.js create Contact <name> <phoneNumber> <company> <email>
      - node main.js create Groups <groupName>
      - node main.js create ContactGroups <contactId> <groupId>
      - node main.js update Contact <id> <name> <phoneNumber> <company> <email>
      - node main.js update Groups <id> <groupName>
      - node main.js update ContactGroups <id> <contactId> <groupId>
      - node main.js delete Contact <id>
      - node main.js delete Groups <id>
      - node main.js delete ContactGroups <id>
      - node main.js show Contact
      - node main.js show Groups
      - node main.js show ContactGroups
      - node main.js help
    `)
    );
    break;

  default:
    console.log(
      chalk.red(
        'Command tidak dikenali. Gunakan "node main.js help" untuk melihat daftar command.'
      )
    );
}
