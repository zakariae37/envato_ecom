'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { formUrlQuery } from '@/lib/utils'


interface Props {
    filters: { name: string, value: string }[];
}

const Filter = ({ filters }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const paramFilter = searchParams.get('filter')
    const handleUpdateParams = (value: string) => {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'filter',
          value
        })
        router.push(newUrl, { scroll: false })
    }
  return (
    <div>

      <Select
        onValueChange={handleUpdateParams}
        defaultValue={ paramFilter || undefined }
      >
      <SelectTrigger className='focus-visible:ring-0 focus-visible:ring-transparent'>

          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filter