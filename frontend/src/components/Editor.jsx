import {useState} from 'react';

function Editor({onAnalyze, isLoading}) {
    const [text, setText] = useState('');

    const handleAnalyze = () => {
        if (text.trim()) {
            onAnalyze(text);
        }
    };

    const loadSample = () => {
        setText("Barack Obama was the 44th President of the United States.");
    };

    return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Text to Analyze</h2>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here... We'll find names, places, organizations, and more!"
        className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
      />
      
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !text.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </button>
        
        <button
          onClick={loadSample}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Load Sample Text
        </button>
        
        <button
          onClick={() => setText('')}
          className="bg-red-100 text-red-700 px-6 py-2 rounded-lg hover:bg-red-200 font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Editor;