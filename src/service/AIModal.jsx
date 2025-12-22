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

// Function to try newer Gemini models
async function tryNewerGeminiModels(prompt) {
  const newerModels = [
    'gemini-2.0-flash-exp',
    'gemini-exp-1206',
    'gemini-2.0-flash-thinking-exp-1219',
    'gemini-1.5-flash-8b',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro'
  ];

  for (const modelName of newerModels) {
    try {
      console.log(`Trying model: ${modelName}`);
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
        console.warn(`Model ${modelName} failed with status: ${response.status}`, errorData);
      }
    } catch (err) {
      console.warn(`Model ${modelName} failed:`, err.message);
      continue;
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

    throw new Error('All models failed to generate content');
  } catch (err) {
    console.error('AI generation failed:', err.message);
    throw err;
  }
}
