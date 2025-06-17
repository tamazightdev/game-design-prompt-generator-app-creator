import React, { useState, useCallback } from 'react';
import { Palette, Sparkles, Eye, Download, Copy, RefreshCw } from 'lucide-react';
import './UniversalGameGenerator.css';

const UniversalGameGenerator = () => {
  const [userInput, setUserInput] = useState('');
  const [framework, setFramework] = useState('vite');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  
  // Color customization state
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#667eea');
  const [secondaryColor, setSecondaryColor] = useState('#764ba2');
  const [generatedTheme, setGeneratedTheme] = useState(null);
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);

  // Predefined color combinations
  const colorPresets = [
    { name: 'Ocean Depths', primary: '#1e3a8a', secondary: '#06b6d4', description: 'Deep blue to cyan' },
    { name: 'Sunset Blaze', primary: '#dc2626', secondary: '#f59e0b', description: 'Red to amber' },
    { name: 'Forest Mystique', primary: '#166534', secondary: '#10b981', description: 'Forest green to emerald' },
    { name: 'Purple Cosmos', primary: '#581c87', secondary: '#a855f7', description: 'Deep purple to violet' },
    { name: 'Arctic Aurora', primary: '#0f172a', secondary: '#38bdf8', description: 'Midnight to sky blue' },
    { name: 'Volcanic Energy', primary: '#7c2d12', secondary: '#fb923c', description: 'Dark red to orange' },
    { name: 'Cyber Neon', primary: '#0c4a6e', secondary: '#22d3ee', description: 'Dark blue to cyan' },
    { name: 'Royal Elegance', primary: '#4c1d95', secondary: '#c084fc', description: 'Royal purple to lavender' }
  ];

  // Generate color theme using the XML prompt template
  const generateColorTheme = useCallback(async (startColor, endColor) => {
    setIsGeneratingTheme(true);
    
    try {
      // Simulate AI processing with intelligent color analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Convert colors to hex if they're not already
      const hexStart = startColor.startsWith('#') ? startColor : startColor;
      const hexEnd = endColor.startsWith('#') ? endColor : endColor;
      
      // Generate theme name based on colors
      const colorNames = {
        '#1e3a8a': 'Ocean', '#06b6d4': 'Cyan', '#dc2626': 'Crimson', '#f59e0b': 'Amber',
        '#166534': 'Forest', '#10b981': 'Emerald', '#581c87': 'Royal', '#a855f7': 'Violet',
        '#0f172a': 'Midnight', '#38bdf8': 'Sky', '#7c2d12': 'Volcanic', '#fb923c': 'Sunset',
        '#0c4a6e': 'Deep', '#22d3ee': 'Electric', '#4c1d95': 'Regal', '#c084fc': 'Lavender'
      };
      
      const startName = colorNames[hexStart] || 'Dynamic';
      const endName = colorNames[hexEnd] || 'Vibrant';
      const themeName = `${startName} ${endName} Flow`;
      
      // Generate intermediate colors
      const accentColor = blendColors(hexStart, hexEnd, 0.5);
      const surfaceColor = '#0f172a';
      const textPrimary = '#f8fafc';
      const textSecondary = '#cbd5e1';
      
      const theme = {
        name: themeName,
        concept: `A ${themeName.toLowerCase()} theme that embodies the transition from ${startName.toLowerCase()} depths to ${endName.toLowerCase()} brilliance, creating a sophisticated glass morphic aesthetic.`,
        gradient: {
          start: hexStart,
          end: hexEnd,
          css: `linear-gradient(135deg, ${hexStart} 0%, ${hexEnd} 100%)`
        },
        palette: {
          primary: hexStart,
          secondary: hexEnd,
          accent: accentColor,
          textPrimary: textPrimary,
          textSecondary: textSecondary,
          surface: surfaceColor,
          glassMorphic: `rgba(${hexToRgb(hexStart).join(', ')}, 0.1)`
        },
        elements: {
          background: `The app background features the full gradient with glass morphic overlays using backdrop-filter: blur(10px) and rgba transparency.`,
          headers: `Navigation bars use a horizontal slice of the gradient with 20% opacity glass morphic effect.`,
          buttons: `Primary CTA buttons showcase the full gradient with hover states that intensify the colors by 20%.`,
          cards: `Panels use glass morphic styling with ${accentColor} borders and subtle gradient backgrounds.`,
          icons: `Key icons incorporate the gradient for brand consistency and visual hierarchy.`
        },
        aesthetic: `Bold, futuristic, and vibrant with a sleek glass morphic feel that conveys energy and sophistication.`
      };
      
      setGeneratedTheme(theme);
    } catch (error) {
      console.error('Theme generation error:', error);
      alert('An error occurred during theme generation. Please try again.');
    } finally {
      setIsGeneratingTheme(false);
    }
  }, []);

  // Helper function to blend two colors
  const blendColors = (color1, color2, ratio) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    const blended = rgb1.map((c1, i) => {
      const c2 = rgb2[i];
      return Math.round(c1 * (1 - ratio) + c2 * ratio);
    });
    
    return rgbToHex(blended[0], blended[1], blended[2]);
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  };

  // Helper function to convert RGB to hex
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Apply color preset
  const applyColorPreset = (preset) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    generateColorTheme(preset.primary, preset.secondary);
  };

  // Generate random colors
  const generateRandomColors = () => {
    const randomHex = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const newPrimary = randomHex();
    const newSecondary = randomHex();
    setPrimaryColor(newPrimary);
    setSecondaryColor(newSecondary);
    generateColorTheme(newPrimary, newSecondary);
  };

  // Topic analysis function (existing code)
  const analyzeTopicForGameElements = (topic) => {
    const topicLower = topic.toLowerCase();
    
    const topicPatterns = {
      climate: {
        resources: ['Carbon Emissions', 'Economic Growth', 'Public Support', 'Technology Level', 'Environmental Health'],
        actions: ['Implement Green Tech', 'Carbon Tax Policy', 'Industrial Regulation', 'Public Education'],
        theme: 'environmental',
        duration: 120,
        concepts: ['carbon cycle', 'renewable energy', 'climate feedback loops', 'policy trade-offs']
      },
      space: {
        resources: ['Fuel', 'Crew Health', 'Mission Success', 'Budget', 'Public Interest'],
        actions: ['Launch Mission', 'Upgrade Equipment', 'Train Crew', 'Secure Funding'],
        theme: 'space',
        duration: 90,
        concepts: ['orbital mechanics', 'life support systems', 'mission planning', 'risk management']
      },
      startup: {
        resources: ['Cash Flow', 'Product Quality', 'Market Share', 'Team Morale', 'Customer Satisfaction'],
        actions: ['Hire Talent', 'Marketing Campaign', 'Product Development', 'Seek Investment'],
        theme: 'business',
        duration: 100,
        concepts: ['lean startup', 'product-market fit', 'burn rate', 'scaling challenges']
      },
      pandemic: {
        resources: ['Public Health', 'Economic Stability', 'Healthcare Capacity', 'Social Cohesion', 'Government Trust'],
        actions: ['Implement Lockdown', 'Vaccine Distribution', 'Economic Support', 'Public Communication'],
        theme: 'medical',
        duration: 150,
        concepts: ['epidemiology', 'herd immunity', 'contact tracing', 'policy balance']
      },
      education: {
        resources: ['Student Engagement', 'Learning Outcomes', 'Teacher Satisfaction', 'Budget', 'Innovation Level'],
        actions: ['Adopt New Technology', 'Teacher Training', 'Curriculum Reform', 'Infrastructure Investment'],
        theme: 'academic',
        duration: 90,
        concepts: ['pedagogical methods', 'educational technology', 'assessment strategies', 'equity in education']
      }
    };

    let gameElements = null;
    for (const [key, elements] of Object.entries(topicPatterns)) {
      if (topicLower.includes(key)) {
        gameElements = elements;
        break;
      }
    }

    if (!gameElements) {
      gameElements = {
        resources: ['Resource A', 'Resource B', 'Resource C', 'Resource D', 'Resource E'],
        actions: ['Action 1', 'Action 2', 'Action 3', 'Action 4'],
        theme: 'generic',
        duration: 90,
        concepts: ['core concept 1', 'core concept 2', 'trade-offs', 'optimization']
      };
    }

    return gameElements;
  };

  // Generate XML prompt with color theme integration
  const generateGamePrompt = useCallback((topic) => {
    const elements = analyzeTopicForGameElements(topic);
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') + 'Game';

    const colorThemeSection = generatedTheme ? `
  <visual_theme>
    <theme_name>${generatedTheme.name}</theme_name>
    <color_palette>
      <primary_gradient>${generatedTheme.gradient.css}</primary_gradient>
      <primary_color>${generatedTheme.palette.primary}</primary_color>
      <secondary_color>${generatedTheme.palette.secondary}</secondary_color>
      <accent_color>${generatedTheme.palette.accent}</accent_color>
      <text_primary>${generatedTheme.palette.textPrimary}</text_primary>
      <text_secondary>${generatedTheme.palette.textSecondary}</text_secondary>
      <surface_color>${generatedTheme.palette.surface}</surface_color>
    </color_palette>
    <glass_morphic_effects>
      <background_overlay>backdrop-filter: blur(10px); background: ${generatedTheme.palette.glassMorphic};</background_overlay>
      <card_styling>background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px); border: 1px solid ${generatedTheme.palette.accent};</card_styling>
    </glass_morphic_effects>
    <aesthetic_description>${generatedTheme.aesthetic}</aesthetic_description>
  </visual_theme>` : '';

    return `<prompt>
  <role>
    You are an expert React developer specializing in educational game development and complex system simulation. Your task is to create a complete, functional React component for an arcade-style game that teaches advanced concepts in ${topic}.
  </role>

  <task>
    Create a React functional component called "${gameName}" that implements an educational arcade game based on ${topic}, designed to teach players about ${elements.concepts.join(', ')}.
  </task>

  <game_specifications>
    <core_concept>
      A ${elements.duration}-second strategic simulation where players manage a ${topic} system that must balance multiple objectives, adapt to challenges, and demonstrate the principles of effective ${topic} management.
    </core_concept>

    <resources>
      ${elements.resources.map((resource, index) => `
      <resource name="${resource}" initial="${50 + Math.floor(Math.random() * 40)}" description="Key metric for ${topic} success" display="progress_bar" color="${['blue', 'green', 'red', 'purple', 'orange'][index]}" />`).join('')}
    </resources>

    <actions>
      ${elements.actions.map((action, index) => {
        const effects = elements.resources.slice(0, 4).map(resource => {
          const change = Math.floor(Math.random() * 30) - 15;
          return `<effect resource="${resource.replace(/\s+/g, '')}" change="${change > 0 ? '+' : ''}${change}" />`;
        }).join('\n          ');
        
        return `
      <action name="${action}">
        <description>Strategic decision in ${topic} management</description>
        <effects>
          ${effects}
        </effects>
        <flavor_text>Implementing ${action.toLowerCase()} strategy...</flavor_text>
      </action>`;
      }).join('')}
    </actions>

    <game_rules>
      <timer duration="${elements.duration}" unit="seconds" />
      <game_over_conditions>
        <condition>Timer reaches 0</condition>
        <condition>Any critical resource reaches 0 or below</condition>
      </game_over_conditions>
      <resource_constraints>
        <constraint>All resources have minimum value of 0</constraint>
        <constraint>All resources have maximum value of 100</constraint>
        <constraint>Critical failure occurs if primary resources reach 0</constraint>
      </resource_constraints>
      <special_events>
        <event name="Crisis Event" trigger_time="${Math.floor(elements.duration * 0.3)}" description="Major challenge tests system resilience" />
        <event name="Breakthrough Event" trigger_time="${Math.floor(elements.duration * 0.7)}" description="Innovation opportunity emerges" />
      </special_events>
    </game_rules>
  </game_specifications>

  ${colorThemeSection}

  <technical_requirements>
    <framework>React functional components only</framework>
    <state_management>
      <requirement>Use useState for all mutable game state</requirement>
      <requirement>Use useEffect for timer management and event triggers</requirement>
      <requirement>Implement event system for special game events</requirement>
      <requirement>No external state management libraries</requirement>
    </state_management>
    <styling>
      <requirement>Create a thematic visual design appropriate for ${topic}</requirement>
      <requirement>Use color-coded progress bars with smooth animations</requirement>
      <requirement>Implement visual feedback for critical events</requirement>
      <requirement>Ensure responsive design for different screen sizes</requirement>
      ${generatedTheme ? `<requirement>Apply the ${generatedTheme.name} color theme throughout the component</requirement>` : ''}
    </styling>
    <code_quality>
      <requirement>Well-commented code explaining ${topic} concepts</requirement>
      <requirement>Modular component structure</requirement>
      <requirement>Proper error handling and edge cases</requirement>
      <requirement>Performance optimization for smooth gameplay</requirement>
    </code_quality>
  </technical_requirements>

  <educational_objectives>
    <primary>Teach players about the challenges of ${topic} management</primary>
    <secondary>Demonstrate the importance of balancing multiple objectives</secondary>
    <secondary>Illustrate real-world trade-offs in ${topic}</secondary>
    <secondary>Show the complexity of decision-making under constraints</secondary>
    <secondary>Highlight the interconnected nature of ${topic} systems</secondary>
  </educational_objectives>

  <thematic_integration>
    <visual_theme>${elements.theme} aesthetic with professional interface elements</visual_theme>
    <terminology>Use authentic ${topic} terminology and concepts</terminology>
    <narrative_elements>Frame actions as decisions made by ${topic} professionals</narrative_elements>
    <flavor_text>Include references to real ${topic} challenges and solutions</flavor_text>
  </thematic_integration>

  <deliverables>
    <primary>Complete React functional component (${gameName}.jsx)</primary>
    <secondary>Comprehensive CSS styling for ${topic} theme</secondary>
    <secondary>Educational tooltips and explanatory text</secondary>
    <secondary>Event system for special game occurrences</secondary>
    <secondary>Performance analytics and educational summary</secondary>
  </deliverables>

  <constraints>
    <constraint>Use only React and standard web APIs (no external game libraries)</constraint>
    <constraint>Component must be self-contained and immediately functional</constraint>
    <constraint>Maintain accuracy when referencing ${topic} concepts</constraint>
    <constraint>Ensure accessibility with proper ARIA labels and keyboard navigation</constraint>
    <constraint>Optimize for both educational value and engaging gameplay</constraint>
  </constraints>
</prompt>`;
  }, [generatedTheme]);

  // Generate game code with custom colors
  const generateGameCode = useCallback((topic) => {
    const elements = analyzeTopicForGameElements(topic);
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';

    // Use custom theme colors if available
    const themeColors = generatedTheme ? {
      primary: generatedTheme.palette.primary,
      secondary: generatedTheme.palette.secondary,
      accent: generatedTheme.palette.accent,
      gradient: generatedTheme.gradient.css
    } : {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: blendColors(primaryColor, secondaryColor, 0.5),
      gradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
    };

    const componentCode = `import React, { useState, useEffect, useCallback } from 'react';
import './${gameName}.css';

const ${gameName} = () => {
  // Game state management
  const [gameState, setGameState] = useState('playing');
  const [timeRemaining, setTimeRemaining] = useState(${elements.duration});
  const [actionCooldowns, setActionCooldowns] = useState({});
  const [eventLog, setEventLog] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);

  // Resource state
  const [resources, setResources] = useState({
    ${elements.resources.map((resource, index) => 
      `${resource.replace(/\s+/g, '').toLowerCase()}: ${50 + Math.floor(Math.random() * 40)}`
    ).join(',\n    ')}
  });

  // Game configuration
  const GAME_DURATION = ${elements.duration};
  const ACTION_COOLDOWN = 3;
  const CRITICAL_THRESHOLD = 15;

  // Custom theme colors
  const THEME_COLORS = {
    primary: '${themeColors.primary}',
    secondary: '${themeColors.secondary}',
    accent: '${themeColors.accent}',
    gradient: '${themeColors.gradient}'
  };

  // Resource definitions with custom colors
  const resourceConfig = {
    ${elements.resources.map((resource, index) => {
      const key = resource.replace(/\s+/g, '').toLowerCase();
      const colors = [themeColors.primary, themeColors.accent, '#ef4444', '#8b5cf6', '#f59e0b'];
      return `${key}: {
      name: '${resource}',
      color: '${colors[index]}',
      description: '${resource} level in ${topic} system',
      critical: ${index < 3 ? 'true' : 'false'}
    }`;
    }).join(',\n    ')}
  };

  // Action definitions
  const actions = {
    ${elements.actions.map((action, index) => {
      const key = action.replace(/\s+/g, '').toLowerCase();
      const effects = {};
      elements.resources.slice(0, 4).forEach((resource, i) => {
        const resourceKey = resource.replace(/\s+/g, '').toLowerCase();
        effects[resourceKey] = Math.floor(Math.random() * 30) - 15;
      });
      
      return `${key}: {
      name: '${action}',
      description: 'Strategic decision in ${topic} management',
      effects: {
        ${Object.entries(effects).map(([res, change]) => 
          `${res}: ${change}`
        ).join(',\n        ')}
      },
      flavorText: 'Implementing ${action.toLowerCase()} strategy...',
      concept: '${action} involves balancing multiple factors in ${topic} systems.'
    }`;
    }).join(',\n    ')}
  };

  // Special events
  const specialEvents = {
    crisisEvent: {
      name: 'Crisis Event',
      triggerTime: ${Math.floor(elements.duration * 0.3)},
      description: 'Major challenge tests system resilience',
      effects: {
        ${elements.resources.slice(0, 3).map(resource => 
          `${resource.replace(/\s+/g, '').toLowerCase()}: ${-10 - Math.floor(Math.random() * 10)}`
        ).join(',\n        ')}
      },
      message: 'CRISIS: Major challenge detected in ${topic} system!'
    },
    breakthroughEvent: {
      name: 'Breakthrough Event',
      triggerTime: ${Math.floor(elements.duration * 0.7)},
      description: 'Innovation opportunity emerges',
      effects: {
        ${elements.resources.slice(0, 3).map(resource => 
          `${resource.replace(/\s+/g, '').toLowerCase()}: ${5 + Math.floor(Math.random() * 15)}`
        ).join(',\n        ')}
      },
      message: 'BREAKTHROUGH: Innovation opportunity in ${topic} discovered!'
    }
  };

  // Utility functions
  const clampResource = (value) => Math.max(0, Math.min(100, value));

  const addToEventLog = useCallback((message, type = 'info') => {
    const timestamp = GAME_DURATION - timeRemaining;
    setEventLog(prev => [...prev.slice(-4), { message, type, timestamp }]);
  }, [timeRemaining]);

  const applyResourceChanges = useCallback((effects, source) => {
    setResources(prev => {
      const newResources = { ...prev };
      let changeDescription = [];

      Object.entries(effects).forEach(([resource, change]) => {
        if (newResources[resource] !== undefined) {
          const oldValue = newResources[resource];
          newResources[resource] = clampResource(oldValue + change);
          const actualChange = newResources[resource] - oldValue;
          
          if (actualChange !== 0) {
            const sign = actualChange > 0 ? '+' : '';
            changeDescription.push(\`\${sign}\${actualChange} \${resourceConfig[resource]?.name || resource}\`);
          }
        }
      });

      if (changeDescription.length > 0) {
        addToEventLog(\`\${source}: \${changeDescription.join(', ')}\`);
      }

      return newResources;
    });
  }, [addToEventLog]);

  const checkGameOver = useCallback(() => {
    const criticalResources = Object.entries(resourceConfig)
      .filter(([key, config]) => config.critical)
      .map(([key]) => key);
    
    const criticalFailure = criticalResources.some(resource => resources[resource] <= 0);
    
    if (criticalFailure || timeRemaining <= 0) {
      setGameState('gameOver');
      return true;
    }
    return false;
  }, [resources, timeRemaining]);

  const executeAction = useCallback((actionKey) => {
    if (gameState !== 'playing' || actionCooldowns[actionKey]) return;

    const action = actions[actionKey];
    applyResourceChanges(action.effects, action.name);
    addToEventLog(action.flavorText, 'action');

    setActionCooldowns(prev => ({ ...prev, [actionKey]: ACTION_COOLDOWN }));
  }, [gameState, actionCooldowns, applyResourceChanges, addToEventLog]);

  const restartGame = () => {
    setGameState('playing');
    setTimeRemaining(GAME_DURATION);
    setActionCooldowns({});
    setEventLog([]);
    setCurrentEvent(null);
    setResources({
      ${elements.resources.map((resource, index) => 
        `${resource.replace(/\s+/g, '').toLowerCase()}: ${50 + Math.floor(Math.random() * 40)}`
      ).join(',\n      ')}
    });
    addToEventLog('${topic} system initialized. Begin management...', 'system');
  };

  // Game timer and events
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Check for special events
        Object.entries(specialEvents).forEach(([eventKey, event]) => {
          if (newTime === GAME_DURATION - event.triggerTime) {
            setCurrentEvent(event);
            applyResourceChanges(event.effects, event.name);
            addToEventLog(event.message, 'event');
            
            setTimeout(() => setCurrentEvent(null), 5000);
          }
        });

        return newTime;
      });

      // Update cooldowns
      setActionCooldowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key]--;
            if (updated[key] === 0) {
              delete updated[key];
            }
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, applyResourceChanges, addToEventLog]);

  // Check game over conditions
  useEffect(() => {
    checkGameOver();
  }, [checkGameOver]);

  // Initialize game
  useEffect(() => {
    addToEventLog('${topic} system initialized. Begin management...', 'system');
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
  };

  const getResourceStatus = (value) => {
    if (value <= CRITICAL_THRESHOLD) return 'critical';
    if (value <= 30) return 'warning';
    return 'normal';
  };

  const calculateFinalScore = () => {
    const totalResources = Object.values(resources).reduce((sum, value) => sum + value, 0);
    return Math.round(totalResources / Object.keys(resources).length);
  };

  if (gameState === 'gameOver') {
    const finalScore = calculateFinalScore();
    const criticalFailures = Object.entries(resources)
      .filter(([key, value]) => resourceConfig[key].critical && value <= 0)
      .map(([key]) => resourceConfig[key].name);

    return (
      <div className="${gameName.toLowerCase()}-game game-over" style={{ background: THEME_COLORS.gradient }}>
        <div className="game-over-screen">
          <h1>${topic} Simulation Complete</h1>
          
          <div className="performance-analysis">
            <h2>System Performance Analysis</h2>
            <div className="final-score">
              <span className="score-label">Final System Effectiveness:</span>
              <span className={\`score-value \${finalScore >= 70 ? 'excellent' : finalScore >= 50 ? 'good' : 'poor'}\`}>
                {finalScore}/100
              </span>
            </div>

            {criticalFailures.length > 0 && (
              <div className="critical-failures">
                <h3>Critical System Failures:</h3>
                <ul>
                  {criticalFailures.map(failure => (
                    <li key={failure}>{failure} reached critical levels</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="resource-summary">
              {Object.entries(resources).map(([key, value]) => (
                <div key={key} className="resource-final">
                  <span>{resourceConfig[key].name}:</span>
                  <span className={getResourceStatus(value)}>{value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="insights">
            <h2>${topic} Management Insights</h2>
            <div className="insights-content">
              ${elements.concepts.map(concept => `
              <div className="insight">
                <h3>${concept.charAt(0).toUpperCase() + concept.slice(1)}</h3>
                <p>Understanding ${concept} is crucial for effective ${topic} management.</p>
              </div>`).join('')}
            </div>
          </div>

          <button 
            className="restart-button" 
            onClick={restartGame}
            style={{ background: THEME_COLORS.gradient }}
          >
            Initialize New ${topic} System
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="${gameName.toLowerCase()}-game" style={{ background: THEME_COLORS.gradient }}>
      <header className="game-header">
        <h1>${topic} System Manager</h1>
        <div className="timer-display">
          <span className="timer-label">System Runtime:</span>
          <span className={\`timer-value \${timeRemaining <= 10 ? 'critical' : ''}\`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </header>

      {currentEvent && (
        <div className="special-event">
          <div className="event-content">
            <h3>{currentEvent.name}</h3>
            <p>{currentEvent.message}</p>
          </div>
        </div>
      )}

      <div className="game-content">
        <div className="main-panel">
          <div className="resource-dashboard">
            <h2>System Resources</h2>
            {Object.entries(resources).map(([key, value]) => {
              const config = resourceConfig[key];
              const status = getResourceStatus(value);
              
              return (
                <div 
                  key={key} 
                  className={\`resource-bar \${status}\`}
                  onMouseEnter={() => setShowTooltip(key)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <div className="resource-header">
                    <span className="resource-name">{config.name}</span>
                    <span className="resource-value">{value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: \`\${value}%\`,
                        background: config.color,
                        boxShadow: status === 'critical' ? \`0 0 10px \${config.color}\` : 'none'
                      }}
                    />
                  </div>
                  {showTooltip === key && (
                    <div className="tooltip">
                      {config.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="action-panel">
            <h2>Strategic Actions</h2>
            <div className="action-grid">
              {Object.entries(actions).map(([key, action]) => {
                const isOnCooldown = actionCooldowns[key] > 0;
                
                return (
                  <button
                    key={key}
                    className={\`action-button \${isOnCooldown ? 'cooldown' : ''}\`}
                    onClick={() => executeAction(key)}
                    disabled={isOnCooldown || gameState !== 'playing'}
                    onMouseEnter={() => setShowTooltip(\`action-\${key}\`)}
                    onMouseLeave={() => setShowTooltip(null)}
                    style={{ 
                      background: isOnCooldown ? 'rgba(100, 100, 100, 0.2)' : \`linear-gradient(135deg, \${THEME_COLORS.primary}40, \${THEME_COLORS.secondary}40)\`,
                      borderColor: THEME_COLORS.accent
                    }}
                  >
                    <div className="action-content">
                      <h3>{action.name}</h3>
                      <p>{action.description}</p>
                      {isOnCooldown && (
                        <div className="cooldown-indicator">
                          Cooldown: {actionCooldowns[key]}s
                        </div>
                      )}
                    </div>
                    {showTooltip === \`action-\${key}\` && (
                      <div className="tooltip action-tooltip">
                        <p><strong>Concept:</strong> {action.concept}</p>
                        <div className="effects-preview">
                          <strong>Effects:</strong>
                          {Object.entries(action.effects).map(([resource, change]) => (
                            <div key={resource} className={change > 0 ? 'positive' : 'negative'}>
                              {change > 0 ? '+' : ''}{change} {resourceConfig[resource]?.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="side-panel">
          <div className="system-status">
            <h3>System Status</h3>
            <div className="event-log">
              {eventLog.map((entry, index) => (
                <div key={index} className={\`log-entry \${entry.type}\`}>
                  <span className="timestamp">[{Math.floor(entry.timestamp)}s]</span>
                  <span className="message">{entry.message}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="concept-tracker">
            <h3>${topic} Concepts</h3>
            <div className="concepts">
              ${elements.concepts.map(concept => `
              <div className="concept">
                <h4>${concept.charAt(0).toUpperCase() + concept.slice(1)}</h4>
                <p>Key principle in ${topic} management and optimization.</p>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ${gameName};`;

    return componentCode;
  }, [generatedTheme, primaryColor, secondaryColor]);

  // Generate CSS with custom colors
  const generateGameCSS = useCallback((topic) => {
    const elements = analyzeTopicForGameElements(topic);
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';

    // Use custom theme colors if available
    const colors = generatedTheme ? {
      primary: generatedTheme.palette.primary,
      secondary: generatedTheme.palette.secondary,
      accent: generatedTheme.palette.accent
    } : {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: blendColors(primaryColor, secondaryColor, 0.5)
    };

    return `/* ${gameName}.css - Custom Theme: ${generatedTheme?.name || 'Default'} */

.${gameName.toLowerCase()}-game {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  color: #e5e7eb;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.${gameName.toLowerCase()}-game::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  z-index: -1;
}

.${gameName.toLowerCase()}-game * {
  box-sizing: border-box;
}

/* Header Styles */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.game-header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
}

.timer-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.timer-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
}

