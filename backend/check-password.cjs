require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  await mongoose.connect(
    process.env.MONGO_URI || process.env.MONGODB_URI
  );

  const UserRole = require('./models/UserRole');

  const user = await UserRole.findOne({
    username: 'admin@masjid.com'
  }).select('+password');

  console.log('Database:', mongoose.connection.name);
  console.log('User found:', !!user);

  if (!user) return;

  console.log('Account status:', user.status);
  console.log('Password stored:', typeof user.password === 'string');

  const password = await new Promise(resolve => {
    rl.question('Enter your existing password: ', resolve);
  });

  const match = user.password?.startsWith('$2')
    ? await bcrypt.compare(password, user.password)
    : password === user.password;

  console.log('PASSWORD MATCH:', match);
}

main()
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(async () => {
    rl.close();
    await mongoose.disconnect();
  });
