import { useState } from 'react'
import FeatureLeft from './featureLeftDesc'
import FeatureRight from './featureRightDesc'

export default function MenuDesc() {
  const [side, setSide] = useState('left')
  if (side == 'right') {
    return <FeatureRight setSide={setSide} />
  }
  if (side == 'left') {
    return <FeatureLeft setSide={setSide} />
  }
}
