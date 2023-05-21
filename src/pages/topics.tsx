import { getAppLayout } from '@/components/layout/layout';
import { NextPageWithLayout } from '@/utils/types';
import React from 'react'

const topics :NextPageWithLayout= () => {
  return (
    <div>topics</div>
  )
}

export default topics;
topics.isProtected=true;
topics.getLayout = getAppLayout