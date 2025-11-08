import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Sanity configuration
const projectId = '8k581woh';
const dataset = 'production';
const apiVersion = '2024-01-01';

// Get token from environment variable
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('Error: SANITY_API_TOKEN environment variable is not set.');
  console.error(
    'Please set it in your .env file or as an environment variable.'
  );
  process.exit(1);
}

// Create Sanity client
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// Function to publish all draft price categories
async function publishAllPriceCategories() {
  try {
    // Fetch all draft price categories
    const drafts = await client.fetch(
      `*[_type == "priceCategory" && !defined(_publishedAt)]`
    );

    if (drafts.length === 0) {
      console.log(
        'No draft price categories found. All categories are already published.'
      );
      return;
    }

    console.log(
      `Found ${drafts.length} draft price category(ies). Publishing...\n`
    );

    const mutations = drafts.map(draft => ({
      publish: {
        id: draft._id,
      },
    }));

    // Publish all drafts in a single transaction
    await client.mutate({
      mutations,
    });

    console.log(
      `✓ Successfully published ${drafts.length} price category(ies)!`
    );
    drafts.forEach((draft, index) => {
      console.log(`  ${index + 1}. ${draft.title}`);
    });
  } catch (error) {
    console.error('Error publishing price categories:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
}

// Run the publish function
publishAllPriceCategories()
  .then(() => {
    console.log('\nAll done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\nFatal error:', error);
    process.exit(1);
  });
