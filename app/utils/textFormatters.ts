export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatCompact(num: number): string {
  if (num === 0) return '';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(num);
}

export const stringQueryCheck = (query: string, string: string | void) => {
  const q = query;
  return (s: string | void = string) => {
    if (!s) return true;
    return s.toLowerCase().includes(q.toLowerCase());
  };
};
