import { IconUserEdit } from '@tabler/icons-react';
import { IconUserCheck } from '@tabler/icons-react';
import { IconUserExclamation } from '@tabler/icons-react';
import { IconUserQuestion } from '@tabler/icons-react';
import DataTable from "./dataTable";

export default function Leave() {
  return (
    <>
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card flex flex-cols-1 
                              gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 my-5">
    <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden w-80">
      <div className="absolute left-0 top-0 h-full w-24 bg-green-600 flex items-center justify-center"
        style={{
          clipPath: "polygon(0 0, 60% 0, 100%  100%, 100%  160%, 0 150%)",
        }}
      >
        <IconUserCheck className="text-white w-6 h-6" />
      </div>
      <div className="ml-28">
        <p className="text-gray-500 text-sm">Total Present</p>
        <p className="text-xl font-bold text-gray-800">
          180<span className="text-gray-400">/200</span>
        </p>
      </div>
    </div>  

     <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden w-80">
      <div
        className="absolute left-0 top-0 h-full w-24 bg-pink-600 flex items-center justify-center"
        style={{
          clipPath: "polygon(0 0, 60% 0, 100%  100%, 100%  160%, 0 150%)",
        }}
      >
        <IconUserEdit className="text-white w-6 h-6" />
      </div>
      <div className="ml-28">
        <p className="text-gray-500 text-sm">Planned leaves</p>
        <p className="text-xl font-bold text-gray-800">
          10
        </p>
      </div>
    </div>

     <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden w-80">
      <div
        className="absolute left-0 top-0 h-full w-24 bg-yellow-600 flex items-center justify-center"
        style={{
          clipPath: "polygon(0 0, 60% 0, 100%  100%, 100%  160%, 0 150%)",
        }}
      >
        <IconUserExclamation className="text-white w-6 h-6" />
      </div>
      <div className="ml-28">
        <p className="text-gray-500 text-sm">Unplanned leaves</p>
        <p className="text-xl font-bold text-gray-800">
          10
        </p>
      </div>
    </div>
     <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden w-80">
      <div
        className="absolute left-0 top-0 h-full w-24 bg-blue-600 flex items-center justify-center"
        style={{
          clipPath: "polygon(0 0, 60% 0, 100%  100%, 100%  160%, 0 150%)",
        }}
      >
        <IconUserQuestion className="text-white w-6 h-6" />
      </div>
      <div className="ml-28">
        <p className="text-gray-500 text-sm">Pending request</p>
        <p className="text-xl font-bold text-gray-800">
          15
        </p>
      </div>
      </div>   
      </div>
      <div><DataTable/></div>
      </>
  )
}

