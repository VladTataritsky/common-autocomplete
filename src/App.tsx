import React from "react";
import "./App.css";
import Autocomplete from "./components/common/Autocomplete/Autocomplete";

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
          onChange={(val) => console.log("value:", val)}
          inputLabel="Autocomplete with array of objects as options"
          filterStringBy="start"
          required
        />
      </div>
      <div className="autocomplete_container">
        <Autocomplete
          renderOption={(el) => <>{el}</>}
          onChange={(val) => console.log("value:", val)}
          defaultValue="London"
          options={["Minsk", "London", "Paris", "Mogilev", "Moscow", "Berlin"]}
          inputLabel="Autocomplete with array as options"
          filterStringBy="end"
          // disabled
        />
      </div>
    </div>
  );
}

export default App;
