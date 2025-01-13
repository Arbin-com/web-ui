import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

export interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  type = 'primary', 
  size = 'middle', 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <AntButton
      type={type}
      size={size}
      className={`shadow-md hover:shadow-lg transition-shadow ${className}`}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;