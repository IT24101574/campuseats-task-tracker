function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <span>Search the menu</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search dishes..."
        type="search"
      />
    </label>
  );
}

export default SearchBar;
