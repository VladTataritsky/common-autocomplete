import React, { useState, useMemo, useEffect, useCallback } from "react";
import styles from "./Autocomplete.module.css";

export interface AutocompleteProps<T> {
  options: T[];
  renderOption: (option: T) => React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  searchKey?: string;
  inputLabel?: string;
  filterStringBy?: "start" | "end";
  disabled?: boolean;
  required?: boolean;
}

const Autocomplete = <T extends unknown>({
  options,
  renderOption,
  searchKey,
  value = "",
  onChange,
  inputLabel,
  filterStringBy,
  disabled,
  required,
  defaultValue = "",
}: AutocompleteProps<T>) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [hasFocus, setFocus] = useState(false);
  const [isOptionsShow, setIsOptionsShow] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [inputValue, setInputValue] = useState(defaultValue);

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
    onChange && onChange(e.currentTarget.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleOptionClick = useCallback(
    (e) => {
      setFilteredOptions([]);
      setIsOptionsShow(false);
      setInputValue(e.currentTarget.innerText);
      onChange && onChange(e.currentTarget.value);
    },
    [onChange]
  );

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
          <label>
            {inputLabel}
            {required && "*"}
          </label>
        </div>
      )}
      <input
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={inputValue}
        disabled={disabled}
        required={required}
      />
      {renderOptions}
      {infoText && <div className={styles.info_text}>{infoText}</div>}
    </div>
  );
};

export default Autocomplete;
