import { useState } from 'react';
import Editor from './components/Editor';
import HighlightedText from './components/HighLightedText';
import EntityList from './components/EntryList';
import { analyzeText } from './api';

function App() {
  const [analyzedText, setAnalyzedText] = useState('');
  const [entities, setEntities] = useState([]);
  const [counts, setCounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [error, setError] = useState(null);

  // Function called when user clicks "Analyze"
  const handleAnalyze = async (text) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call backend
      const result = await analyzeText(text);
      
      // Save results
      setAnalyzedText(text);
      setEntities(result.entities);
      setCounts(result.counts);
      setSelectedEntity(null);
      
    } catch (err) {
      setError('Failed to analyze text. Make sure backend is running on port 8000.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function called when user clicks an entity in the list
  const handleEntityClick = (entityText) => {
    setSelectedEntity(selectedEntity === entityText ? null : entityText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            📝 Named Entity Recognition Tool
          </h1>
          <p className="text-gray-600 text-lg">
            Paste text and instantly extract names, places, organizations, and more!
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-800 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Editor (always shown) */}
        <div className="mb-6">
          <Editor onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Results (only shown after analysis) */}
        {entities.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - highlighted text */}
            <div className="lg:col-span-2">
              <HighlightedText 
                text={analyzedText} 
                entities={entities}
                selectedEntity={selectedEntity}
              />
            </div>

            {/* Sidebar - entity list */}
            <div className="lg:col-span-1">
              <EntityList 
                entities={entities}
                counts={counts}
                onEntityClick={handleEntityClick}
                selectedEntity={selectedEntity}
              />
            </div>
          </div>
        )}

        {/* Empty state */}
        {entities.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">
              👆 Paste some text above and click "Analyze Text" to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;