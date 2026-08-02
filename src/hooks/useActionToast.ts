'use client'

import Toast from '@/components/ui/toast'
import { ValidationErrors } from '@/validations/auth'
import { useActionState, useEffect, useRef } from 'react'

/** The shape every server action in `_actions/*` resolves to. */
export type ActionState<TError = ValidationErrors> = {
  message?: string
  status?: number | null
  error?: TError
  formData?: FormData | null
}

/** 201 on create, 200 on update. 400 carries field errors, 5xx a failure. */
export const isActionSuccess = (status?: number | null) => status === 200 || status === 201

/**
 * `useActionState` plus the result toast that every form in the app used to
 * write by hand.
 *
 * Silent on a 400: validation failures come back with `error` and no `message`,
 * and those are rendered next to the offending field instead. The effect waits
 * for `pending` to settle so a slow action can't fire twice, and it keys off the
 * whole state object — `useActionState` returns a fresh one per submit, so
 * resubmitting and getting the same message still notifies.
 */
export function useActionToast<TError = ValidationErrors>(
  // Server actions are bound per call site and never line up with
  // `useActionState`'s generic; casting here keeps `as any` out of the features.
  action: unknown,
  initialState: ActionState<TError>,
  onSuccess?: (state: ActionState<TError>) => void
) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [state, formAction, pending] = useActionState(action as any, initialState as any)
  const result = state as ActionState<TError>

  // Held in a ref so callers can pass an inline closure without it re-running
  // the toast effect on every render.
  const handleSuccess = useRef(onSuccess)
  useEffect(() => {
    handleSuccess.current = onSuccess
  })

  useEffect(() => {
    if (pending || !result.message || !result.status) return
    const ok = isActionSuccess(result.status)
    Toast(result.message, ok ? 'success' : 'error')
    if (ok) handleSuccess.current?.(result)
  }, [pending, result])

  return { state: result, action: formAction, pending }
}

/**
 * Mirrors the props a Prisma record hands to a form. Fields arrive as
 * `defaultValue`s, and `image` is skipped because a file input can't take one.
 */
export const toFormData = (record: Record<string, unknown> | null | undefined) => {
  const formData = new FormData()
  Object.entries(record ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== 'image') {
      formData.append(key, value.toString())
    }
  })
  return formData
}