.timer-value {
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.accent};
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.timer-value.critical {
  color: #ef4444;
  text-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
  animation: pulse 1s infinite;
}

/* Glass Morphic Panels */
.resource-dashboard,
.action-panel,
.system-status,
.concept-tracker {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Resource Dashboard */
.resource-dashboard h2,
.action-panel h2 {
  margin: 0 0 20px 0;
  color: #ffffff;
  text-align: center;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.resource-bar {
  position: relative;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.resource-bar:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.resource-bar.critical {
  border-color: #ef4444;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
  animation: criticalPulse 2s infinite;
}

.resource-bar.warning {
  border-color: #f59e0b;
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
}

.resource-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.resource-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #ffffff;
}

.resource-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.accent};
}

.progress-bar {
  height: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.progress-fill {
  height: 100%;
  transition: all 0.5s ease;
  border-radius: 10px;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

/* Action Panel */
.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.action-button {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid ${colors.accent};
  border-radius: 15px;
  padding: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  min-height: 120px;
}

.action-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 25px rgba(${hexToRgb(colors.accent).join(', ')}, 0.4);
  transform: translateY(-3px);
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.action-button.cooldown {
  background: rgba(100, 100, 100, 0.1);
  border-color: #6b7280;
}

.action-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: ${colors.accent};
  text-transform: uppercase;
}

.action-content p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.9);
}

