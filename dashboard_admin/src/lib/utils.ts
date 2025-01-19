import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getChartColorByEngagementRate(trafficShare: number) {
  if (trafficShare > 70) {
    return "#16a679";
  }
  if (trafficShare > 40) {
    return "#d89b0d";
  }
  return "#c5280c";
}

export function addSpacesToCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function formatNumber(value: number): string {
  // Check if the value is less than 0
  if (value < 0) {
    // Handle negative values separately and format the absolute value
    const absoluteValue = Math.abs(value);
    return `-${formatNumber(absoluteValue)}`;
  } else if (value >= 1e9) {
    // Format the value in billions
    const formattedValue = value / 1e9;
    return `${formattedValue.toFixed(1)}B`;
  } else if (value >= 1e6) {
    // Check if the value is between 1 million and 1 billion
    // Format the value in millions
    const formattedValue = value / 1e6;
    return `${formattedValue.toFixed(1)}M`;
  } else if (value >= 1000) {
    // Check if the value is between 1 thousand and 1 million
    // Format the value in thousands
    const formattedValue = value / 1000;
    return `${formattedValue.toFixed(1)}K`;
  } else {
    // If the value is less than 1 thousand, return the original value as a string
    return value.toString();
  }
}

export function filterData<T extends Record<string, any>>(
  array: T[],
  filterKeys: string[]
) {
  return array.filter((obj) => {
    return Object.values(obj).some((key) => filterKeys.includes(key));
  });
}

export const avatarIds: string[] = [];
for (let i = 1; i <= 15; i++) {
  const formattedNumber = i.toString().padStart(2, "0");
  avatarIds.push(formattedNumber);
}

export function getRandomArrayElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function toCurrency(
  number: number | string,
  disableDecimal = false,
  decimalPlaces = 2
) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: disableDecimal ? 0 : decimalPlaces,
    maximumFractionDigits: disableDecimal ? 0 : decimalPlaces,
  });
  return formatter.format(+number);
}

export function formatDate(
  date?: Date,
  format: string = "DD MMM, YYYY"
): string {
  if (!date) return "";
  return dayjs(date).format(format);
}



export function getFormattedDateString(date: number | string | null | Date) {
  if (!date) return date as string;
  return dayjs(date).format('DD-MMM-YYYY');
}

export function getDateRangeStateValues(state: string | null) {
  if (!state) {
    return null;
  }
  return new Date(state);
}

export function getFormattedDateRangeString(dates: Date[]) {
  const [start, end] = Array.isArray(dates) ? dates : [];
  if (start && end) {
    return `${getFormattedDateString(start)};${getFormattedDateString(end)}`;
  }
  return getFormattedDateString(start);
}


export function removeLeadingSlash(inputString: string) {
  // Check if the string starts with a forward slash
  if (inputString.startsWith('/')) {
    // Remove the leading forward slash and return the modified string
    return inputString.substring(1);
  } else {
    // If the string doesn't start with a forward slash, return it as is
    return inputString;
  }
}
