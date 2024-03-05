'use client'

import { useState } from 'react'
import FeatureLeft from './Description/featureLeftDesc'
import FeatureRight from './Description/featureRightDesc'

export default function MenuDesc() {
  const [side, setSide] = useState('left')
  if (side == 'right') {
    return <FeatureRight setSide={setSide} />
  }
  if (side == 'left') {
    return <FeatureLeft setSide={setSide} />
  }
}
