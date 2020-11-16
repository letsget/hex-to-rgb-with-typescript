import React, { FC, useState } from 'react';
import hexRgb from 'hex-rgb';

const MAX_HEX_LENGTH: number = 7;

const Form: FC = () => {
  const [bgColor, setBgColor] = useState<string>('');
  const [error, setError] = useState<string>('');
  const bg: string = error ? '#dc3545' : bgColor;

  const parseRgbValue = (hex: string): string => {
    const parsedValue: number[] = hexRgb(hex, { format: 'array' });
    return `rgb(${parsedValue.join(',').slice(0, -2)})`;
  };

  const handleColorChange = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>): void => {
    const hex: number = value.length;
    if (hex === MAX_HEX_LENGTH) {
      setError('');
      try {
        setBgColor(parseRgbValue(value));
      } catch (err) {
        setError('Ошибка!');
      }
    } else if (hex > MAX_HEX_LENGTH) {
      setError('Ошибка!');
    }
  };

  return (
    <div className="container" style={{ backgroundColor: `${bg}` }}>
      <form>
        <input
          className="color-input"
          placeholder="hex value"
          type="text"
          onChange={handleColorChange}
        />
        <div className="converted-value">{error || bgColor}</div>
      </form>
    </div>
  );
};

export default Form;
