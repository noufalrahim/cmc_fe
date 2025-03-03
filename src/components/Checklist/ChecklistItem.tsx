import { Circle } from "lucide-react";
import { TbCircleCheckFilled } from "react-icons/tb";
import { PrimaryButton } from "../Button";

export default function ChecklistItem(
  {
    item,
    loading,
  }: {
    item: {
      label: string,
      isCompleted: boolean,
      onClick: () => void,
      showButton: boolean,
    },
    loading: boolean
  }
) {

  return (
    <div className='bg-primary-light w-full p-5 border border-primary-main rounded-lg flex items-center justify-center flex-col gap-5'>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-row gap-2 items-center justify-center'>
          {
            item.isCompleted ? (
              <TbCircleCheckFilled className='text-primary-main' size={24} />
            ) : (<Circle />)
          }
          <p className='text-lg'>{item.label}</p>
        </div>
        <p className='text-md text-light-200'>5:23 AM</p>
      </div>
      {
        item.showButton && <PrimaryButton label="Mark as completed" onClick={item.onClick} loading={loading}/>
      }
    </div>
  )
}
