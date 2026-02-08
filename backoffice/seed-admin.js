const bcrypt = require("bcrypt");
const mysql = require('mysql2');
const config = require('config');
const dbData = config.get('dbConfig');

async function seedAdminUser() {
  // Create database connection
  const connection = mysql.createConnection({
    host: dbData.host,
    user: dbData.user,
    password: dbData.password,
    database: dbData.database
  });

  try {
    // Connect to database
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Connected to database');

    // Define admin credentials
    const adminUser = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',  // Change this to your desired password
      isAdmin: true
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    // Insert admin user
    const sql_query = "INSERT INTO `users`(username, email, password, isAdmin) VALUES(?, ?, ?, ?)";
    const queryParams = [adminUser.username, adminUser.email, hashedPassword, adminUser.isAdmin];

    await new Promise((resolve, reject) => {
      connection.query(sql_query, queryParams, (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.log('❌ Admin user already exists in database');
            reject(new Error('Admin user already exists'));
          } else {
            reject(err);
          }
        } else {
          console.log('✅ Admin user created successfully!');
          console.log(`   Username: ${adminUser.username}`);
          console.log(`   Email: ${adminUser.email}`);
          console.log(`   Password: ${adminUser.password}`);
          console.log(`   User ID: ${result.insertId}`);
          resolve(result);
        }
      });
    });

  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  } finally {
    connection.end();
    console.log('\nDatabase connection closed');
  }
}

// Run the seed function
seedAdminUser()
  .then(() => {
    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });
