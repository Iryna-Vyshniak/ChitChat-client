import React from 'react';

import './Button.css';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'small' | 'default' | 'large';
  rounded?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'default',
  rounded,
  disabled,
  fullWidth,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        button
        button-${variant}
        button-${size}
        ${rounded ? 'button-rounded-full' : 'button-rounded-md'}
        ${fullWidth ? 'button-full' : 'button-fit'}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
