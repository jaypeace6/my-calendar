export default function Filter({ selectedFilters, onFilterChange }) {
  const eventTypes = ['class', 'social', 'classAndSocial', 'other'];
  const danceStyles = ['salsa', 'bachata', 'zouk', 'kizomba', 'other'];
  const hasFilters = selectedFilters.eventType.length > 0 || selectedFilters.danceStyles.length > 0;

  const handleResetFilters = () => {
    onFilterChange({ eventType: [], danceStyles: [] });
  };

  const handleEventTypeChange = (type) => {
    const updated = selectedFilters.eventType.includes(type)
      ? selectedFilters.eventType.filter(t => t !== type)
      : [...selectedFilters.eventType, type];
    onFilterChange({ ...selectedFilters, eventType: updated });
  };

  const handleDanceStyleChange = (style) => {
    const updated = selectedFilters.danceStyles.includes(style)
      ? selectedFilters.danceStyles.filter(s => s !== style)
      : [...selectedFilters.danceStyles, style];
    onFilterChange({ ...selectedFilters, danceStyles: updated });
  };

  return (
    <div className="filters-card" style={{ 
      backgroundColor: "white", 
      padding: "20px", 
      borderRadius: "8px", 
      marginBottom: "20px" 
    }}>
      <div className="filters-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>Filters</h3>
        <button
          type="button"
          className="filters-reset"
          onClick={handleResetFilters}
          disabled={!hasFilters}
        >
          Reset filters
        </button>
      </div>

      <div style={{ marginBottom: "20px", marginTop: "15px" }}>
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
                checked={selectedFilters.danceStyles.includes(style)}
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
