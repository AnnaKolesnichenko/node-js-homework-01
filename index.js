const contacts = require('./db/contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({action, id, name, phone, email}) => {
    switch(action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            return console.table(allContacts);
            break;
        case 'get':
            const contactById = await contacts.getContactById(id);
            return console.log(contactById);
            break;
        case 'remove':
            const removeById = await contacts.removeContact(id);
            return console.log(removeById);
        case 'add':
            const newContact = await contacts.addContact({name, email, phone});
            return console.log(newContact);

        default: 
            console.log("Unknown case");
    }
};

invokeAction(argv);

// const actionIndex = process.argv.indexOf("--action");
// if(actionIndex !== -1) {
//     const actionType = process.argv[actionIndex + 1];
//     invokeAction({actionType});
// }
// invokeAction({action: "list"});
// invokeAction({action: "byId", id: "qdggE76Jtbfd9eWJHrssH"});
// invokeAction({action: 'remove', id: "e6ywwRe4jcqxXfCZOj_1e"});
// invokeAction({action: 'add', name: "anna", email: "akdjrhg@ggg.com", phone: "77777"});

