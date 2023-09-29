import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import React from 'react'

interface MediaItemProps {
  onClick: (id: string) => void,
  data: Song
}

const MediaItem:React.FC<MediaItemProps> = ({
  onClick,
  data
}) => {

  const imagePath = useLoadImage(data)

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }

    // TODO: Default turn on player
  }

  return (
    <div className='
      flex
      items-center
      gap-x-3
      cursor-pointer
      hover:bg-neutral-800/50
      w-full
      p-2
      rounded-md
    '>
      <div className='
        relative
        rounded-md
        min-h-[48px]
        min-w-[48px]
        overflow-hidden
      '>
        <Image 
          fill
          src={imagePath || '../public/images/liked.png'}
          className='object-cover'
          alt='Song Image'
        />
      </div>
      <div className='
        flex
        flex-col
        gap-y-1
        overflow-hidden
      '>
        <p className='text-white truncate'>
          {data.title}
        </p>
        <p className='text-neutral-400 text-xs truncate'>
          {data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem