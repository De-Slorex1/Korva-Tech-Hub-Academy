const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

export function numberToWords(num: number): string {
  if (num === 0) return "Zero";

  if (num < 20) return ones[num];

  if (num < 100) {
    return (
      tens[Math.floor(num / 10)] +
      (num % 10 !== 0 ? " " + ones[num % 10] : "")
    );
  }

  if (num < 1000) {
    return (
      ones[Math.floor(num / 100)] +
      " Hundred " +
      numberToWords(num % 100)
    );
  }

  if (num < 1000000) {
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand " +
      numberToWords(num % 1000)
    );
  }

  return num.toString();
}