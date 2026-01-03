export async function POST(request) {
  const { url } = await request.json();

  if (!url) {
    return Response.json({ error: 'URL is required' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `Go to this recipe URL and extract the recipe information: ${url}

CRITICAL: Each ingredient MUST include the FULL measurement/quantity. 
- CORRECT: "1 ½ tsp Italian seasoning", "4 garlic cloves, minced", "½ cup dried red lentils"
- WRONG: "Italian seasoning", "garlic cloves, minced", "dried red lentils"

Return the response in this EXACT JSON format with no other text:
{
  "title": "Recipe Name",
  "servings": "X servings" or null,
  "prepTime": "X minutes" or null,
  "cookTime": "X minutes" or null,
  "ingredients": ["1 cup flour", "2 tbsp sugar", "½ tsp salt"],
  "instructions": ["Step 1 full text", "Step 2 full text"]
}

IMPORTANT RULES:
1. EVERY ingredient must start with a quantity (e.g., "1 cup", "2 tbsp", "½ tsp", "1 medium", "4 cloves")
2. Include ALL ingredients - do not skip any
3. Include ALL instruction steps - do not summarize
4. Keep the original measurements exactly as written on the recipe page`
        }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return Response.json({ error: data.error?.message || 'API request failed' }, { status: response.status });
    }

    const textContent = data.content
      ?.filter(block => block.type === 'text')
      ?.map(block => block.text)
      ?.join('') || '';

    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const recipe = JSON.parse(jsonMatch[0]);
      return Response.json({ recipe });
    } else {
      return Response.json({ error: 'Could not extract recipe from page' }, { status: 422 });
    }
  } catch (error) {
    console.error('Recipe extraction error:', error);
    return Response.json({ error: 'Failed to extract recipe' }, { status: 500 });
  }
}
