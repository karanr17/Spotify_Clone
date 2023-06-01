"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  return (
    <div className='flex flex-col'>
      <div className='
        flex
        items-center
        justify-between
        px-5
        pt-4        
      '>
        <div className='
          inline-flex
          items-center
          gap-x-2
        '>
          <TbPlaylist className="text-neutral-400" size={26}/>
          <p className="
            text-neutral-400
            font-medium
            text-md
          ">
            Your Playlist!
          </p>
        </div>
        <AiOutlinePlus size={16} className="
          cursor-pointer
          text-neutral-400
          transition
          hover:text-white
        "/>
      </div>
      <div className="
        flex
        flex-col
        gap-y-2
        mt-4
        px-3
      ">
        List of Songs !
      </div>
    </div>
  )
}

export default Library