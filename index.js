const { program } = require("commander");
const contactsList = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsList.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const contact = await contactsList.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const newContact = await contactsList.addContact(name, email, phone);
      console.log(newContact);
      break;
    case "update":
      const updateContact = await contactsList.updateContact(
        id,
        name,
        email,
        phone
      );
      console.log(updateContact);
      break;
    case "remove":
      const deleteContact = await contactsList.removeContact(id);
      console.log(deleteContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
};

invokeAction(options);
