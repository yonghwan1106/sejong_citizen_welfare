import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { RiskLevel, Household } from '@/types/household';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  return format(new Date(date), formatStr, { locale: ko });
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

export function getRiskLevelColor(level: RiskLevel): string {
  const colors = {
    RED: 'text-red-600 bg-red-50',
    ORANGE: 'text-orange-600 bg-orange-50',
    YELLOW: 'text-yellow-600 bg-yellow-50',
    GREEN: 'text-green-600 bg-green-50',
  };
  return colors[level];
}

export function getRiskLevelText(level: RiskLevel): string {
  const texts = {
    RED: '매우 높음',
    ORANGE: '높음',
    YELLOW: '보통',
    GREEN: '낮음',
  };
  return texts[level];
}

export function getRiskScoreColor(score: number): string {
  if (score >= 80) return 'text-red-600';
  if (score >= 60) return 'text-orange-600';
  if (score >= 30) return 'text-yellow-600';
  return 'text-green-600';
}

export function calculateRiskTrend(household: Household): 'increasing' | 'decreasing' | 'stable' {
  const recentElectricity = household.electricityUsage.slice(-3);
  const overdueCount = recentElectricity.filter(u => u.overdue).length;

  if (overdueCount >= 2) return 'increasing';
  if (overdueCount === 0) return 'stable';
  return 'decreasing';
}

export function getUrgencyColor(urgency: string): string {
  const colors = {
    CRITICAL: 'bg-red-100 text-red-800',
    HIGH: 'bg-orange-100 text-orange-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-green-100 text-green-800',
  };
  return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}
