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
          content: `Go to this recipe URL and extract ONLY the recipe information: ${url}

Return the response in this EXACT JSON format with no other text:
{
  "title": "Recipe Name",
  "servings": "X servings" or null,
  "prepTime": "X minutes" or null,
  "cookTime": "X minutes" or null,
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["Step 1 text", "Step 2 text"]
}

Be thorough - get ALL ingredients and ALL steps. Keep ingredient measurements and step details intact.`
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
