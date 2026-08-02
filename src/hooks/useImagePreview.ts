'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Shows the picked file immediately, before the upload round-trips.
 *
 * `createObjectURL` pins the file in memory until it's revoked, so the previous
 * blob is released whenever it's replaced and on unmount. Server-provided URLs
 * are left alone — only blobs this hook minted are revoked.
 */
export function useImagePreview(initial?: string | null) {
  const [preview, setPreview] = useState(initial ?? '')
  const blobUrl = useRef<string>('')

  const release = () => {
    if (blobUrl.current) {
      URL.revokeObjectURL(blobUrl.current)
      blobUrl.current = ''
    }
  }

  // Follow the server value once a save round-trips a new image back.
  useEffect(() => {
    release()
    setPreview(initial ?? '')
  }, [initial])

  useEffect(() => release, [])

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    release()
    blobUrl.current = URL.createObjectURL(file)
    setPreview(blobUrl.current)
  }

  return { preview, setPreview, onFileChange }
}
