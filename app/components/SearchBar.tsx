import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useFilteredData } from '../Hooks/useFilteredFunctions'

interface SearchBarType {
  placeholder: string
}

export default function SearchBar({ placeholder }: SearchBarType) {
  const { filterFunction } = useFilteredData('projects')

  return (
    <div className="flex items-center">
      <div className="border-b-2 border-royal-blue-600 h-[39px] w-11 justify-center flex items-center">
        <SearchOutlined className="text-slate-400 outline-none text-xl" />
      </div>

      <div className="border-b-2 border-slate-200">
        <input
          type="text"
          placeholder={placeholder}
          onChange={filterFunction}
          className="p-2 bg-transparent text-[14px] outline-none"
        />
      </div>
    </div>
  )
}
