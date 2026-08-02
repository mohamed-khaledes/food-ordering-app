'use client'

import { ActionState, useActionToast } from '@/hooks/useActionToast'
import { useMutation } from '@/hooks/useMutation'
import { addCategory, deleteCategory, updateCategory } from './_actions/category'

const initialState: ActionState = {
  message: '',
  error: {},
  status: null
}

/** New-category form in the sidebar of the categories page. */
export function useAddCategoryForm() {
  return useActionToast(addCategory, initialState)
}

/**
 * Rename dialog. `updateCategory` answers 200 on success — the component used
 * to treat only 201 as success, so every saved rename toasted as an error.
 */
export function useEditCategoryForm(categoryId: string) {
  return useActionToast(updateCategory.bind(null, categoryId), initialState)
}

/** Delete button on a category row. The action supplies its own message. */
export function useDeleteCategory(categoryId: string) {
  const { run, pending } = useMutation(deleteCategory)
  return { remove: () => run(categoryId), pending }
}
