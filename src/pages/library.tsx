import { getAppLayout } from '@/components/layout/layout';
import { NextPageWithLayout } from '@/utils/types';
import React from 'react'

const library:NextPageWithLayout = () => {
  return (
    <div>library</div>
  )
}

export default library;
library.isProtected=true;
library.getLayout = getAppLayout