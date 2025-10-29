import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateAr(
  date: Date | { toDate: () => Date } | string | number
) {
  let d: Date;
  if (
    date &&
    typeof date === "object" &&
    "toDate" in date &&
    typeof (date as any).toDate === "function"
  ) {
    d = (date as { toDate: () => Date }).toDate();
  } else if (date instanceof Date) {
    d = date;
  } else {
    d = new Date(date as string | number);
  }
  return d.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
