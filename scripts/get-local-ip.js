#!/usr/bin/env node

/**
 * Helper script to detect and display your local network IP address
 * for configuring Supabase to work with physical devices
 */

const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName];
    for (const network of networkInterface) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (network.family === 'IPv4' && !network.internal) {
        addresses.push({
          name: interfaceName,
          address: network.address,
        });
      }
    }
  }

  return addresses;
}

function createEnvFile(ipAddress) {
  // eslint-disable-next-line no-undef
  const scriptDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();
  const envPath = path.join(scriptDir, '..', '.env');
  const envContent = `# Supabase Configuration for Physical Device Testing
# Generated on ${new Date().toLocaleString()}

# Your laptop's local network IP address
# Both your laptop and phone must be on the same Wi-Fi network
EXPO_PUBLIC_SUPABASE_URL=http://${ipAddress}:54321

# Supabase Anonymous Key (default local development key)
# Get your actual key by running: npx supabase status
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# ============================================
# TROUBLESHOOTING
# ============================================
# If this doesn't work:
# 1. Ensure Supabase is running: npx supabase status
# 2. Ensure your phone and laptop are on the same Wi-Fi network
# 3. Check if your firewall is blocking connections on port 54321
# 4. Restart the Expo dev server after changing this file
`;

  try {
    fs.writeFileSync(envPath, envContent);
    return true;
  } catch (_error) {
    // Ignore write errors, we'll inform the user to create manually
    return false;
  }
}

console.log('\n🔍 Detecting your local network IP address...\n');

const addresses = getLocalIP();

if (addresses.length === 0) {
  console.log('❌ No network interfaces found.');
  console.log('   Please ensure you are connected to a network.\n');
  process.exit(1);
}

console.log('📡 Found network interfaces:\n');
addresses.forEach((addr, index) => {
  console.log(`   ${index + 1}. ${addr.name}: ${addr.address}`);
});

const primaryAddress = addresses[0].address;

console.log('\n✅ Primary IP address: ' + primaryAddress);
console.log('\n📝 Configuration for Supabase:\n');
console.log('   Add this to your .env file:');
console.log(`   EXPO_PUBLIC_SUPABASE_URL=http://${primaryAddress}:54321`);

// Attempt to create/update .env file
const envCreated = createEnvFile(primaryAddress);

if (envCreated) {
  console.log('\n✨ .env file has been created/updated automatically!\n');
} else {
  console.log('\n⚠️  Could not automatically create .env file.');
  console.log('   Please create it manually with the configuration above.\n');
}

console.log('📱 Next steps:');
console.log('   1. Ensure Supabase is running: npx supabase start');
console.log('   2. Restart your Expo dev server: npm start');
console.log('   3. Scan the QR code with your physical device');
console.log('   4. Both devices must be on the same Wi-Fi network');
console.log('\n💡 Tip: Run this script again if your IP changes (e.g., different network)\n');

