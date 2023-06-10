import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '@/common/Header/header';
import { ReviewData, ReviewDataTypes } from '@/constants/ReviewConstant';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';
const Review = () => {
  return (
    <div>
      <div className='height-box mt-6 rounded-md border-2'>
        <div>
          <div className='ps-3 pt-2'>
            <Header title='Select Your Channel' />
          </div>
          <div className="table-bb-gray mt-4">
          </div>
          <div className='flex items-center'>
            <div className='pt-5'>
              <div className=''>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Video/Script Name :</p>
                </div>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Thumbnail :</p>
                </div>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Channel :</p>
                </div>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Category :</p>
                </div>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Topic :</p>
                </div>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Language modal :</p>
                </div>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Outros :</p>
                </div>
                <div className=''>
                  <p className='ps-3 pe-6 text-md font-bold pt-1 pb-1'>Voice :</p>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              {ReviewData?.map((items: ReviewDataTypes) => {
                return (
                  <div key={items?.id} className=''>
                    <div className=' pt-1 pb-1'>
                      <p>{items?.VideoScriptName}</p>
                    </div>
                    <div className=' pt-1 pb-1'>
                      <Image src="/ground.png" alt="ground" width={45} height={45}
                      />
                    </div>
                    <div className=' pt-1 pb-1'>
                      <p>{items?.Channel}</p>
                    </div>
                    <div className='pt-1 pb-1'>
                      <p>{items?.Category}</p>
                    </div>
                    <div className='pt-1 pb-1'>
                      <p>{items?.Topic}</p>
                    </div>
                    <div className='pt-1 pb-1'>
                      <p>{items?.Languagemodal}</p>
                    </div>
                    <div className='pt-1 pb-1'>
                      <p>{items?.Outros}</p>
                    </div>
                    <div className='pt-1 pb-1'>
                      <p>{items?.Voice}</p>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Review