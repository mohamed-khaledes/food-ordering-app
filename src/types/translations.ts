import type en from '@/dictionaries/en.json'

/**
 * Derived from the English dictionary so the type can never drift from the
 * JSON. `en.json` and `ar.json` are kept key-for-key identical — adding a key
 * to one without the other is a type error at every call site.
 */
export type Translations = typeof en
