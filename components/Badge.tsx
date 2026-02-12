import { ReactNode } from 'react';

export function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-nude px-3 py-1 text-xs font-medium text-espresso">{children}</span>;
}
