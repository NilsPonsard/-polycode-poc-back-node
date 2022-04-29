// Returns true if one of the values is undefined.
export default function isUndefined(...values: any): boolean {
  for (const value of values) if (typeof value === 'undefined') return true;
  return false;
}
