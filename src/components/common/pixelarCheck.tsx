import PixelarCheckSvg from 'assets/icons/pixelarCheck.svg';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const pixelarCheckStyles = cva('pt-12', {
  variants: {
    className: {
      true: '',
      false: '',
    },
  },
});

const PixelarCheck = ({ className = '' }) => {
  return (
    <div className={cn(pixelarCheckStyles({ className: !!className }), className)}>
      <img alt="check-icon" className="mx-auto block" src={PixelarCheckSvg} />
    </div>
  );
};

export default PixelarCheck;
