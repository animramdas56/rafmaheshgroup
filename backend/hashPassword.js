const bcrypt = require("bcrypt");

async function hashPassword() {
  const password = "123456"; // Your current admin password

  const hash = await bcrypt.hash(password, 10);

  console.log("Hashed Password:");
  console.log(hash);
}

hashPassword();