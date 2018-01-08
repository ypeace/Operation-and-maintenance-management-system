import React from 'react'

export default function MapView ({ data, actions }) {
  const { id } = data;
  return (
    <div style={{ width: '100%', height: '100%' }} id={id}/>
  )
}
