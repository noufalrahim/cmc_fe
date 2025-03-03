import { StatusValues } from '@/pages/Surgeon/AddPatient/types'
import ChecklistItem from './ChecklistItem'
import { ChecklistItemGenerator } from '@/utils/ChecklistItemGenerator'

export default function Checklist({
  status,
  role,
  actions,
  loading
}: {
  status: StatusValues
  role: 'anesthesia' | 'surgeon',
  actions: {
    anesthesiaSignInOnClick: () => void,
    anesthesiaSignOutOnClick: () => void,
    surgerySignInOnclick: () => void,
    surgerySignOutOnClick: () => void,
    recoverySignOutOnClick: () => void,
    shiftedToWardOnClick: () => void,
  },
  loading: boolean
}) {

  const checklistItemsArray = ChecklistItemGenerator(status, actions, role)

  return (
    <div className='gap-2 flex flex-col'>
      {checklistItemsArray.map((item, index) => (
        <ChecklistItem item={item} key={index} loading={loading}/>
      ))}
    </div>
  )
}