.cooldown-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(239, 68, 68, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Game Layout */
.game-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  height: calc(100vh - 200px);
}

.main-panel {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.side-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* System Status */
.system-status h3,
.concept-tracker h3 {
  margin: 0 0 15px 0;
  color: ${colors.accent};
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(${hexToRgb(colors.accent).join(', ')}, 0.3);
}

.event-log {
  height: 300px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.log-entry {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  font-size: 0.85rem;
  line-height: 1.3;
  animation: fadeIn 0.5s ease-out;
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid ${colors.primary};
}

.log-entry.action {
  border-left-color: #10b981;
}

.log-entry.event {
  border-left-color: #ef4444;
}

.timestamp {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-right: 10px;
}

/* Concept Tracker */
.concept {
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.concept h4 {
  margin: 0 0 5px 0;
  color: ${colors.accent};
  font-size: 0.9rem;
}

.concept p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.8);
}

/* Special Events */
.special-event {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(239, 68, 68, 0.95);
  backdrop-filter: blur(15px);
  border: 2px solid #ef4444;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 0 40px rgba(239, 68, 68, 0.6);
  animation: eventAlert 0.5s ease-out;
}

.event-content h3 {
  margin: 0 0 15px 0;
  font-size: 1.8rem;
  color: #ffffff;
  text-transform: uppercase;
}

.event-content p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #ffffff;
}

