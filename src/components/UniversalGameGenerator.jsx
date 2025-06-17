import React, { useState, useCallback } from 'react';
import { Palette, Shuffle, Sparkles, Copy, Download, FileText, Code, BookOpen } from 'lucide-react';
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
  const [startColor, setStartColor] = useState('#667eea');
  const [endColor, setEndColor] = useState('#764ba2');
  const [generatedTheme, setGeneratedTheme] = useState(null);
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);

  // Color presets
  const colorPresets = [
    { name: 'Ocean Depths', start: '#0077be', end: '#00a8cc' },
    { name: 'Sunset Glow', start: '#ff6b6b', end: '#ffa726' },
    { name: 'Forest Mist', start: '#2d5016', end: '#a8e6cf' },
    { name: 'Purple Haze', start: '#667eea', end: '#764ba2' },
    { name: 'Fire Storm', start: '#c31432', end: '#240b36' },
    { name: 'Arctic Frost', start: '#74b9ff', end: '#0984e3' },
    { name: 'Golden Hour', start: '#f7971e', end: '#ffd200' },
    { name: 'Deep Space', start: '#2c3e50', end: '#4a00e0' }
  ];

  // Apply theme to the app
  const applyTheme = useCallback((start, end) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${start} 0%, ${end} 100%)`);
    
    // Update the main background
    const generator = document.querySelector('.universal-generator');
    if (generator) {
      generator.style.background = `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;
    }
  }, []);

  // Generate random colors
  const generateRandomColors = () => {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    const newStart = getRandomColor();
    const newEnd = getRandomColor();
    setStartColor(newStart);
    setEndColor(newEnd);
    applyTheme(newStart, newEnd);
  };

  // Generate theme using the XML prompt
  const generateTheme = async () => {
    setIsGeneratingTheme(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock theme based on the colors
      const themes = [
        {
          name: 'Solar Flare',
          concept: 'A vibrant, energetic theme inspired by solar activity and cosmic energy.',
          accent: '#ff8a65',
          textPrimary: '#ffffff',
          textSecondary: '#e0e0e0',
          background: '#1a1a2e'
        },
        {
          name: 'Deep Ocean',
          concept: 'A calming, mysterious theme evoking the depths of the ocean.',
          accent: '#4fc3f7',
          textPrimary: '#ffffff',
          textSecondary: '#b0bec5',
          background: '#0d1421'
        },
        {
          name: 'Aurora Borealis',
          concept: 'A magical theme capturing the ethereal beauty of northern lights.',
          accent: '#81c784',
          textPrimary: '#ffffff',
          textSecondary: '#c8e6c9',
          background: '#1b2631'
        }
      ];
      
      const selectedTheme = themes[Math.floor(Math.random() * themes.length)];
      setGeneratedTheme(selectedTheme);
      
    } catch (error) {
      console.error('Theme generation error:', error);
    } finally {
      setIsGeneratingTheme(false);
    }
  };

  // Apply preset colors
  const applyPreset = (preset) => {
    setStartColor(preset.start);
    setEndColor(preset.end);
    applyTheme(preset.start, preset.end);
  };

  // Initialize with default theme
  React.useEffect(() => {
    applyTheme(startColor, endColor);
  }, [startColor, endColor, applyTheme]);

  // Topic analysis function
  const analyzeTopicForGameElements = (topic) => {
    const topicLower = topic.toLowerCase();
    
    // Define topic categories and their game elements
    const topicPatterns = {
      // Science & Technology
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
      // Business & Economics
      startup: {
        resources: ['Cash Flow', 'Product Quality', 'Market Share', 'Team Morale', 'Customer Satisfaction'],
        actions: ['Hire Talent', 'Marketing Campaign', 'Product Development', 'Seek Investment'],
        theme: 'business',
        duration: 100,
        concepts: ['lean startup', 'product-market fit', 'burn rate', 'scaling challenges']
      },
      // Health & Medicine
      pandemic: {
        resources: ['Public Health', 'Economic Stability', 'Healthcare Capacity', 'Social Cohesion', 'Government Trust'],
        actions: ['Implement Lockdown', 'Vaccine Distribution', 'Economic Support', 'Public Communication'],
        theme: 'medical',
        duration: 150,
        concepts: ['epidemiology', 'herd immunity', 'contact tracing', 'policy balance']
      },
      // Education
      education: {
        resources: ['Student Engagement', 'Learning Outcomes', 'Teacher Satisfaction', 'Budget', 'Innovation Level'],
        actions: ['Adopt New Technology', 'Teacher Training', 'Curriculum Reform', 'Infrastructure Investment'],
        theme: 'academic',
        duration: 90,
        concepts: ['pedagogical methods', 'educational technology', 'assessment strategies', 'equity in education']
      }
    };

    // Find matching pattern or create generic one
    let gameElements = null;
    for (const [key, elements] of Object.entries(topicPatterns)) {
      if (topicLower.includes(key)) {
        gameElements = elements;
        break;
      }
    }

    // Generic fallback
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

  // Generate XML prompt
  const generateGamePrompt = useCallback((topic) => {
    const elements = analyzeTopicForGameElements(topic);
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') + 'Game';

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
  }, []);

  // Generate game code
  const generateGameCode = useCallback((topic) => {
    const elements = analyzeTopicForGameElements(topic);
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';

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

  // Resource definitions
  const resourceConfig = {
    ${elements.resources.map((resource, index) => {
      const key = resource.replace(/\s+/g, '').toLowerCase();
      const colors = ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b'];
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
      <div className="${gameName.toLowerCase()}-game game-over">
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

          <button className="restart-button" onClick={restartGame}>
            Initialize New ${topic} System
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="${gameName.toLowerCase()}-game">
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
                        backgroundColor: config.color,
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
  }, []);

  // Generate CSS
  const generateGameCSS = useCallback((topic) => {
    const elements = analyzeTopicForGameElements(topic);
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';

    const themeColors = {
      environmental: { primary: '#10b981', secondary: '#059669', accent: '#34d399' },
      space: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' },
      business: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
      medical: { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' },
      academic: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
      generic: { primary: '#6b7280', secondary: '#4b5563', accent: '#9ca3af' }
    };

    const colors = themeColors[elements.theme] || themeColors.generic;

    return `/* ${gameName}.css */

.${gameName.toLowerCase()}-game {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%);
  color: #e5e7eb;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
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
  background: rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1);
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.3);
}

.game-header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: ${colors.primary};
  text-shadow: 0 0 10px rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.5);
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
  color: #9ca3af;
  text-transform: uppercase;
}

.timer-value {
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.accent};
  text-shadow: 0 0 10px rgba(${colors.accent.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.5);
  transition: all 0.3s ease;
}

.timer-value.critical {
  color: #ef4444;
  text-shadow: 0 0 15px rgba(239, 68, 68, 0.8);
  animation: pulse 1s infinite;
}

/* Special Event Styles */
.special-event {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(239, 68, 68, 0.95);
  border: 2px solid #ef4444;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
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
}

/* Main Game Layout */
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

/* Resource Dashboard */
.resource-dashboard {
  background: rgba(${colors.secondary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1);
  border: 1px solid ${colors.secondary};
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 0 20px rgba(${colors.secondary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.2);
}

.resource-dashboard h2 {
  margin: 0 0 20px 0;
  color: ${colors.primary};
  text-align: center;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.resource-bar {
  position: relative;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.resource-bar:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.resource-bar.critical {
  border: 1px solid #ef4444;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
  animation: criticalPulse 2s infinite;
}

.resource-bar.warning {
  border: 1px solid #f59e0b;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
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
}

.resource-value {
  font-size: 1.2rem;
  font-weight: bold;
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
.action-panel {
  background: rgba(${colors.accent.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1);
  border: 1px solid ${colors.accent};
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 0 20px rgba(${colors.accent.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.2);
}

.action-panel h2 {
  margin: 0 0 20px 0;
  color: ${colors.accent};
  text-align: center;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.action-button {
  position: relative;
  background: linear-gradient(135deg, rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.2), rgba(${colors.secondary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.2));
  border: 2px solid ${colors.primary};
  border-radius: 12px;
  padding: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  min-height: 120px;
}

.action-button:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.4), rgba(${colors.secondary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.4));
  box-shadow: 0 0 20px rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.4);
  transform: translateY(-3px);
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.action-button.cooldown {
  background: linear-gradient(135deg, rgba(100, 100, 100, 0.2), rgba(150, 150, 150, 0.2));
  border-color: #6b7280;
}

.action-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: ${colors.primary};
  text-transform: uppercase;
}

.action-content p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.3;
  color: #d1d5db;
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

/* Side Panel */
.side-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.system-status {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid #8b5cf6;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
  flex: 1;
}

.system-status h3 {
  margin: 0 0 15px 0;
  color: #a78bfa;
  text-align: center;
  text-transform: uppercase;
}

.event-log {
  height: 300px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
}

.log-entry {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  font-size: 0.85rem;
  line-height: 1.3;
  animation: fadeIn 0.5s ease-out;
}

.log-entry.system {
  background: rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1);
  border-left: 3px solid ${colors.primary};
}

.log-entry.action {
  background: rgba(16, 185, 129, 0.1);
  border-left: 3px solid #10b981;
}

.log-entry.event {
  background: rgba(239, 68, 68, 0.1);
  border-left: 3px solid #ef4444;
}

.timestamp {
  color: #9ca3af;
  font-size: 0.8rem;
  margin-right: 10px;
}

.concept-tracker {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid #f59e0b;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
}

.concept-tracker h3 {
  margin: 0 0 15px 0;
  color: #fbbf24;
  text-align: center;
  text-transform: uppercase;
}

.concept {
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.concept h4 {
  margin: 0 0 5px 0;
  color: #fcd34d;
  font-size: 0.9rem;
}

.concept p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: #d1d5db;
}

/* Tooltips */
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  white-space: nowrap;
  z-index: 100;
  border: 1px solid ${colors.primary};
  box-shadow: 0 0 15px rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.3);
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
  border: 2px solid ${colors.primary};
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 0 30px rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.4);
}

.game-over-screen h1 {
  text-align: center;
  color: ${colors.primary};
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 0 0 15px rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.5);
}

.performance-analysis {
  margin-bottom: 30px;
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
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.score-label {
  font-size: 1.2rem;
  font-weight: bold;
}

.score-value {
  font-size: 2rem;
  font-weight: bold;
}

.score-value.excellent {
  color: #10b981;
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.score-value.good {
  color: #f59e0b;
  text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.score-value.poor {
  color: #ef4444;
  text-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

.critical-failures {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.critical-failures h3 {
  color: #ef4444;
  margin-bottom: 10px;
}

.critical-failures ul {
  margin: 0;
  padding-left: 20px;
}

.resource-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.resource-final {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.resource-final .critical {
  color: #ef4444;
  font-weight: bold;
}

.resource-final .warning {
  color: #f59e0b;
  font-weight: bold;
}

.resource-final .normal {
  color: #10b981;
}

.insights {
  margin-bottom: 30px;
}

.insights h2 {
  color: #fbbf24;
  margin-bottom: 20px;
  text-align: center;
}

.insights-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.insight {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid #fbbf24;
}

.insight h3 {
  color: #fcd34d;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.insight p {
  margin: 0;
  line-height: 1.4;
  color: #d1d5db;
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
}

.restart-button:hover {
  background: linear-gradient(135deg, ${colors.secondary}, ${colors.primary});
  box-shadow: 0 0 25px rgba(${colors.primary.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.5);
  transform: translateY(-2px);
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes criticalPulse {
  0%, 100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.8); }
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
  
  .insights-content {
    grid-template-columns: 1fr;
  }
  
  .resource-summary {
    grid-template-columns: 1fr;
  }
}

/* Accessibility */
.action-button:focus,
.restart-button:focus {
  outline: 2px solid ${colors.primary};
  outline-offset: 2px;
}

.resource-bar:focus-within {
  outline: 1px solid ${colors.primary};
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .${gameName.toLowerCase()}-game {
    background: #000000;
    color: #ffffff;
  }
  
  .resource-bar,
  .action-button,
  .system-status,
  .concept-tracker {
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
  }, []);

  // Generate README
  const generateReadme = useCallback((topic, framework) => {
    const gameName = topic.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';

    const isVite = framework === 'vite';

    return `# ${topic} Educational Game

An interactive educational arcade game that teaches ${topic} concepts through strategic resource management and decision-making.

## Game Overview

This game simulates ${topic} management challenges where players must balance multiple resources, make strategic decisions, and adapt to dynamic events. Players learn about real-world ${topic} concepts through engaging gameplay mechanics.

## Features

- **Resource Management**: Balance multiple interconnected resources
- **Strategic Decision Making**: Choose from various actions with trade-offs
- **Dynamic Events**: Respond to unexpected challenges and opportunities
- **Educational Content**: Learn ${topic} concepts through gameplay
- **Performance Analytics**: Track your management effectiveness
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

## Customization

### Modifying Resources
Edit the \`resourceConfig\` object to change:
- Resource names and descriptions
- Initial values and colors
- Critical vs. non-critical designation

### Adjusting Actions
Modify the \`actions\` object to:
- Change action names and descriptions
- Adjust resource effects
- Update flavor text and concepts

### Timing and Events
Customize gameplay by modifying:
- Game duration (\`GAME_DURATION\`)
- Action cooldown (\`ACTION_COOLDOWN\`)
- Event trigger times
- Event effects

## Troubleshooting

### Common Issues

**Game not loading:**
- Check console for JavaScript errors
- Verify all imports are correct
- Ensure CSS file is properly linked

**Styling issues:**
- Confirm CSS file path is correct
- Check for CSS syntax errors
- Verify responsive design on different screen sizes

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

Feel free to modify and adapt for your specific educational needs!`;
  }, []);

  // Main generation function
  const handleGenerate = async () => {
    if (!userInput.trim()) {
      alert('Please enter a topic or idea for your game!');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate processing time for better UX
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
    <div className="universal-generator">
      <header className="generator-header">
        <h1>🎮 Educational Arcade Game App Creator</h1>
        <p>Transform any topic into an engaging educational arcade game</p>
        {generatedTheme && (
          <span className="theme-badge">
            {generatedTheme.name} Theme
          </span>
        )}
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
                <button 
                  type="button"
                  className="color-picker-toggle"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <Palette className="inline-icon" />
                  {showColorPicker ? 'Hide' : 'Show'} Color Customization
                </button>
                
                {showColorPicker && (
                  <div className="color-customization">
                    <div className="color-inputs">
                      <div className="color-input-group">
                        <label>Start Color</label>
                        <div className="color-input-wrapper">
                          <input
                            type="color"
                            value={startColor}
                            onChange={(e) => {
                              setStartColor(e.target.value);
                              applyTheme(e.target.value, endColor);
                            }}
                          />
                          <input
                            type="text"
                            value={startColor}
                            onChange={(e) => {
                              setStartColor(e.target.value);
                              applyTheme(e.target.value, endColor);
                            }}
                            placeholder="#667eea"
                          />
                        </div>
                      </div>
                      
                      <div className="color-input-group">
                        <label>End Color</label>
                        <div className="color-input-wrapper">
                          <input
                            type="color"
                            value={endColor}
                            onChange={(e) => {
                              setEndColor(e.target.value);
                              applyTheme(startColor, e.target.value);
                            }}
                          />
                          <input
                            type="text"
                            value={endColor}
                            onChange={(e) => {
                              setEndColor(e.target.value);
                              applyTheme(startColor, e.target.value);
                            }}
                            placeholder="#764ba2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="color-actions">
                      <button
                        type="button"
                        className="generate-theme-button"
                        onClick={generateTheme}
                        disabled={isGeneratingTheme}
                      >
                        <Sparkles className="inline-icon" />
                        {isGeneratingTheme ? 'Generating...' : 'Generate AI Theme'}
                      </button>
                      
                      <button
                        type="button"
                        className="random-colors-button"
                        onClick={generateRandomColors}
                      >
                        <Shuffle className="inline-icon" />
                        Random Colors
                      </button>
                    </div>

                    <div className="color-presets">
                      <h4>Color Presets</h4>
                      <div className="preset-grid">
                        {colorPresets.map((preset, index) => (
                          <button
                            key={index}
                            className="preset-button"
                            style={{
                              background: `linear-gradient(135deg, ${preset.start}, ${preset.end})`
                            }}
                            onClick={() => applyPreset(preset)}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {generatedTheme && (
                      <div className="generated-theme-preview">
                        <h4>{generatedTheme.name}</h4>
                        <p>{generatedTheme.concept}</p>
                        <div className="theme-colors">
                          <div 
                            className="color-swatch" 
                            style={{ backgroundColor: startColor }}
                          >
                            Start
                          </div>
                          <div 
                            className="color-swatch" 
                            style={{ backgroundColor: generatedTheme.accent }}
                          >
                            Accent
                          </div>
                          <div 
                            className="color-swatch" 
                            style={{ backgroundColor: endColor }}
                          >
                            End
                          </div>
                        </div>
                        <div 
                          className="theme-preview"
                          style={{
                            background: `linear-gradient(135deg, ${startColor}, ${endColor})`
                          }}
                        >
                          Preview of {generatedTheme.name} Theme
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button 
                className="generate-button"
                onClick={handleGenerate}
                disabled={isGenerating || !userInput.trim()}
              >
                {isGenerating ? '🔄 Generating...' : '🚀 Generate Game'}
              </button>

              {generatedPrompt && (
                <div className="generation-complete">
                  <h3>✅ Generation Complete!</h3>
                  <p>Your educational game has been generated. Use the tabs above to view:</p>
                  <ul>
                    <li><strong>XML Prompt</strong> - The engineered prompt for AI systems</li>
                    <li><strong>Game Code</strong> - Complete React component and CSS</li>
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
                  <p>Thematic CSS with animations and responsive design</p>
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
                  <h4>📊 Analytics</h4>
                  <p>Performance tracking and educational assessment features</p>
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
                <FileText className="inline-icon" />
                📝 XML Prompt
              </button>
              <button
                className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                <Code className="inline-icon" />
                ⚛️ Game Code
              </button>
              <button
                className={`tab-button ${activeTab === 'readme' ? 'active' : ''}`}
                onClick={() => setActiveTab('readme')}
              >
                <BookOpen className="inline-icon" />
                📚 Setup Guide
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'prompt' && (
                <div className="output-section">
                  <div className="section-header">
                    <h3>Generated XML Prompt</h3>
                    <div className="action-buttons">
                      <button onClick={() => copyToClipboard(generatedPrompt)}>
                        <Copy className="inline-icon" />
                        📋 Copy
                      </button>
                      <button onClick={() => downloadFile(generatedPrompt, 'game-prompt.xml')}>
                        <Download className="inline-icon" />
                        💾 Download
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
                    <div className="code-tab-header">
                      <button className="code-tab active">Component (.jsx)</button>
                      <button className="code-tab">Styles (.css)</button>
                    </div>
                    
                    <div className="section-header">
                      <h3>React Component Code</h3>
                      <div className="action-buttons">
                        <button onClick={() => copyToClipboard(generatedCode.component)}>
                          <Copy className="inline-icon" />
                          📋 Copy Component
                        </button>
                        <button onClick={() => copyToClipboard(generatedCode.css)}>
                          <Copy className="inline-icon" />
                          📋 Copy CSS
                        </button>
                        <button onClick={() => {
                          const gameName = userInput.split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';
                          downloadFile(generatedCode.component, `${gameName}.jsx`);
                        }}>
                          <Download className="inline-icon" />
                          💾 Download Component
                        </button>
                        <button onClick={() => {
                          const gameName = userInput.split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join('').replace(/[^a-zA-Z0-9]/g, '') + 'Game';
                          downloadFile(generatedCode.css, `${gameName}.css`);
                        }}>
                          <Download className="inline-icon" />
                          💾 Download CSS
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
                        <h4>CSS Styles</h4>
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
                        <Copy className="inline-icon" />
                        📋 Copy
                      </button>
                      <button onClick={() => downloadFile(generatedReadme, 'README.md')}>
                        <Download className="inline-icon" />
                        💾 Download README
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
            customized games, or use the complete code for immediate implementation!
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