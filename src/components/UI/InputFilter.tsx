import React, { InputHTMLAttributes, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import clsx from 'clsx';
import { motion } from 'motion/react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  filter: string;
  changeFilter: (filter: string) => void;
  width?: string;
  color?: string;
}

const InputFilter: React.FC<IProps> = ({
  filter,
  changeFilter,
  width = '3/4',
  color = 'mainBlue',
  onBlur = () => {},
  onFocus = () => {},
}) => {
  const [focusInput, setFocusInput] = useState<boolean>(false);

  const handleFocus = (e: any) => {
    setFocusInput(true);
    onFocus?.(e); // Викликається лише, якщо переданий
  };

  const handleBlur = (e: any) => {
    setFocusInput(false);
    onBlur?.(e); // Викликається лише, якщо переданий
  };

  return (
    <div className={clsx(`relative h-8 w-${width}`)}>
      <input
        value={filter}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={e => changeFilter(e.target.value)}
        type="text"
        placeholder={focusInput ? 'Search' : ''}
        className={clsx(
          `border rounded-[50px] w-full h-8 focus:bg-${color} focus:outline-0 text-[15px] font-semibold  pl-3 pr-8  placeholder:opacity-50 `,
          `text-customWhite placeholder:text-customWhite`,
          `border-${color}`,
          focusInput || filter ? `bg-${color} focus:bg-${color}` : ''
        )}
        aria-label="Search input"
      />
      <motion.div
        className="w-fit h-fit absolute top-1/2 -translate-y-1/2"
        initial={{ left: '0.5rem', right: 'auto' }}
        animate={
          focusInput || filter
            ? { right: '0.5rem', left: 'auto' }
            : { left: '0.5rem', right: 'auto' }
        }
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <FaSearch
          className={clsx(
            focusInput || filter ? 'fill-white' : `fill-${color}`
          )}
        />
      </motion.div>
    </div>
  );
};

export default InputFilter;
