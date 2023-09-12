import React from 'react'
import Table from './components/Table/Table';
import Header from '@/common/Header/header';

const Library = () => {
  return (
    <>
    <div className='flex flex-col gap-5 '>

    {/* <Header title='Library'/> */}
    <Table/>
    </div>
    </>
  )
}

export default Library;