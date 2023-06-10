import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '@/common/Header/header';
import { ChaneelCategorydata, ChaneelData } from '@/constants/channelcategories';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';
const Voice = () => {
  return (
    <div>
      <div className='mt-6 rounded-md border-2'>
        <div>
          <div className='ps-3 pt-2'>
            <Header title='Select Your Channel' />
          </div>
          <div className="table-bb-gray mt-4">
          </div>
        </div>
        <div className='flex flex-wrap justify-start mt-4 mb-4'>
          {ChaneelCategorydata?.map((item: ChaneelData) => {
            const { id, title, descrp } = item
            return (
              <div key={id} className='flex justify-between items-center pt-4 pb-4 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card'>
                <div className='flex items-center'>
                  <div>
                    <Image src="/57.png" alt='channel' width={40} height={40} />
                  </div>
                  <div className='ps-2 '>
                    <div className='pt-1 pb-1'>
                      <p className='font-bold text-sm'>
                        {title}
                      </p>
                    </div>
                    <div >
                      <p className='text-green-400 text-xs'>{descrp}</p>
                    </div>
                  </div>
                </div>
                <div className=' flex items-center'>
                  <div className='ps-1 pe-1'>
                    <Image src="/boy.png" alt='round' width={20} height={20} />
                  </div>
                  <div className='ps-1 pe-1'>  <Image src="/Round.png" alt='round' width={20} height={20} /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default Voice