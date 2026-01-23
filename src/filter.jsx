export default function Filter({ selectedFilters, onFilterChange }) {
  const eventTypes = ['class', 'social', 'classAndSocial', 'other'];
  const danceStyles = ['salsa', 'bachata', 'zouk', 'kizomba', 'other'];

  const handleEventTypeChange = (type) => {
    const updated = selectedFilters.eventType.includes(type)
      ? selectedFilters.eventType.filter(t => t !== type)
      : [...selectedFilters.eventType, type];
    onFilterChange({ ...selectedFilters, eventType: updated });
  };

  const handleDanceStyleChange = (style) => {
    const updated = selectedFilters.danceStyle.includes(style)
      ? selectedFilters.danceStyle.filter(s => s !== style)
      : [...selectedFilters.danceStyle, style];
    onFilterChange({ ...selectedFilters, danceStyle: updated });
  };

  return (
    <div style={{ 
      backgroundColor: "white", 
      padding: "20px", 
      borderRadius: "8px", 
      marginBottom: "20px" 
    }}>
      <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Filters</h3>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginTop: 0, marginBottom: "10px" }}>Event Type</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {eventTypes.map(type => (
            <label key={type} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selectedFilters.eventType.includes(type)}
                onChange={() => handleEventTypeChange(type)}
              />
              <span style={{ textTransform: "capitalize" }}>
                {type === 'classAndSocial' ? 'Class & Social' : type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ marginTop: 0, marginBottom: "10px" }}>Dance Style</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {danceStyles.map(style => (
            <label key={style} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selectedFilters.danceStyle.includes(style)}
                onChange={() => handleDanceStyleChange(style)}
              />
              <span style={{ textTransform: "capitalize" }}>{style}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
