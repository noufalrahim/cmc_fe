import { SecondaryButton } from '@/components/Button'
import { ActiveCaseCard, CasesCard } from '@/components/Cards'
import { Header } from '@/components/Header'
import { BellIcon, PlusIcon } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex-grow flex flex-col gap-5">
      <div className="flex flex-col w-full gap-3">
        <Header title="Active Case">
          <BellIcon />
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActiveCaseCard />
          <ActiveCaseCard />
          <ActiveCaseCard />
          <ActiveCaseCard />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Header title="Recent Cases">
          <SecondaryButton label="Add Case" startIcon={<PlusIcon />} />
        </Header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
