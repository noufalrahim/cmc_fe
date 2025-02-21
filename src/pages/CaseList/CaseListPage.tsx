import { CasesCard, StatusCard } from '@/components/Cards';
import { Header } from '@/components/Header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function CaseListPage() {
  return (
    <div className='flex flex-grow flex-col w-full py-5 gap-5'>
      <div className='flex flex-row gap-5 w-full'>
        <StatusCard />
        <StatusCard />
      </div>
      <div className='flex flex-col gap-3'>
        <Header title='Cases'>
          <Select>
            <SelectTrigger className="w-[150px] border-primary-main text-primary-main border">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CasesCard />
          <CasesCard />
          <CasesCard />
          <CasesCard />
          <CasesCard />
          <CasesCard />
          <CasesCard />
          <CasesCard />
          <CasesCard />
          <CasesCard />
        </div>
      </div>
    </div>
  )
}
