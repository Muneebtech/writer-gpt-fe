import { getAppLayout } from '@/components/layout/layout';
import { NextPageWithLayout } from '@/utils/types';
import React from 'react'

const chatGPT:NextPageWithLayout = () => {
  return (
    <div>chatGPT</div>
  )
}

export default chatGPT;
chatGPT.isProtected=true;
chatGPT.getLayout = getAppLayout