# Import Price Data to Sanity

This script imports the parsed price data from `price-parsed.json` into your
Sanity database.

## Prerequisites

1. Make sure you have a Sanity API token with write permissions
2. The `price-parsed.json` file should exist in the project root

## Getting Your Sanity API Token

1. Go to https://sanity.io/manage
2. Select your project (ID: `8k581woh`)
3. Navigate to **API** > **Tokens**
4. Click **Add API token**
5. Give it a name (e.g., "Price Import Script")
6. Select **Editor** permissions (or **Administrator** if you need to delete
   documents)
7. Copy the token

## Running the Import

### Option 1: Using npm script

Set the token as an environment variable and run:

**Windows (PowerShell):**

```powershell
$env:SANITY_API_TOKEN="your-token-here"
npm run import-price
```

**Windows (Command Prompt):**

```cmd
set SANITY_API_TOKEN=your-token-here
npm run import-price
```

**Linux/Mac:**

```bash
export SANITY_API_TOKEN=your-token-here
npm run import-price
```

### Option 2: Direct node command

**Windows (PowerShell):**

```powershell
$env:SANITY_API_TOKEN="your-token-here"
node import-price-data.js
```

**Windows (Command Prompt):**

```cmd
set SANITY_API_TOKEN=your-token-here
node import-price-data.js
```

**Linux/Mac:**

```bash
export SANITY_API_TOKEN=your-token-here
node import-price-data.js
```

## What the Script Does

1. Reads `price-parsed.json`
2. Creates documents in Sanity with type `priceCategory`
3. Imports all categories, subcategories, and services
4. Shows progress for each category imported

## Notes

- The script will create **new documents** each time it runs. If you run it
  multiple times, you'll get duplicate categories.
- To avoid duplicates, you can manually delete existing price categories in
  Sanity Studio before re-importing.
- The script includes a small delay between imports to avoid rate limiting.

## Troubleshooting

**Error: SANITY_API_TOKEN environment variable is not set**

- Make sure you've set the environment variable before running the script
- The token must have write permissions

**Error: Unauthorized**

- Check that your token is correct
- Verify the token has the right permissions (Editor or Administrator)

**Error: Invalid document**

- Check that `price-parsed.json` is valid JSON
- Verify the data structure matches the schema
