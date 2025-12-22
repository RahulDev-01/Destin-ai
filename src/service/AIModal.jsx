// AI Service for Travel Planner - Using the same reliable pattern as SwiftResume AI
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

// Helper to safely extract text from various possible response shapes
function extractText(response) {
  try {
    // If response is a JSON object and contains a direct text property
    if (response && typeof response === 'object') {
      // For a standard response with text or output_text
      if (response.text) {
        return response.text;
      }
      if (response.output_text) {
        return response.output_text;
      }

      // Look for candidates -> content -> parts -> text
      const candidates = response?.candidates || response?.response?.candidates;
      if (Array.isArray(candidates) && candidates.length > 0) {
        const parts = candidates[0]?.content?.parts || [];
        const textPart = parts.find(p => typeof p.text === 'string');
        if (textPart) return textPart.text;
      }
    }
  } catch (e) {
    console.error('Error extracting text from response:', e);
  }
  return '';
}

// Helper function for exponential backoff delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to get list of available models
async function getAvailableModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!response.ok) {
      console.warn('Failed to fetch models list');
      return [];
    }
    const data = await response.json();
    const models = data.models || [];

    // Filter to only models that support generateContent
    const availableModels = models
      .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
      .map(m => m.name.replace('models/', ''));

    console.log('📋 Available models:', availableModels);
    return availableModels;
  } catch (err) {
    console.warn('Error fetching available models:', err.message);
    return [];
  }
}

// Function to try newer Gemini models with retry logic
async function tryNewerGeminiModels(prompt) {
  // First, get list of available models
  const availableModels = await getAvailableModels();

  // Our preferred models in order of preference
  const preferredModels = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash',
    'gemini-2.0-flash-exp',
    'gemini-exp-1206',
    'gemini-flash-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ];

  // Filter to only use models that are available
  const modelsToTry = preferredModels.filter(model =>
    availableModels.includes(model) || availableModels.length === 0 // If we couldn't fetch list, try anyway
  );

  if (modelsToTry.length === 0 && availableModels.length > 0) {
    // None of our preferred models are available, use the first available one
    console.log('⚠️ None of preferred models available, using first available model');
    modelsToTry.push(availableModels[0]);
  }

  console.log('🎯 Models to try:', modelsToTry);

  for (const modelName of modelsToTry) {
    let retryCount = 0;
    const maxRetries = 1; // Reduced to fail faster and try next model

    while (retryCount <= maxRetries) {
      try {
        if (retryCount === 0) {
          console.log(`Trying model: ${modelName}`);
        } else {
          console.log(`Retry ${retryCount}/${maxRetries} for ${modelName}...`);
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const text = extractText(data);
          if (text) {
            console.log(`✅ Successfully used model: ${modelName}`);
            return text;
          }
        } else {
          const errorData = await response.json();
          const status = response.status;

          if (status === 429) {
            // Rate limit - retry with exponential backoff
            if (retryCount < maxRetries) {
              const waitTime = Math.pow(2, retryCount + 1) * 1000; // 2s, 4s, 8s
              console.log(`Rate limit hit for ${modelName}. Waiting ${waitTime / 1000}s before retry...`);
              await delay(waitTime);
              retryCount++;
              continue; // Retry same model
            } else {
              console.warn(`Model ${modelName} rate limited after ${maxRetries} retries`);
              break; // Move to next model
            }
          } else if (status === 404) {
            // Model not found - skip to next model immediately
            console.warn(`Model ${modelName} not found (404), trying next model...`);
            break; // Move to next model
          } else {
            console.warn(`Model ${modelName} failed with status: ${status}`, errorData);
            break; // Move to next model
          }
        }
      } catch (err) {
        console.warn(`Model ${modelName} failed:`, err.message);
        break; // Move to next model on error
      }
    }

    // Add a small delay before trying the next model to avoid rapid-fire requests
    if (modelName !== modelsToTry[modelsToTry.length - 1]) {
      console.log('Waiting 2s before trying next model...');
      await delay(2000);
    }
  }

  return null;
}

// Export a simple function to send a text prompt and get a text response
export async function sendMessage(prompt) {
  console.log('🤖 AI Request:', prompt.substring(0, 100) + '...');

  if (!apiKey) {
    throw new Error('Missing API key. Please set VITE_GOOGLE_GEMINI_AI_API_KEY in your environment.');
  }

  try {
    console.log('Attempting to generate content with Gemini models...');
    const result = await tryNewerGeminiModels(prompt);
    if (result) {
      console.log('✅ AI response generated successfully');
      return result;
    }

    // If all models failed, provide helpful error message
    throw new Error('All models failed. This could be due to rate limits (429) or unavailable models (404). Please wait a few minutes and try again, or check your API key permissions.');
  } catch (err) {
    console.error('AI generation failed:', err.message);
    throw err;
  }
}
