import fs from 'fs';
import path from 'path';
import axios from 'axios';

const envPath = path.resolve(process.cwd(), '.env.local');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const apiKeyMatch = envContent.match(/VITE_GOOGLE_GEMINI_AI_API_KEY=(.*)/);
  const API_KEY = apiKeyMatch ? apiKeyMatch[1].trim() : null;

  if (!API_KEY) {
    console.log("ERROR: API Key not found in .env.local");
    process.exit(1);
  }

  // Check if key looks roughly valid (starts with AIza)
  if (!API_KEY.startsWith("AIza")) {
      console.log(`WARNING: API Key does not start with AIza. It starts with: ${API_KEY.substring(0, 4)}`);
  } else {
      console.log("API Key format looks correct (starts with AIza).");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const models = response.data.models || [];
    console.log("SUCCESS: Models fetched.");
    models.forEach(m => {
        if (m.name.includes('gemini')) {
             console.log(`MODEL: ${m.name}`);
        }
    });
  } catch (error) {
      if (error.response) {
          console.log("API ERROR STATUS:", error.response.status);
          console.log("API ERROR DATA:", JSON.stringify(error.response.data));
      } else {
          console.log("NETWORK/SCRIPT ERROR:", error.message);
      }
  }

} catch (err) {
  console.log("FS ERROR:", err.message);
}
