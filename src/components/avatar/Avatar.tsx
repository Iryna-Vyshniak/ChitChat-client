import { IonAvatar, IonImg } from '@ionic/react';

import AvatarDefault from '../../assets/content/avatar-default.png';
import './Avatar.css';

interface AvatarProps {
  avatar: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, isLarge, hasBorder }) => {
  const containerClass = `
    avatar-container
    ${hasBorder ? 'avatar-border' : ''}
    ${isLarge ? 'avatar-large' : 'avatar-small'}
  `;

  return (
    <IonAvatar className={containerClass}>
      <IonImg
        alt='Avatar'
        src={avatar || AvatarDefault}
        className='avatar-image'
      />
    </IonAvatar>
  );
};

export default Avatar;
