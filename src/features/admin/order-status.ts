import { OrderStatus } from '@prisma/client'
import { Translations } from '@/types/translations'

/**
 * One definition of how an order state looks and reads.
 *
 * This lived as a copy-pasted `statusColors` map in four files, each using raw
 * Tailwind blues and purples that appear nowhere else in the product. The
 * colours are now semantic tokens (see `globals.css`) and the labels come from
 * `orders.steps`, which is already translated — the dashboard used to print the
 * raw enum (`OUT_FOR_DELIVERY`) in both languages.
 */
export type StatusTone = {
  /** Tailwind classes for the chip: tinted fill plus readable ink. */
  chip: string
  /** Solid colour for the leading dot and progress fills. */
  dot: string
}

export const STATUS_TONES: Record<OrderStatus, StatusTone> = {
  PENDING: { chip: 'bg-state-pending-tint text-state-pending', dot: 'bg-state-pending' },
  PAID: { chip: 'bg-state-paid-tint text-state-paid', dot: 'bg-state-paid' },
  PREPARING: { chip: 'bg-state-prep-tint text-state-prep', dot: 'bg-state-prep' },
  OUT_FOR_DELIVERY: { chip: 'bg-state-transit-tint text-state-transit', dot: 'bg-state-transit' },
  DELIVERED: { chip: 'bg-state-done-tint text-state-done', dot: 'bg-state-done' },
  CANCELLED: { chip: 'bg-state-void-tint text-state-void', dot: 'bg-state-void' }
}

export const statusTone = (status: OrderStatus): StatusTone =>
  STATUS_TONES[status] ?? STATUS_TONES.PENDING

/**
 * Human label for a state. `orders.steps` covers the five forward states;
 * CANCELLED sits outside that flow and has its own key.
 */
export const statusLabel = (status: OrderStatus, t: Translations): string => {
  if (status === OrderStatus.CANCELLED) return t.orders.cancelled
  return t.orders.steps[status as keyof typeof t.orders.steps] ?? status.replace(/_/g, ' ')
}

/** Every state in pipeline order, for selects and filters. */
export const STATUS_ORDER: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PAID,
  OrderStatus.PREPARING,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED
]
