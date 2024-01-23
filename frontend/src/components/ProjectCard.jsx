import React from 'react'

const ProjectCard = ({title, description, image, target, deadline, handleClick}) => {
  return (
    <div onClick={handleClick} className="cursor-pointer w-[200px] h-[250px] bg-white rounded-md text-black">
      details
    </div>
  )
}

export default ProjectCard
