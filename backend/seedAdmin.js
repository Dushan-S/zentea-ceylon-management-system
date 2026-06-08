import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './modules/auth/models/User.js';

// Load environment variables from .env file
dotenv.config();

/**
 * Seed Script to Create Admin User
 * 
 * Usage: node seedAdmin.js [email] [password] [name]
 * 
 * Example: node seedAdmin.js admin@zentea.com SecurePass123! "Admin User"
 * 
 * If no parameters provided, will use default values:
 * - Email: admin@zentea.com
 * - Password: Admin@123456
 * - Name: System Admin
 */

const seedAdmin = async () => {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    const adminEmail = args[0] || 'admin@zentea.com';
    const adminPassword = args[1] || 'Admin@123456';
    const adminName = args[2] || 'System Admin';
    const adminPhone = args[3] || '+94123456789';

    console.log('\n🌱 Starting Admin User Seed Process...\n');

    // Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set. Please check your .env file.');
    }

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    // Check if admin user already exists
    console.log(`🔍 Checking if admin user with email "${adminEmail}" already exists...`);
    const existingAdmin = await User.findOne({
      $or: [
        { email: adminEmail },
        { role: 'Admin', email: adminEmail }
      ]
    });

    if (existingAdmin) {
      console.log(`✓ Admin user already exists:`);
      console.log(`  - Email: ${existingAdmin.email}`);
      console.log(`  - Name: ${existingAdmin.name}`);
      console.log(`  - Unique ID: ${existingAdmin.uniqueId}`);
      console.log(`  - Created: ${existingAdmin.createdAt}`);
      console.log(`  - Active: ${existingAdmin.isActive ? 'Yes ✓' : 'No ✗'}\n`);
      
      if (!existingAdmin.isActive) {
        console.log('⚠️  Admin account is inactive. Activating it...');
        existingAdmin.isActive = true;
        await existingAdmin.save();
        console.log('✅ Admin account activated!\n');
      }

      await mongoose.disconnect();
      console.log('🏁 Seeding Complete\n');
      process.exit(0);
    }

    // Generate unique Admin ID
    const existingAdmins = await User.find({ role: 'Admin' });
    const nextAdminNumber = existingAdmins.length + 1;
    const uniqueId = `ADM-${String(nextAdminNumber).padStart(4, '0')}`;

    // Hash the password
    console.log('🔐 Hashing password...');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Create the admin user
    console.log('👤 Creating admin user...');
    const adminUser = new User({
      name: adminName,
      email: adminEmail.toLowerCase(),
      phone: adminPhone,
      password: hashedPassword,
      role: 'Admin',
      uniqueId: uniqueId,
      company: 'System',
      isActive: true,
      createdBy: 'admin_seed_script'
    });

    const savedAdmin = await adminUser.save();

    // Success message
    console.log('\n✅ Admin User Created Successfully!\n');
    console.log('📋 Admin Details:');
    console.log(`  - Email: ${savedAdmin.email}`);
    console.log(`  - Name: ${savedAdmin.name}`);
    console.log(`  - Phone: ${savedAdmin.phone}`);
    console.log(`  - Unique ID: ${savedAdmin.uniqueId}`);
    console.log(`  - Role: ${savedAdmin.role}`);
    console.log(`  - Active: ${savedAdmin.isActive ? 'Yes ✓' : 'No ✗'}`);
    console.log(`  - Created: ${savedAdmin.createdAt}`);
    console.log(`\n💡 You can now login with:`);
    console.log(`  Email: ${savedAdmin.email}`);
    console.log(`  Password: ${adminPassword}`);
    console.log(`\n🔒 IMPORTANT: Save this password securely. Change it after first login!\n`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('🏁 Seeding Complete\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error creating admin user:\n', error.message);
    console.log('\n📝 Troubleshooting Tips:');
    console.log('  1. Ensure MONGO_URI is set in .env file');
    console.log('  2. Check MongoDB connection string is valid');
    console.log('  3. Ensure password meets requirements (8+ chars, uppercase, number, special char)');
    console.log('  4. Make sure the email is not already registered\n');
    
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();
