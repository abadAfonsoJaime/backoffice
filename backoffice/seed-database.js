const bcrypt = require("bcrypt");
const mysql = require('mysql2');
const config = require('config');
const dbData = config.get('dbConfig');

async function seedDatabase() {
  // Create database connection
  const connection = mysql.createConnection({
    host: dbData.host,
    user: dbData.user,
    password: dbData.password,
    database: dbData.database,
    port: dbData.port || 3306
  });

  try {
    // Connect to database
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('✅ Connected to database');
    console.log(`   Host: ${dbData.host}`);
    console.log(`   Database: ${dbData.database}\n`);

    // ===========================
    // 1. SEED ADMIN USER
    // ===========================
    console.log('📝 Seeding Admin User...');
    
    const adminUser = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',  // Change this in production
      isAdmin: true
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    // Check if admin already exists
    const checkUserQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(checkUserQuery, [adminUser.username, adminUser.email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    let adminUserId;
    if (existingUser.length > 0) {
      console.log('⚠️  Admin user already exists, skipping...');
      adminUserId = existingUser[0].id;
    } else {
      // Insert admin user
      const insertUserQuery = "INSERT INTO users(username, email, password, isAdmin) VALUES(?, ?, ?, ?)";
      const userResult = await new Promise((resolve, reject) => {
        connection.query(insertUserQuery, [adminUser.username, adminUser.email, hashedPassword, adminUser.isAdmin], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
      adminUserId = userResult.insertId;
      console.log('✅ Admin user created successfully!');
      console.log(`   Username: ${adminUser.username}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Password: ${adminUser.password}`);
      console.log(`   User ID: ${adminUserId}\n`);
    }

    // ===========================
    // 2. SEED DEFAULT CARDS/POSTS
    // ===========================
    console.log('📝 Seeding Default Cards/Posts...');

    const defaultCards = [
      {
        title: 'Welcome to Backoffice',
        description: 'This is your first card. You can edit or delete this card from the admin panel.',
        landingPage: 'https://example.com/welcome',
        buttonText: 'Learn More',
        isVisible: true
      },
      {
        title: 'Getting Started Guide',
        description: 'Learn how to manage your content effectively. This guide covers all the basic features of the backoffice system.',
        landingPage: 'https://example.com/guide',
        buttonText: 'Read Guide',
        isVisible: true
      },
      {
        title: 'Feature Announcement',
        description: 'Check out our latest features and updates. Stay informed about new capabilities and improvements.',
        landingPage: 'https://example.com/features',
        buttonText: 'Explore',
        isVisible: true
      },
      {
        title: 'Contact Support',
        description: 'Need help? Our support team is here to assist you 24/7. Reach out anytime for assistance.',
        landingPage: 'https://example.com/support',
        buttonText: 'Get Help',
        isVisible: false
      }
    ];

    let cardsInserted = 0;
    const insertCardQuery = "INSERT INTO posts(title, description, landingPage, buttonText, isVisible) VALUES(?, ?, ?, ?, ?)";
    
    for (const card of defaultCards) {
      try {
        await new Promise((resolve, reject) => {
          connection.query(
            insertCardQuery,
            [card.title, card.description, card.landingPage, card.buttonText, card.isVisible],
            (err, result) => {
              if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                  console.log(`⚠️  Card "${card.title}" already exists, skipping...`);
                  resolve(null);
                } else {
                  reject(err);
                }
              } else {
                console.log(`✅ Created card: "${card.title}" (ID: ${result.insertId})`);
                cardsInserted++;
                resolve(result);
              }
            }
          );
        });
      } catch (error) {
        console.error(`❌ Error inserting card "${card.title}":`, error.message);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Total cards attempted: ${defaultCards.length}`);
    console.log(`   New cards created: ${cardsInserted}`);

  } catch (error) {
    console.error('\n❌ Error during seeding:', error.message);
    throw error;
  } finally {
    connection.end();
    console.log('\n🔒 Database connection closed');
  }
}

// Run the seed function
console.log('🌱 Starting database seeding...\n');
seedDatabase()
  .then(() => {
    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error.message);
    process.exit(1);
  });
