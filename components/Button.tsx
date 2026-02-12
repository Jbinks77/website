import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: 'primary' | 'outline';
};

const styles = {
  primary: 'bg-rosegold text-white hover:bg-[#a97969]',
  outline: 'border border-rosegold text-rosegold hover:bg-rosegold/10'
};

export function Button({ href, variant = 'primary', className, children, ...props }: Props) {
  const classes = clsx('inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all', styles[variant], className);

  if (href) return <Link href={href} className={classes}>{children}</Link>;

  return <button className={classes} {...props}>{children}</button>;
}
