import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import { ButtonColorType } from 'antd/es/button';

export interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  className?: string;
  color?: ButtonColorType;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'middle',
  children,
  ...props
}) => {
  return (
    <AntButton
      type={type}
      variant='solid'
      size={size}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;