import { Input } from '../ui/input'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InputComponent(props: any) {
    return (
        <Input type="text" placeholder="Username" className='px-5 min-h-14 border-primary-main border w-full'{...props}/>
    )
}
