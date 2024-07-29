import { IonButton, IonRow } from '@ionic/react';
import React from 'react';

import './Sort.css';

import { useGetAllTags } from '../../../shared/hooks/post/useGetAllTags';
import { colors } from '../../../shared/constants';
import SortSkeleton from './SortSkeleton';

const Sort: React.FC<{ onTagClick?: (tag: string) => void }> = ({ onTagClick }) => {
  const { tags, isTagLoading } = useGetAllTags();

  return (
    <IonRow className='sorts'>
      <div className='sorts-container'>
        <IonButton
          size='small'
          expand='block'
          className='custom-button'
          onClick={() => onTagClick!('')}
        >
          POSTS
        </IonButton>
        {isTagLoading && <SortSkeleton />}
        {!isTagLoading &&
          tags.map((tag, idx) => (
            <IonButton
              key={tag}
              size='small'
              expand='block'
              color={colors[idx % colors.length]}
              onClick={() => onTagClick!(tag)}
            >
              #{tag.replace(/([A-Z])/g, '_$1').toLowerCase()}
            </IonButton>
          ))}
      </div>
    </IonRow>
  );
};

export default Sort;
