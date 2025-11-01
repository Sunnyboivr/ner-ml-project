function HighlightedText({ text, entities, selectedEntity }) {
  // If no text, show nothing
  if (!text) return null;

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

  // Sort entities by where they appear in text
  const sortedEntities = [...entities].sort((a, b) => a.start - b.start);

  // Split text into pieces (normal text + highlighted entities)
  const segments = [];
  let lastIndex = 0;

  sortedEntities.forEach((entity, idx) => {
    // Add normal text before this entity
    if (entity.start > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, entity.start)
      });
    }

    // Add the entity (highlighted)
    segments.push({
      type: 'entity',
      content: text.slice(entity.start, entity.end),
      label: entity.label,
      isSelected: selectedEntity === entity.text,
      key: idx
    });

    lastIndex = entity.end;
  });

  // Add remaining text after last entity
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Analyzed Text</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
        {segments.map((segment, idx) => {
          if (segment.type === 'text') {
            return <span key={idx}>{segment.content}</span>;
          } else {
            const color = colorMap[segment.label] || 'bg-gray-200 border-gray-400';
            return (
              <span
                key={segment.key}
                className={`${color} border-b-2 px-1 py-0.5 rounded ${
                  segment.isSelected ? 'ring-2 ring-offset-1 ring-black' : ''
                }`}
                title={segment.label}
              >
                {segment.content}
              </span>
            );
          }
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="text-sm font-semibold text-gray-600">Legend:</span>
        <span className="text-sm bg-pink-200 px-2 py-1 rounded border border-pink-400">Person</span>
        <span className="text-sm bg-blue-200 px-2 py-1 rounded border border-blue-400">Organization</span>
        <span className="text-sm bg-green-200 px-2 py-1 rounded border border-green-400">Location</span>
        <span className="text-sm bg-purple-200 px-2 py-1 rounded border border-purple-400">Misc</span>
      </div>
    </div>
  );
}

export default HighlightedText;