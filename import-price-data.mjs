import { createClient } from '@sanity/client';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Sanity configuration
const projectId = '8k581woh';
const dataset = 'production';
const apiVersion = '2024-01-01';

// Get token from environment variable or prompt
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('Error: SANITY_API_TOKEN environment variable is not set.');
  console.error('');
  console.error('Please set it by either:');
  console.error('  1. Creating a .env file with: SANITY_API_TOKEN=your-token');
  console.error('     (Copy .env.example to .env and add your token)');
  console.error('  2. Or set it as an environment variable:');
  console.error('     Windows: set SANITY_API_TOKEN=your-token');
  console.error('     Linux/Mac: export SANITY_API_TOKEN=your-token');
  console.error('');
  console.error('To get your token:');
  console.error('1. Go to https://sanity.io/manage');
  console.error('2. Select your project');
  console.error('3. Go to API > Tokens');
  console.error('4. Create a new token with "Editor" permissions');
  process.exit(1);
}

// Create Sanity client
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Use CDN for reads, but not for writes
});

// Read the parsed JSON file
const priceData = JSON.parse(fs.readFileSync('price-parsed.json', 'utf8'));

// Function to import a single category
async function importCategory(category, index) {
  try {
    // Transform the data to match Sanity schema
    const document = {
      _type: 'priceCategory',
      title: category.title,
      colorScheme: category.colorScheme || 'green',
      subcategories: category.subcategories.map((subcategory, subIndex) => ({
        _key: `subcategory-${subIndex}`,
        title: subcategory.title,
        services: subcategory.services.map((service, serviceIndex) => ({
          _type: 'priceService',
          _key: `service-${serviceIndex}`,
          title: service.title,
          price: service.price || '', // Ensure price exists (empty string for insert text)
          ...(service.duration && { duration: service.duration }),
        })),
      })),
    };

    // Create the document in Sanity (as draft)
    const result = await client.create(document);

    // Publish the document so it's visible on the deployed site
    await client.mutate({
      mutations: [
        {
          publish: {
            id: result._id,
          },
        },
      ],
    });

    console.log(
      `✓ Imported and published category ${index + 1}/${priceData.length}: "${category.title}" (ID: ${result._id})`
    );
    return result;
  } catch (error) {
    console.error(
      `✗ Error importing category "${category.title}":`,
      error.message
    );
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
}

// Main import function
async function importAllCategories() {
  console.log(`Starting import of ${priceData.length} categories...\n`);

  const results = [];
  for (let i = 0; i < priceData.length; i++) {
    try {
      const result = await importCategory(priceData[i], i);
      results.push(result);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to import category ${i + 1}:`, error.message);
      // Continue with next category
    }
  }

  console.log(
    `\n✓ Import complete! Successfully imported ${results.length}/${priceData.length} categories.`
  );
  return results;
}

// Run the import
importAllCategories()
  .then(() => {
    console.log('\nAll done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\nFatal error:', error);
    process.exit(1);
  });
