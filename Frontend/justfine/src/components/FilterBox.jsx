import '../static/FilterBox.css';

function FilterBox({filters, active, onChange}) {

  return (
    <div className="filter-row">
      {filters.map(f => (
        <button key={f} className={`filter-chip ${active === f ? "active" : ""}`}
          onClick={() => onChange(f)}>{f}</button>
      ))}
    </div>
  );
}

export default FilterBox;