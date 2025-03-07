'use client';

const PhoneIcon = '/assets/icons/phoneWhite.svg';
const AdressIcon = '/assets/icons/mapPositionWhite.svg';

import './ContactUsOffice.scss';

interface Props {
  name?: string;
  adress: string;
  adress2?: string;
  phone: string;
}

const ContactUsOffice = ({ name, adress, adress2, phone }: Props) => {
  return (
    <div className="office-container">
      {name && <div className="name">{name}</div>}

      <div className="adress" style={{ backgroundImage: `url(${AdressIcon})` }}>
        {adress}
      </div>

      {adress2 && (
        <div className="adress" style={{ backgroundImage: `url(${AdressIcon})` }}>
          {adress2}
        </div>
      )}

      <div className="phone" style={{ backgroundImage: `url(${PhoneIcon})` }}>
        {phone}
      </div>
    </div>
  );
};

export default ContactUsOffice;
