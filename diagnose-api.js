// Diagnostic script to check available Gemini models
// Run this with: node diagnose-api.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

if (!API_KEY) {
  console.error('❌ VITE_GOOGLE_GEMINI_AI_API_KEY not found in .env file');
  process.exit(1);
}

console.log('✅ API Key found:', API_KEY.substring(0, 10) + '...');

const genAI = new GoogleGenerativeAI(API_KEY);

// Try to list available models
async function listModels() {
  try {
    console.log('\n📋 Attempting to list available models...\n');
    
    // Try a simple generation with the most common model
    const modelsToTest = [
      'gemini-pro',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-1.0-pro'
    ];

    for (const modelName of modelsToTest) {
      try {
        console.log(`Testing ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hello');
        const response = await result.response;
        const text = response.text();
        console.log(`  ✅ ${modelName} works! Response: ${text.substring(0, 50)}...\n`);
        break; // Stop after first success
      } catch (error) {
        console.log(`  ❌ ${modelName} failed: ${error.message}\n`);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listModels();
