import { useRef, useState } from 'react';

import { cls } from 'utils/cls';
import { filterBySubstring } from 'utils/filterBySubstring';

import styles from './AutoComplete.module.scss';

type AutoCompleteProps = {
  options: string[];
  label: string;
  onChange?: (value: string) => void;
  inputType: string;
  name: string;
};

export default function AutoComplete({
  options,
  label,
  onChange,
  inputType,
  name,
}: AutoCompleteProps) {
  const [suitableOptions, setSuitableOptions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateSuitableOptions = (input: string) => {
    if (!input || options.includes(input)) {
      setSuitableOptions([]);
      return;
    }

    const filteredOptions = filterBySubstring(options, input);

    setSuitableOptions(filteredOptions);
  };

  const handleInputChange = (newInput: string) => {
    if (inputRef.current) {
      inputRef.current.value = newInput;
    }
    onChange?.(newInput);

    updateSuitableOptions(newInput);
  };

  return (
    <div className={styles.container} onBlur={() => setSuitableOptions([])}>
      <label htmlFor={name}>
        {label}
        <input
          ref={inputRef}
          type={inputType}
          onChange={(e) => handleInputChange(e.target.value)}
          id={name}
          name={name}
        />
      </label>

      <div
        className={cls(
          styles.optionsList,
          suitableOptions.length && styles.visible
        )}
      >
        {suitableOptions.map((option) => (
          <button
            key={option}
            type="button"
            onMouseDown={() => handleInputChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
