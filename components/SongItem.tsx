import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import React from 'react'
import PlayButton from './PlayButton'

interface SongItemProps {
  data: Song,
  onClick: (id: string) => void
}

const SongItem:React.FC<SongItemProps> = ({
  data, 
  onClick
}) => {

  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className='
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/10
        cursor-pointer
        hover:bg-neutral-400/20
        transition
        p-2
      '
    >
      <div className='
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
      '>
        <Image 
          className='object-cover'
          fill
          src={imagePath || '/public/images/liked.png'}
          alt='Song Cover Image'
        />
      </div>
      <div className='
        flex
        flex-col
        items-start
        w-full
        pt-2
        gap-y-1
      '>
        <p className='font-semibold pb-0 truncate w-full'>
          {data.title}
        </p>
        <p className='
          text-neutral-400
          text-xs
          w-full
          truncate
        '>
          By : {data.author}
        </p>
      </div>
      <div className='absolute bottom-10 right-2'>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem