'use client';

import { useState } from 'react';

export default function RecipeRescue() {
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});

  const extractRecipe = async () => {
    if (!url.trim()) {
      setError('Please paste a recipe URL first!');
      return;
    }
    
    setLoading(true);
    setError('');
    setRecipe(null);
    setCheckedIngredients({});
    setCheckedSteps({});

    try {
      const response = await fetch('/api/extract-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again!');
      } else {
        setRecipe(data.recipe);
      }
    } catch (err) {
      setError('Something went wrong. Please try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyRecipe = () => {
    if (!recipe) return;
    const text = `${recipe.title}\n\n` +
      `INGREDIENTS:\n${recipe.ingredients.map(i => `* ${i}`).join('\n')}\n\n` +
      `INSTRUCTIONS:\n${recipe.instructions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text);
  };

  const toggleIngredient = (idx) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const pixelBorder = (color = '#6b5b95', bg = '#f8f7ff') => ({
    background: bg,
    boxShadow: `
      4px 0 0 0 ${color},
      -4px 0 0 0 ${color},
      0 4px 0 0 ${color},
      0 -4px 0 0 ${color},
      4px 4px 0 0 ${color},
      -4px 4px 0 0 ${color},
      4px -4px 0 0 ${color},
      -4px -4px 0 0 ${color}
    `
  });

  const PixelHeart = ({ size = 12, color = '#9381ff' }) => (
    <svg width={size} height={size} viewBox="0 0 8 7" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="0" width="2" height="1" fill={color}/>
      <rect x="5" y="0" width="2" height="1" fill={color}/>
      <rect x="0" y="1" width="4" height="1" fill={color}/>
      <rect x="4" y="1" width="4" height="1" fill={color}/>
      <rect x="0" y="2" width="8" height="1" fill={color}/>
      <rect x="0" y="3" width="8" height="1" fill={color}/>
      <rect x="1" y="4" width="6" height="1" fill={color}/>
      <rect x="2" y="5" width="4" height="1" fill={color}/>
      <rect x="3" y="6" width="2" height="1" fill={color}/>
    </svg>
  );

  const PixelStar = ({ size = 12, color = '#b8c0ff' }) => (
    <svg width={size} height={size} viewBox="0 0 7 7" style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="0" width="1" height="1" fill={color}/>
      <rect x="3" y="1" width="1" height="1" fill={color}/>
      <rect x="0" y="2" width="7" height="1" fill={color}/>
      <rect x="1" y="3" width="5" height="1" fill={color}/>
      <rect x="1" y="4" width="2" height="1" fill={color}/>
      <rect x="4" y="4" width="2" height="1" fill={color}/>
      <rect x="0" y="5" width="2" height="1" fill={color}/>
      <rect x="5" y="5" width="2" height="1" fill={color}/>
    </svg>
  );

  const PixelSparkle = ({ size = 10, color = '#c8b6ff' }) => (
    <svg width={size} height={size} viewBox="0 0 5 5" style={{ imageRendering: 'pixelated' }}>
      <rect x="2" y="0" width="1" height="1" fill={color}/>
      <rect x="0" y="2" width="1" height="1" fill={color}/>
      <rect x="2" y="2" width="1" height="1" fill={color}/>
      <rect x="4" y="2" width="1" height="1" fill={color}/>
      <rect x="2" y="4" width="1" height="1" fill={color}/>
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0eeff',
      backgroundImage: `
        linear-gradient(90deg, #e0dbff 1px, transparent 1px),
        linear-gradient(#e0dbff 1px, transparent 1px)
      `,
      backgroundSize: '16px 16px',
      padding: '24px 16px',
      fontFamily: "'VT323', 'Courier New', monospace"
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '12px' 
          }}>
            <PixelStar size={20} />
            <PixelHeart size={24} />
            <PixelStar size={20} />
          </div>
          <h1 style={{
            fontSize: '32px',
            color: '#5b4b8a',
            margin: '0 0 4px 0',
            fontFamily: "'VT323', monospace",
            letterSpacing: '2px',
            textShadow: '3px 3px 0 #d4cfff'
          }}>
            RECIPE RESCUE
          </h1>
          <p style={{ 
            color: '#8a7fb8', 
            fontSize: '16px', 
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <PixelSparkle size={10} />
            rescue recipes from ad chaos!
            <PixelSparkle size={10} />
          </p>
        </div>

        <div style={{
          ...pixelBorder('#6b5b95', '#f8f7ff'),
          padding: '20px',
          marginBottom: '24px'
        }}>
          <label style={{
            display: 'block',
            color: '#5b4b8a',
            fontSize: '16px',
            marginBottom: '8px'
          }}>
            {'>'} PASTE RECIPE URL:
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            onKeyDown={(e) => e.key === 'Enter' && extractRecipe()}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              fontFamily: "'VT323', monospace",
              border: 'none',
              ...pixelBorder('#a99fc4', '#ffffff'),
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={extractRecipe}
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '16px',
              padding: '14px',
              fontSize: '18px',
              fontFamily: "'VT323', monospace",
              letterSpacing: '1px',
              ...pixelBorder(loading ? '#a99fc4' : '#4a3f73', loading ? '#c8c0e8' : '#9381ff'),
              color: 'white',
              border: 'none',
              cursor: loading ? 'wait' : 'pointer',
              textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => !loading && (e.target.style.transform = 'translate(2px, 2px)')}
            onMouseUp={(e) => e.target.style.transform = 'translate(0, 0)'}
            onMouseLeave={(e) => e.target.style.transform = 'translate(0, 0)'}
          >
            {loading ? (
              <span>{'~'} RESCUING... {'~'}</span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <PixelHeart size={14} color="#fff" /> GET RECIPE <PixelHeart size={14} color="#fff" />
              </span>
            )}
          </button>
        </div>

        {error && (
          <div style={{
            ...pixelBorder('#a99fc4', '#ebe8ff'),
            padding: '16px',
            textAlign: 'center',
            color: '#5b4b8a',
            marginBottom: '24px',
            fontSize: '16px'
          }}>
            {'>'} {error}
          </div>
        )}

        {recipe && (
          <div style={{
            ...pixelBorder('#6b5b95', '#fdfcff'),
            padding: '24px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              gap: '4px'
            }}>
              <PixelHeart size={12} color="#b8b3e3" />
              <PixelStar size={12} color="#9381ff" />
              <PixelSparkle size={12} color="#c8b6ff" />
            </div>

            <h2 style={{
              fontSize: '22px',
              color: '#5b4b8a',
              margin: '0 0 12px 0',
              textAlign: 'center',
              borderBottom: '4px dashed #d4cfff',
              paddingBottom: '12px',
              textShadow: '2px 2px 0 #f0eeff'
            }}>
              {recipe.title.toUpperCase()}
            </h2>

            {(recipe.servings || recipe.prepTime || recipe.cookTime) && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '16px',
                fontSize: '14px',
                color: '#8a7fb8',
                flexWrap: 'wrap'
              }}>
                {recipe.servings && <span>[{recipe.servings}]</span>}
                {recipe.prepTime && <span>[prep: {recipe.prepTime}]</span>}
                {recipe.cookTime && <span>[cook: {recipe.cookTime}]</span>}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '18px',
                color: '#7c6cbc',
                margin: '0 0 12px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <PixelHeart size={14} /> INGREDIENTS
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {recipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    style={{
                      padding: '8px 0',
                      borderBottom: '2px dotted #e8e4ff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      color: checkedIngredients[idx] ? '#c4c0d8' : '#4a3f73',
                      fontSize: '16px',
                      transition: 'color 0.1s'
                    }}
                  >
                    <span style={{
                      width: '16px',
                      height: '16px',
                      flexShrink: 0,
                      marginTop: '2px',
                      ...pixelBorder('#a99fc4', checkedIngredients[idx] ? '#c8b6ff' : '#fff'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}>
                      {checkedIngredients[idx] && '♥'}
                    </span>
                    <span style={{
                      textDecoration: checkedIngredients[idx] ? 'line-through' : 'none'
                    }}>
                      {ing}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{
                fontSize: '18px',
                color: '#7c6cbc',
                margin: '0 0 12px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <PixelStar size={14} /> INSTRUCTIONS
              </h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {recipe.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    style={{
                      padding: '10px 0',
                      borderBottom: '2px dotted #e8e4ff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      color: checkedSteps[idx] ? '#c4c0d8' : '#4a3f73',
                      fontSize: '16px',
                      lineHeight: '1.4'
                    }}
                  >
                    <span style={{
                      width: '24px',
                      height: '24px',
                      flexShrink: 0,
                      ...pixelBorder('#a99fc4', checkedSteps[idx] ? '#b8c0ff' : '#f0eeff'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#5b4b8a'
                    }}>
                      {checkedSteps[idx] ? '✓' : idx + 1}
                    </span>
                    <span style={{
                      textDecoration: checkedSteps[idx] ? 'line-through' : 'none'
                    }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={copyRecipe}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '14px',
                fontFamily: "'VT323', monospace",
                ...pixelBorder('#a99fc4', '#fff'),
                color: '#5b4b8a',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '20px auto 0 auto'
              }}
              onMouseDown={(e) => e.target.style.transform = 'translate(2px, 2px)'}
              onMouseUp={(e) => e.target.style.transform = 'translate(0, 0)'}
              onMouseLeave={(e) => e.target.style.transform = 'translate(0, 0)'}
            >
              [COPY RECIPE]
            </button>
          </div>
        )}

        <p style={{
          textAlign: 'center',
          color: '#8a7fb8',
          fontSize: '14px',
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <PixelHeart size={10} />
          made with love
          <PixelHeart size={10} />
        </p>
      </div>
    </div>
  );
}
