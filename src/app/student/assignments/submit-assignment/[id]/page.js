import StudentAssignmentView from '@/component/assignment/StudentAssignmentView'
import React from 'react'

const page = ({params}) => {
  return (
    <div>
    
      <StudentAssignmentView 
      assignmentid={params.id}
     />
    </div>
  )
}

export default page
