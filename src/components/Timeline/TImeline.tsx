import { TimelineEntry } from "@/pages/Surgeon/AddPatient/types";
import { formatDateTime } from "@/utils/FormatDateTime";
import { TbCircleCheckFilled } from "react-icons/tb";

export default function TImeline({
    timelines
}: {
    timelines: TimelineEntry[]
}) {

    return (
        <div className="bg-white w-full flex flex-col p-5 rounded-lg gap-3 border-light-100 border-2 bg-white">
            <ol className="relative border-s border-light-100">
                {
                    timelines.map((timeline, index) => {
                        return (
                            <li key={index} className="mb-10 ms-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white">
                                    <TbCircleCheckFilled className='text-primary-main' size={24} />
                                </span>
                                <div className="flex flex-col items-left justify-center gap-2">
                                    <h3 className="flex items-center text-lg font-semibold ">{timeline.action}</h3>
                                    <time className="block text-sm font-normal leading-none text-light-200">{formatDateTime(timeline.timestamp)}</time>
                                    <p className="text-base font-normal">{timeline.details}</p>
                                    <p className="text-base font-normal  text-light-200">By {timeline.by.name}</p>
                                </div>
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    )
}
