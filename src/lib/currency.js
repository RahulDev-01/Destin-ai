export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150,
  INR: 83,
  AUD: 1.53,
  CAD: 1.35,
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
};

/**
 * Extracts numeric values from a string, converts them based on the currency,
 * and formats the output string. Can handle ranges like "$100 - 200".
 */
export const formatPrice = (priceString, targetCurrency = 'USD') => {
  if (!priceString) return priceString;

  const rate = EXCHANGE_RATES[targetCurrency] || 1;
  const symbol = CURRENCY_SYMBOLS[targetCurrency] || targetCurrency + ' ';

  // Regex to match numbers with optional commas
  const numberRegex = /[\d,]+(\.\d+)?/g;

  // We find all matches, convert them, and replace them in the original string
  let result = priceString;
  let matches = [...priceString.matchAll(numberRegex)];

  if (matches.length === 0) return priceString; // No numbers found

  // To avoid replacing the wrong instances of numbers (e.g., if there's "100 - 1000",
  // we replace from right to left using indices so we don't mess up earlier indices)
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const originalText = match[0];
    const startIndex = match.index;

    // clean the comma
    const cleanNumberStr = originalText.replace(/,/g, '');
    const num = parseFloat(cleanNumberStr);

    if (!isNaN(num)) {
      let converted = num * rate;

      // Adjust formatting based on currency
      let formattedNum = converted.toLocaleString(undefined, {
        maximumFractionDigits: targetCurrency === 'JPY' ? 0 : 2,
        minimumFractionDigits: targetCurrency === 'JPY' ? 0 : 2
      });

      result =
        result.substring(0, startIndex) +
        formattedNum +
        result.substring(startIndex + originalText.length);
    }
  }

  // Remove existing symbols like $, €, £, ₹, JPY, EUR, etc. and add the new symbol at the start or next to the numbers
  result = result.replace(/[$€£₹¥]/g, '').replace(/\b(USD|EUR|GBP|JPY|INR|AUD|CAD)\b/g, '').trim();

  // Clean up any double spaces, trailing/leading hyphens left
  result = result.replace(/\s+/g, ' ').replace(/^\s*-\s*/, '').replace(/\s*-\s*$/, '').trim();

  // Simply prefix the result with the symbol
  return `${symbol}${result}`;
};
