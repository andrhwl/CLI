const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const books = await listContacts();
      return console.table(books);

    case "get":
      const book = await getContactById(id);
      return console.log(book);

    case "add":
      const addedBook = await addContact({ name, email, phone });
      return console.log(addedBook);

    case "remove":
      const removedBook = await removeContact(id);
      return console.log(removedBook);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
