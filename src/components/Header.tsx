import Image from 'next/image';
import { Button } from '@mui/material';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 w-full z-40'>
      <nav className='flex justify-between items-center h-12 px-4 bg-[#651FFF]'>
        <Image className="w-[46px] h-[18px]" src="/images/logo.svg" alt="" width={46} height={18} />
        <Button
          variant="outlined"
          sx={{
            padding: '7px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            minWidth: '0',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            }
          }}
        >
          <Image className="w-4 h-4" src="/images/icon-gear.svg" alt="" width={16} height={16} />
        </Button>
      </nav>
    </header>
  );
}