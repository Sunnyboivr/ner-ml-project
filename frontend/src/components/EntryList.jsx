function EntityList({ entities, counts, onEntityClick, selectedEntity }) {
  // Group entities by their label (type)
  const groupedEntities = {};
  
  entities.forEach(entity => {
    if (!groupedEntities[entity.label]) {
      groupedEntities[entity.label] = [];
    }
    // Only add unique entity texts
    if (!groupedEntities[entity.label].includes(entity.text)) {
      groupedEntities[entity.label].push(entity.text);
    }
    });

    // Colors for different entity types
    const colorMap = {
    'PER': 'bg-pink-200 border-pink-400',       // Person
    'PERSON': 'bg-pink-200 border-pink-400',    // Person (WNUT)
    'ORG': 'bg-blue-200 border-blue-400',       // Organization
    'CORPORATION': 'bg-blue-200 border-blue-400', // Corporation (WNUT)
    'LOC': 'bg-green-200 border-green-400',     // Location
    'LOCATION': 'bg-green-200 border-green-400', // Location (WNUT)
    'GPE': 'bg-green-200 border-green-400',     // Geopolitical Entity
    'MISC': 'bg-purple-200 border-purple-400',  // Miscellaneous
    'DATE': 'bg-purple-200 border-purple-400',
    'MONEY': 'bg-orange-200 border-orange-400',
    'PRODUCT': 'bg-yellow-200 border-yellow-400',
    'GROUP': 'bg-indigo-200 border-indigo-400',
    'CREATIVE-WORK': 'bg-rose-200 border-rose-400',
    };

  // Friendly names for labels
    const labelNames = {
    'PER': 'People',
    'PERSON': 'People',
    'ORG': 'Organizations',
    'CORPORATION': 'Organizations',
    'LOC': 'Locations',
    'LOCATION': 'Locations',
    'GPE': 'Places',
    'MISC': 'Miscellaneous',
    'DATE': 'Dates',
    'MONEY': 'Money',
    'PRODUCT': 'Products',
    'GROUP': 'Groups',
    'CREATIVE-WORK': 'Creative Works',
    };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Detected Entities</h2>
      
      {/* Summary counts */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-semibold text-gray-600 mb-2">Summary:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(counts).map(([label, count]) => (
            <span key={label} className={`px-3 py-1 rounded-full text-sm font-semibold ${colorMap[label] || 'bg-gray-100 text-gray-800'}`}>
              {labelNames[label] || label}: {count}
            </span>
          ))}
        </div>
      </div>

      {/* Entity lists by type */}
      <div className="space-y-4">
        {Object.entries(groupedEntities).map(([label, entityList]) => (
          <div key={label}>
            <h3 className="font-bold text-gray-700 mb-2">
              {labelNames[label] || label} ({entityList.length})
            </h3>
            <div className="space-y-1">
              {entityList.map((entityText, idx) => (
                <button
                  key={idx}
                  onClick={() => onEntityClick(entityText)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition ${
                    selectedEntity === entityText ? 'bg-gray-200 font-semibold' : ''
                  }`}
                >
                  {entityText}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Export button (we'll implement later) */}
      <button className="w-full mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold">
        Export as CSV
      </button>
    </div>
  );
}

export default EntityList;