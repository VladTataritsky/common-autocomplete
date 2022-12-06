import React, { useState, useMemo, useEffect, useCallback } from "react";
import styles from "./Autocomplete.module.css";

interface AutocompleteProps<T> {
  options: T[];
  renderOption: (option: T) => React.ReactNode;
  inputVal: (value: string) => string;
  searchKey?: string;
  inputLabel?: string;
  filterStringBy: "start" | "end";
}

const Autocomplete = <T extends unknown>({
  options,
  renderOption,
  searchKey,
  inputVal,
  inputLabel,
  filterStringBy,
}: AutocompleteProps<T>) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [hasFocus, setFocus] = useState(false);
  const [isOptionsShow, setIsOptionsShow] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [inputValue, setInputValue] = useState("");

  const filterOptions = (options, value) => {
    return options.filter((option) => {
      let optionString = option;
      if (typeof option === "object" && searchKey) {
        optionString = option[searchKey];
      }
      if (filterStringBy === "start") {
        return optionString.toLowerCase().startsWith(value.toLowerCase());
      }
      if (filterStringBy === "end") {
        return optionString.toLowerCase().endsWith(value.toLowerCase());
      }
      return optionString.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    const newFilteredOptions = filterOptions(options, value);
    setFilteredOptions(newFilteredOptions);
    setIsOptionsShow(true);
    setInputValue(e.currentTarget.value);
    inputVal(e.currentTarget.value);
  };

  const handleOptionClick = useCallback((e) => {
    setFilteredOptions([]);
    setIsOptionsShow(false);
    setInputValue(e.currentTarget.innerText);
    inputVal(e.currentTarget.innerText);
  }, [inputVal]);

  useEffect(() => {
    if (hasFocus && !inputValue) {
      setInfoText("Enter a search value");
    } else if (!filteredOptions.length && inputValue && isOptionsShow) {
      setInfoText("Not found");
    } else {
      setInfoText("");
    }
  }, [filteredOptions.length, hasFocus, inputValue, isOptionsShow]);

  const handleInputFocus = useCallback(
    (e) => {
      setFocus(true);
    },
    [setFocus]
  );

  const handleInputBlur = useCallback(
    (e) => {
      setFocus(false);
    },
    [setFocus]
  );

  const renderOptions = useMemo(() => {
    if (isOptionsShow && inputValue && filteredOptions.length) {
      return (
        <ul className={styles.options_list}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className={styles.option_list_item}
              onClick={handleOptionClick}
            >
              {renderOption(option)}
            </li>
          ))}
        </ul>
      );
    }
    return <></>;
  }, [
    filteredOptions,
    inputValue,
    isOptionsShow,
    renderOption,
    handleOptionClick,
  ]);

  return (
    <div>
      {inputLabel && (
        <div className={styles.input_label}>
          <label>{inputLabel}</label>
        </div>
      )}
      <input
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={inputValue}
      />
      {renderOptions}
      {infoText && <div className={styles.info_text}>{infoText}</div>}
    </div>
  );
};

export default Autocomplete;
