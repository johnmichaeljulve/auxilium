import React from 'react'
import { CustomButton } from "./index"

const Banner = ({text, searchBar}) => {
  return (
    <div className='bg-[#669999] flex h-[50px] px-5 mt-5'>
        <div className='flex my-auto w-full justify-between'>
            <p>{text}</p>
            <div className='flex gap-2'>
              {searchBar && (
                  <input type="text" />
              )}
              <CustomButton />
            </div>
        </div>
    </div>
  )
}

export default Banner
