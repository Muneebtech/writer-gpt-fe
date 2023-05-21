import { getAppLayout } from '@/components/layout/layout';
import { NextPageWithLayout } from '@/utils/types';
import React from 'react'

const create:NextPageWithLayout = () => {
  return (
    <div>create</div>
  )
}

export default create;
create.isProtected=true;
create.getLayout = getAppLayout