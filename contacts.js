const fs = require("node:fs/promises");
const crypto = require("crypto");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log({ contactsPath });

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(data);
}
// readContacts().then((data) => {
//   console.log(data, typeof data, data[0]);
// });

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}


async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}


async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact){
    return null;
  }
  return contact;
}


async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContacts);
  return contacts[index];
}


async function addContact(contact) {
  const contacts = await readContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};