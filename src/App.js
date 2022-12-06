import "./App.css";
import Autocomplete from "./components/common/Autocomplete/Autocomplete.tsx";

function App() {
  return (
    <div className="app">
      <div className="autocomplete_container">
        <Autocomplete
          options={[
            { firstName: "Jack", lastName: "Johnson" },
            { firstName: "John", lastName: "Jackson" },
            { firstName: "Sarah", lastName: "Williams" },
          ]}
          renderOption={({ firstName }) => <>{firstName}</>}
          searchKey="firstName"
          inputVal={(val) => console.log("value:", val)}
          inputLabel="Autocomplete with array of objects as options"
          filterStringBy="start"
        />
      </div>
      <div className="autocomplete_container">
        <Autocomplete
          renderOption={(el) => <>{el}</>}
          inputVal={(val) => console.log("value:", val)}
          options={["Minsk", "London", "Paris", "Mogilev", "Moscow", "Berlin"]}
          inputLabel="Autocomplete with array as options"
          filterStringBy="end"
        />
      </div>
    </div>
  );
}

export default App;
