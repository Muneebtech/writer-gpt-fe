import Brands from '@/components/brands'
import { getAppLayout } from '@/components/layout/layout'
import { NextPageWithLayout } from '@/utils/types'
import React from 'react'

const index: NextPageWithLayout = () => {
    return (
        <div>
            <Brands />
        </div>
    )
}

export default index
index.isProtected = true
index.getLayout = getAppLayout