'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Translations } from '@/types/translations'
import { Extras, ProductSizes, Sizes } from '@prisma/client'
import { Plus, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useParams } from 'next/navigation'
import { Languages } from '@/constants/enums'
import { ItemOptionsKeys, useItemOptions } from './hooks'

export { ItemOptionsKeys }

function ItemOptions({
  state,
  setState,
  translations,
  optionKey
}: {
  state: Partial<Sizes>[] | Partial<Extras>[]
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Sizes>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extras>[]>>
  translations: Translations
  optionKey: ItemOptionsKeys
}) {
  const { addOption, onChange, removeOption, availableNames, hasAvailableOptions } = useItemOptions(
    optionKey,
    state,
    setState
  )

  return (
    <div className='w-full'>
      {state.length > 0 && (
        <ul className='w-full'>
          {state.map((item, index) => (
            <li key={index} className='flex gap-2 mb-2'>
              <div className='space-y-1 basis-1/2'>
                <Label>name</Label>
                <SelectName
                  item={item}
                  onChange={onChange}
                  index={index}
                  names={availableNames(item.name)}
                />
              </div>
              <div className='space-y-1 basis-1/2'>
                <Label>Extra Price</Label>
                <Input
                  type='number'
                  placeholder='0'
                  min={0}
                  name='price'
                  value={item.price}
                  onChange={e => onChange(e, index, 'price')}
                  className='bg-white focus:!ring-0'
                />
              </div>
              <div className='flex items-center'>
                <Button
                  type='button'
                  variant='outline'
                  className='bg-red-500 text-white'
                  onClick={() => removeOption(index)}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {hasAvailableOptions && (
        <Button type='button' variant='outline' className='w-full' onClick={addOption}>
          <Plus />
          {optionKey === ItemOptionsKeys.SIZES
            ? translations.admin['menu'].addItemSize
            : translations.admin['menu'].addExtraItem}
        </Button>
      )}
    </div>
  )
}

export default ItemOptions

const SelectName = ({
  onChange,
  index,
  item,
  names
}: {
  index: number
  item: Partial<Sizes> | Partial<Extras>
  /** Names still free, plus this row's own — see `useItemOptions`. */
  names: (ProductSizes | Extras['name'])[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any, index: any, fieldName: any) => void
}) => {
  const { locale } = useParams()

  return (
    <Select
      onValueChange={value => onChange({ target: { value } }, index, 'name')}
      defaultValue={item.name ? item.name : 'select...'}
    >
      <SelectTrigger
        className={` bg-white border-none mb-4 focus:ring-0 w-full ${
          locale === Languages.ARABIC ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <SelectValue>{item.name ? item.name : 'select...'}</SelectValue>
      </SelectTrigger>
      <SelectContent className='bg-transparent border-none z-50 w-full'>
        <SelectGroup className='bg-background text-accent z-50'>
          {names.map(name => (
            <SelectItem
              key={name}
              value={name}
              className='hover:!bg-brand hover:!text-white !text-accent !bg-transparent'
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
