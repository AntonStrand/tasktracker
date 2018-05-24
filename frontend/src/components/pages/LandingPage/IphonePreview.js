import React from 'react'

import styled from 'styled-components'
import IphonePreviewUrl from './iphone-preview.png'

const IphonePreviewImg = styled.img`
  grid-column: 8/13;
  grid-row: 1/7;
  width: 100%;
  margin: auto;
  max-width: 288px;
  @media (max-width: 700px) {
    display: none;
  }
`

const IphonePreview = () => (
  <IphonePreviewImg
    src={IphonePreviewUrl}
    alt='A preview of TaskTracker on an iPhone'
  />
)

export default IphonePreview
