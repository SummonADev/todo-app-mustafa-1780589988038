import type { TodoCategory } from '@/types/todo';

export const categoryConfig: Record<TodoCategory, { label: string; color: string; bg: string }> = {
  personal: { label: 'Personal', color: 'text-blue-600', bg: 'bg-blue-100' },
  work: { label: 'Work', color: 'text-purple-600', bg: 'bg-purple-100' },
  shopping: { label: 'Shopping', color: 'text-green-600', bg: 'bg-green-100' },
  health: { label: 'Health', color: 'text-red-600', bg: 'bg-red-100' },
  other: { label: 'Other', color: 'text-gray-600', bg: 'bg-gray-100' },
};

export const categoryOptions: TodoCategory[] = ['personal', 'work', 'shopping', 'health', 'other'];