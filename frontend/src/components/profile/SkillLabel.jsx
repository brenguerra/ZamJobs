import React from 'react'
import { Label } from 'semantic-ui-react'

function SkillLabel({skill}) {
  const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
  ]
  return (
    <>
    <Label size='large' color={colors[Math.floor(Math.random()*colors.length)]} horizontal>
      {skill}
    </Label>
    </>
  )
}

export default SkillLabel