import Image from 'next/image';
const PixelarCheckSvg = '/assets/icons/pixelarCheck.svg';

const PixelarCheck = () => {
  return (
    <Image
      width={64}
      height={64}
      alt="check-icon"
      className="mx-auto block"
      src={PixelarCheckSvg}
    />
  );
};

export default PixelarCheck;
