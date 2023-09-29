"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";

import { Song } from "@/types";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[]
}

const Library:React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClickHandler = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  }

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
        <AiOutlinePlus 
          onClick={onClickHandler} 
          size={16} 
          className="
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
        {
          songs.map(item => (
            <MediaItem 
              key={item.id}
              onClick={() => {}}
              data={item}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Library