import type { TodoCategory } from '../types/todo';

// Category hues are fixed; the dark: variants (keyed off data-theme) keep the
// badges readable on dark surfaces in every accent theme.
export const categoryConfig: Record<TodoCategory, { label: string; color: string; bg: string }> = {
  personal: { label: 'Personal', color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-400/15' },
  work: { label: 'Work', color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-400/15' },
  shopping: { label: 'Shopping', color: 'text-green-600 dark:text-green-300', bg: 'bg-green-100 dark:bg-green-400/15' },
  health: { label: 'Health', color: 'text-red-600 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-400/15' },
  other: { label: 'Other', color: 'text-gray-600 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-400/15' },
};

export const categoryOptions: TodoCategory[] = ['personal', 'work', 'shopping', 'health', 'other'];