/* Tooltips */
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 0.9rem;
  white-space: nowrap;
  z-index: 100;
  border: 1px solid ${colors.accent};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
}

.action-tooltip {
  white-space: normal;
  max-width: 300px;
  line-height: 1.4;
}

.effects-preview {
  margin-top: 10px;
}

.effects-preview div {
  margin: 2px 0;
  font-size: 0.8rem;
}

.effects-preview .positive {
  color: #10b981;
}

.effects-preview .negative {
  color: #f87171;
}

/* Game Over Screen */
.game-over {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.game-over-screen {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid ${colors.primary};
  border-radius: 25px;
  padding: 40px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
}

.game-over-screen h1 {
  text-align: center;
  color: ${colors.primary};
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 0 0 20px rgba(${hexToRgb(colors.primary).join(', ')}, 0.5);
}

.performance-analysis h2 {
  color: ${colors.accent};
  margin-bottom: 20px;
  text-align: center;
}

.final-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.score-label {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
}

.score-value {
  font-size: 2rem;
  font-weight: bold;
}

.score-value.excellent {
  color: #10b981;
  text-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
}

.score-value.good {
  color: #f59e0b;
  text-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
}

.score-value.poor {
  color: #ef4444;
  text-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

.restart-button {
  display: block;
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 25px rgba(${hexToRgb(colors.primary).join(', ')}, 0.3);
}

.restart-button:hover {
  box-shadow: 0 0 35px rgba(${hexToRgb(colors.primary).join(', ')}, 0.5);
  transform: translateY(-2px);
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes criticalPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes eventAlert {
  0% { 
    opacity: 0; 
    transform: translate(-50%, -50%) scale(0.8); 
  }
  100% { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1); 
  }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .game-content {
    grid-template-columns: 1fr;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .game-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .${gameName.toLowerCase()}-game {
    padding: 10px;
  }
  
  .game-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .game-header h1 {
    font-size: 1.5rem;
  }
  
  .resource-dashboard,
  .action-panel,
  .system-status,
  .concept-tracker {
    padding: 15px;
  }
}

/* Accessibility */
.action-button:focus,
.restart-button:focus {
  outline: 2px solid ${colors.accent};
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .${gameName.toLowerCase()}-game {
    background: #000000;
    color: #ffffff;
  }
  
  .resource-bar,
  .action-button {
    border-width: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`;
  }, [generatedTheme, primaryColor, secondaryColor]);

  // Generate README with color customization info
  const generateReadme = useCallback((topic, framework) => {
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';

    const isVite = framework === 'vite';
    const themeInfo = generatedTheme ? `

## Custom Color Theme: ${generatedTheme.name}

This game uses a custom color theme generated specifically for your topic:

- **Primary Color**: ${generatedTheme.palette.primary}
- **Secondary Color**: ${generatedTheme.palette.secondary}
- **Accent Color**: ${generatedTheme.palette.accent}
- **Theme Concept**: ${generatedTheme.concept}

The theme applies glass morphic design principles with:
- Backdrop blur effects for depth
- Gradient backgrounds for visual appeal
- Translucent overlays for modern aesthetics
- Responsive color adaptation across all UI elements` : '';

    return `# ${topic} Educational Game${themeInfo}

An interactive educational arcade game that teaches ${topic} concepts through strategic resource management and decision-making.

## Game Overview

This game simulates ${topic} management challenges where players must balance multiple resources, make strategic decisions, and adapt to dynamic events. Players learn about real-world ${topic} concepts through engaging gameplay mechanics.

## Features

- **Resource Management**: Balance multiple interconnected resources
- **Strategic Decision Making**: Choose from various actions with trade-offs
- **Dynamic Events**: Respond to unexpected challenges and opportunities
- **Educational Content**: Learn ${topic} concepts through gameplay
- **Performance Analytics**: Track your management effectiveness
- **Custom Color Themes**: Personalized visual design system
- **Glass Morphic UI**: Modern, translucent interface elements
- **Responsive Design**: Works on desktop and mobile devices

## Installation and Setup

### Prerequisites
- Node.js (version 16.0 or higher)
- npm or yarn package manager

### Quick Start

\`\`\`bash
# 1. Create ${isVite ? 'Vite' : 'Next.js'} project
${isVite 
  ? `npm create vite@latest ${gameName.toLowerCase()}-app -- --template react`
  : `npx create-next-app@latest ${gameName.toLowerCase()}-app --typescript --tailwind --eslint --app`
}

# 2. Navigate to project directory
cd ${gameName.toLowerCase()}-app

# 3. Install dependencies
npm install

# 4. Create components directory
mkdir ${isVite ? 'src/components' : 'components'}

# 5. Create game component files
touch ${isVite ? 'src/components' : 'components'}/${gameName}.${isVite ? 'jsx' : 'tsx'}
touch ${isVite ? 'src/components' : 'components'}/${gameName}.${isVite ? 'css' : 'module.css'}
\`\`\`

### File Structure

\`\`\`
${gameName.toLowerCase()}-app/
├── ${isVite ? 'src/' : 'app/'}
│   ├── ${isVite ? 'components/' : '../components/'}
│   │   ├── ${gameName}.${isVite ? 'jsx' : 'tsx'}
│   │   └── ${gameName}.${isVite ? 'css' : 'module.css'}
│   ${isVite ? '├── App.jsx' : '└── page.tsx'}
│   ${isVite ? '├── main.jsx' : ''}
│   ${isVite ? '└── index.css' : ''}
├── ${isVite ? 'index.html' : ''}
├── package.json
${isVite ? '├── vite.config.js' : '├── next.config.js'}
└── README.md
\`\`\`

## Implementation Steps

### Step 1: Copy Game Component Code

Copy the generated ${gameName} component code into:
\`${isVite ? 'src/components' : 'components'}/${gameName}.${isVite ? 'jsx' : 'tsx'}\`

### Step 2: Copy CSS Styles

Copy the generated CSS code into:
\`${isVite ? 'src/components' : 'components'}/${gameName}.${isVite ? 'css' : 'module.css'}\`

### Step 3: Update Main App File

${isVite ? `
**Update \`src/App.jsx\`:**
\`\`\`jsx
import React from 'react'
import ${gameName} from './components/${gameName}'
import './App.css'

function App() {
  return (
    <div className="App">
      <${gameName} />
    </div>
  )
}

export default App
\`\`\`
` : `
**Update \`app/page.tsx\`:**
\`\`\`tsx
import ${gameName} from '../components/${gameName}'

export default function Home() {
  return (
    <main>
      <${gameName} />
    </main>
  )
}
\`\`\`
`}

### Step 4: Run the Application

\`\`\`bash
# Start development server
npm run ${isVite ? 'dev' : 'dev'}

# Open browser to http://localhost:${isVite ? '5173' : '3000'}
\`\`\`

## Color Theme Customization

This game includes a sophisticated color theme system that creates cohesive, professional visual designs:

### Theme Features
- **Glass Morphic Design**: Translucent elements with backdrop blur effects
- **Gradient Backgrounds**: Smooth color transitions for visual depth
- **Adaptive Colors**: UI elements automatically adapt to your chosen palette
- **Accessibility**: High contrast ratios and reduced motion support

### Customizing Colors
To modify the color theme:

1. **Update Primary/Secondary Colors**: Change the \`THEME_COLORS\` object in the component
2. **Regenerate Theme**: Use the color picker in the generator to create new themes
3. **Apply Consistently**: The system automatically applies colors across all UI elements

### Color Psychology for Education
Different color combinations can enhance learning:
- **Blue/Cyan**: Promotes focus and calm thinking
- **Green/Emerald**: Encourages growth and balance
- **Purple/Violet**: Stimulates creativity and imagination
- **Red/Orange**: Increases energy and urgency

## Game Mechanics

### Resources
The game features multiple interconnected resources that represent key aspects of ${topic}:
- Each resource has a value from 0-100
- Critical resources cause game over if they reach 0
- Resources change based on player actions and events

### Actions
Players can choose from strategic actions that affect multiple resources:
- Each action has a 3-second cooldown
- Actions have both positive and negative effects
- Effects demonstrate real-world trade-offs in ${topic}

### Events
Special events occur during gameplay:
- Crisis events test system resilience
- Breakthrough events provide opportunities
- Events are timed to create dynamic gameplay

### Scoring
Final score is calculated based on:
- Resource levels at game end
- Time survived
- Crisis management effectiveness

## Educational Objectives

This game teaches:
- **Systems Thinking**: Understanding interconnected relationships
- **Resource Management**: Balancing competing priorities
- **Decision Making**: Evaluating trade-offs under pressure
- **${topic} Concepts**: Domain-specific knowledge and principles
- **Strategic Planning**: Long-term vs. short-term thinking

## Advanced Customization

### Modifying Visual Theme
Edit the CSS variables to change the overall appearance:
\`\`\`css
:root {
  --primary-color: ${generatedTheme?.palette.primary || primaryColor};
  --secondary-color: ${generatedTheme?.palette.secondary || secondaryColor};
  --accent-color: ${generatedTheme?.palette.accent || blendColors(primaryColor, secondaryColor, 0.5)};
  --glass-opacity: 0.1;
  --blur-strength: 15px;
}
\`\`\`

### Adding New Resources
Edit the \`resourceConfig\` object to add or modify resources:
\`\`\`javascript
const resourceConfig = {
  newResource: {
    name: 'New Resource',
    color: '#your-color',
    description: 'Description of the resource',
    critical: true // or false
  }
};
\`\`\`

### Creating Custom Actions
Modify the \`actions\` object to add new strategic options:
\`\`\`javascript
const actions = {
  newAction: {
    name: 'New Action',
    description: 'What this action does',
    effects: {
      resource1: 10,  // positive effect
      resource2: -5   // negative effect
    },
    flavorText: 'Action feedback text',
    concept: 'Educational concept explanation'
  }
};
\`\`\`

## Troubleshooting

### Common Issues

**Game not loading:**
- Check console for JavaScript errors
- Verify all imports are correct
- Ensure CSS file is properly linked

**Color theme not applying:**
- Confirm CSS variables are properly set
- Check for CSS syntax errors
- Verify color values are valid hex codes

**Performance problems:**
- Monitor browser console for warnings
- Check for memory leaks in useEffect hooks
- Optimize re-renders with useCallback

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Building for Production

\`\`\`bash
# Create production build
npm run build

# ${isVite ? 'Preview production build' : 'Start production server'}
npm run ${isVite ? 'preview' : 'start'}
\`\`\`

### Code Quality

\`\`\`bash
# Run linting
npm run lint

# Format code (if Prettier is configured)
npm run format
\`\`\`

## Deployment

### Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
1. Build the project: \`npm run build\`
2. Drag and drop the \`${isVite ? 'dist' : '.next'}\` folder to Netlify

### GitHub Pages ${isVite ? '(Vite only)' : '(Not recommended for Next.js)'}
${isVite ? `
\`\`\`bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"
npm run deploy
\`\`\`
` : 'Use Vercel or Netlify for Next.js deployment.'}

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This educational game is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure all dependencies are installed
4. Verify file paths and imports

## Educational Use

This game is designed for:
- Classroom instruction
- Self-directed learning
- Training programs
- Educational demonstrations
- Color theory and design education

Feel free to modify and adapt for your specific educational needs!

---

*Generated with custom color theme: ${generatedTheme?.name || 'Default Theme'}*`;
  }, [generatedTheme, primaryColor, secondaryColor]);

  // Main generation function
  const handleGenerate = async () => {
    if (!userInput.trim()) {
      alert('Please enter a topic or idea for your game!');
      return;
    }

    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const prompt = generateGamePrompt(userInput);
      const code = generateGameCode(userInput);
      const css = generateGameCSS(userInput);
      const readme = generateReadme(userInput, framework);
      
      setGeneratedPrompt(prompt);
      setGeneratedCode({ component: code, css: css });
      setGeneratedReadme(readme);
      setActiveTab('prompt');
    } catch (error) {
      console.error('Generation error:', error);
      alert('An error occurred during generation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="universal-generator" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
      <header className="generator-header">
        <h1>🎮 Universal Game Design Prompt Generator</h1>
        <p>Transform any topic into an engaging educational arcade game with custom themes</p>
      </header>

      <div className="generator-content">
        {activeTab === 'input' && (
          <div className="input-section">
            <div className="input-form">
              <h2>Create Your Educational Game</h2>
              
              <div className="form-group">
                <label htmlFor="topic-input">Enter your topic or idea:</label>
                <textarea
                  id="topic-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., Climate Change, Space Exploration, Startup Management, Pandemic Response, Machine Learning, etc."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="framework-select">Choose your framework:</label>
                <select
                  id="framework-select"
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                >
                  <option value="vite">Vite + React (Recommended)</option>
                  <option value="nextjs">Next.js + React</option>
                </select>
              </div>

              {/* Color Customization Section */}
              <div className="form-group">
                <label>
                  <Palette className="inline-icon" />
                  Customize Visual Theme
                </label>
                <button
                  type="button"
                  className="color-picker-toggle"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <Eye className="inline-icon" />
                  {showColorPicker ? 'Hide' : 'Show'} Color Options
                </button>
              </div>

              {showColorPicker && (
                <div className="color-customization">
                  <div className="color-inputs">
                    <div className="color-input-group">
                      <label htmlFor="primary-color">Primary Color:</label>
                      <div className="color-input-wrapper">
                        <input
                          type="color"
                          id="primary-color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          placeholder="#667eea"
                        />
                      </div>
                    </div>
                    
                    <div className="color-input-group">
                      <label htmlFor="secondary-color">Secondary Color:</label>
                      <div className="color-input-wrapper">
                        <input
                          type="color"
                          id="secondary-color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                        />
                        <input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          placeholder="#764ba2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="color-actions">
                    <button
                      type="button"
                      className="generate-theme-button"
                      onClick={() => generateColorTheme(primaryColor, secondaryColor)}
                      disabled={isGeneratingTheme}
                    >
                      <Sparkles className="inline-icon" />
                      {isGeneratingTheme ? 'Generating Theme...' : 'Generate Theme'}
                    </button>
                    
                    <button
                      type="button"
                      className="random-colors-button"
                      onClick={generateRandomColors}
                    >
                      <RefreshCw className="inline-icon" />
                      Random Colors
                    </button>
                  </div>

                  <div className="color-presets">
                    <h4>Quick Presets:</h4>
                    <div className="preset-grid">
                      {colorPresets.map((preset, index) => (
                        <button
                          key={index}
                          className="preset-button"
                          onClick={() => applyColorPreset(preset)}
                          style={{
                            background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`
                          }}
                          title={preset.description}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {generatedTheme && (
                    <div className="generated-theme-preview">
                      <h4>🎨 Generated Theme: {generatedTheme.name}</h4>
                      <p>{generatedTheme.concept}</p>
                      <div className="theme-colors">
                        <div className="color-swatch" style={{ backgroundColor: generatedTheme.palette.primary }}>
                          Primary
                        </div>
                        <div className="color-swatch" style={{ backgroundColor: generatedTheme.palette.secondary }}>
                          Secondary
                        </div>
                        <div className="color-swatch" style={{ backgroundColor: generatedTheme.palette.accent }}>
                          Accent
                        </div>
                      </div>
                      <div className="theme-preview" style={{ background: generatedTheme.gradient.css }}>
                        <span>Theme Preview</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button 
                className="generate-button"
                onClick={handleGenerate}
                disabled={isGenerating || !userInput.trim()}
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                {isGenerating ? '🔄 Generating...' : '🚀 Generate Game'}
              </button>

              {generatedPrompt && (
                <div className="generation-complete">
                  <h3>✅ Generation Complete!</h3>
                  <p>Your educational game has been generated with {generatedTheme ? `custom ${generatedTheme.name} theme` : 'default styling'}. Use the tabs above to view:</p>
                  <ul>
                    <li><strong>XML Prompt</strong> - The engineered prompt for AI systems</li>
                    <li><strong>Game Code</strong> - Complete React component and CSS with custom theme</li>
                    <li><strong>Setup Guide</strong> - Step-by-step implementation instructions</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="preview-section">
              <h3>🎯 What You'll Get</h3>
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>📝 XML Prompt</h4>
                  <p>Perfectly engineered prompt for AI systems to generate educational games</p>
                </div>
                <div className="feature-card">
                  <h4>⚛️ React Component</h4>
                  <p>Complete, functional game component with modern React hooks</p>
                </div>
                <div className="feature-card">
                  <h4>🎨 Custom Styling</h4>
                  <p>Thematic CSS with glass morphic design and custom color themes</p>
                </div>
                <div className="feature-card">
                  <h4>📚 Setup Guide</h4>
                  <p>Detailed README with installation and deployment instructions</p>
                </div>
                <div className="feature-card">
                  <h4>🎮 Educational Gameplay</h4>
                  <p>Resource management, strategic decisions, and dynamic events</p>
                </div>
                <div className="feature-card">
                  <h4>🌈 Color Themes</h4>
                  <p>Professional color palette generation with glass morphic effects</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {generatedPrompt && (
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={`tab-button ${activeTab === 'prompt' ? 'active' : ''}`}
                onClick={() => setActiveTab('prompt')}
              >
                📝 XML Prompt
              </button>
              <button
                className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                ⚛️ Game Code
              </button>
              <button
                className={`tab-button ${activeTab === 'readme' ? 'active' : ''}`}
                onClick={() => setActiveTab('readme')}
              >
                📚 Setup Guide
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'prompt' && (
                <div className="output-section">
                  <div className="section-header">
                    <h3>Generated XML Prompt {generatedTheme && <span className="theme-badge">with {generatedTheme.name}</span>}</h3>
                    <div className="action-buttons">
                      <button onClick={() => copyToClipboard(generatedPrompt)}>
                        <Copy className="inline-icon" /> Copy
                      </button>
                      <button onClick={() => downloadFile(generatedPrompt, 'game-prompt.xml')}>
                        <Download className="inline-icon" /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="code-block">
                    <code>{generatedPrompt}</code>
                  </pre>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="output-section">
                  <div className="code-tabs">
                    <div className="section-header">
                      <h3>React Component Code {generatedTheme && <span className="theme-badge">with {generatedTheme.name}</span>}</h3>
                      <div className="action-buttons">
                        <button onClick={() => copyToClipboard(generatedCode.component)}>
                          <Copy className="inline-icon" /> Copy Component
                        </button>
                        <button onClick={() => copyToClipboard(generatedCode.css)}>
                          <Copy className="inline-icon" /> Copy CSS
                        </button>
                        <button onClick={() => {
                          const gameName = userInput.split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';
                          downloadFile(generatedCode.component, `${gameName}.jsx`);
                        }}>
                          <Download className="inline-icon" /> Download Component
                        </button>
                        <button onClick={() => {
                          const gameName = userInput.split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';
                          downloadFile(generatedCode.css, `${gameName}.css`);
                        }}>
                          <Download className="inline-icon" /> Download CSS
                        </button>
                      </div>
                    </div>

                    <div className="code-sections">
                      <div className="code-section">
                        <h4>React Component</h4>
                        <pre className="code-block">
                          <code>{generatedCode.component}</code>
                        </pre>
                      </div>
                      
                      <div className="code-section">
                        <h4>CSS Styles {generatedTheme && `(${generatedTheme.name} Theme)`}</h4>
                        <pre className="code-block">
                          <code>{generatedCode.css}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'readme' && (
                <div className="output-section">
                  <div className="section-header">
                    <h3>Setup Guide & README</h3>
                    <div className="action-buttons">
                      <button onClick={() => copyToClipboard(generatedReadme)}>
                        <Copy className="inline-icon" /> Copy
                      </button>
                      <button onClick={() => downloadFile(generatedReadme, 'README.md')}>
                        <Download className="inline-icon" /> Download README
                      </button>
                    </div>
                  </div>
                  <div className="readme-content">
                    <pre className="code-block markdown">
                      <code>{generatedReadme}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="generator-footer">
        <div className="footer-content">
          <p>
            🎯 <strong>Pro Tip:</strong> Use the engineered prompt with AI assistants to generate 
            customized games, or use the complete code for immediate implementation with professional color themes!
          </p>
          <div className="footer-links">
            <a href="#examples">View Examples</a>
            <a href="#documentation">Documentation</a>
            <a href="#support">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UniversalGameGenerator;