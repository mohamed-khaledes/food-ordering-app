'use client'

import Toast from '@/components/ui/toast'
import { useCallback, useState } from 'react'
import { ActionState, isActionSuccess } from './useActionToast'

type MutationOptions<TResult> = {
  /** Toast on success. Ignored when the action answers with its own message. */
  success?: string
  /** Toast when the action throws. Omit to fail silently (console only). */
  error?: string
  /** `window.confirm` text. Declining skips the call entirely. */
  confirm?: string
  /** Runs after a successful call — navigation, refresh, local state. */
  onSuccess?: (result: TResult) => void
}

/**
 * One server-action call with a pending flag and a toast, replacing the
 * loading/try/catch/finally block every delete button, status select and role
 * toggle in the dashboard wrote out by hand.
 *
 * The app has two action conventions and this covers both:
 *  - actions that answer `{ status, message }` — the toast comes from the
 *    result, so the server picks the (translated) wording;
 *  - actions that throw on failure and return nothing useful — the fixed
 *    `success` / `error` messages are used.
 */
export function useMutation<TArgs extends unknown[], TResult>(
  mutate: (...args: TArgs) => Promise<TResult>,
  options: MutationOptions<TResult> = {}
) {
  const [pending, setPending] = useState(false)
  const { success, error, confirm, onSuccess } = options

  const run = useCallback(
    async (...args: TArgs) => {
      if (confirm && !window.confirm(confirm)) return
      setPending(true)
      try {
        const result = await mutate(...args)
        const answered = result as ActionState | undefined
        const hasOwnMessage = Boolean(answered?.message && answered?.status)

        if (hasOwnMessage) {
          Toast(answered!.message!, isActionSuccess(answered!.status) ? 'success' : 'error')
        } else if (success) {
          Toast(success, 'success')
        }

        // A returned failure status is not a success, even though it resolved.
        if (!hasOwnMessage || isActionSuccess(answered!.status)) onSuccess?.(result)
        return result
      } catch (thrown) {
        console.error(thrown)
        if (error) Toast(error, 'error')
      } finally {
        setPending(false)
      }
    },
    [mutate, success, error, confirm, onSuccess]
  )

  return { run, pending }
}
