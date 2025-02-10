const { findContactsByEmailOrPhone, createPrimaryContact, createSecondaryContact } = require("../models/contactModel");

async function identifyCustomer(req, res) {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: "Email or phoneNumber is required" });
  }

  let contacts = await findContactsByEmailOrPhone(email, phoneNumber);

  if (contacts.length === 0) {
    const newContact = await createPrimaryContact(email, phoneNumber);
    return res.json({
      contact: {
        primaryContatctId: newContact.id,
        emails: [newContact.email].filter(Boolean),
        phoneNumbers: [newContact.phoneNumber].filter(Boolean),
        secondaryContactIds: [],
      },
    });
  }

  let primaryContact = contacts.find(c => c.linkPrecedence === "primary") || contacts[0];
  let secondaryContactIds = contacts.filter(c => c.linkPrecedence === "secondary").map(c => c.id);
  let emails = new Set(contacts.map(c => c.email).filter(Boolean));
  let phoneNumbers = new Set(contacts.map(c => c.phoneNumber).filter(Boolean));

  if (!contacts.some(c => c.email === email && c.phoneNumber === phoneNumber)) {
    const newSecondary = await createSecondaryContact(email, phoneNumber, primaryContact.id);
    secondaryContactIds.push(newSecondary.id);
    if (email) emails.add(email);
    if (phoneNumber) phoneNumbers.add(phoneNumber);
  }

  res.json({
    contact: {
      primaryContatctId: primaryContact.id,
      emails: Array.from(emails),
      phoneNumbers: Array.from(phoneNumbers),
      secondaryContactIds,
    },
  });
}

module.exports = { identifyCustomer };
