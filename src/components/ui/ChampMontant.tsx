import { type ChangeEvent } from 'react';

interface ChampMontantProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  id?: string;
  helpText?: string;
  min?: number;
  max?: number;
}

export default function ChampMontant({
  label,
  value,
  onChange,
  placeholder = '0',
  suffix = 'DH',
  id,
  helpText,
}: ChampMontantProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    // Allow digits, spaces, commas, dots
    const cleaned = raw.replace(/[^0-9\s.,]/g, '');
    onChange(cleaned);
  }

  return (
    <div className="mb-4">
      <label htmlFor={fieldId} className="block text-sm font-semibold text-amber-900 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          id={fieldId}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="input-field pr-12"
          autoComplete="off"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium pointer-events-none">
          {suffix}
        </span>
      </div>
      {helpText && (
        <p className="mt-1 text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
