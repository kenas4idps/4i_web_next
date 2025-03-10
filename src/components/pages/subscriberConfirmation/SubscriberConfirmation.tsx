'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { NotificationContext } from '@/providers/notificationProvider/NotificationProvider';

import Notice from '@/components/layout/notice/Notice';
import { api } from '@/api';

const SubscriberConfirmation = ({ id }: { id: string }) => {
  const router = useRouter();
  const t = useTranslations('confirmation');
  const { displayNotification } = useContext(NotificationContext);

  const [statusText, setStatusText] = useState<string>('Loading...');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const updateConfirmationStatus = async () => {
    try {
      const response = await api.newsletterSubscriber.collection.getSubscriberinfo(
        '',
        '',
        Number(id),
      );

      if ('content' in response) {
        const subscriberInfo = response.content;

        if (!subscriberInfo?.data?.attributes?.confirmed) {
          const updateResponse =
            await api.newsletterSubscriber.collection.updateSubscriberConfimationStatus(
              Number(id),
              true,
            );

          if ('content' in updateResponse) {
            const confirmationStatus = updateResponse.content;

            if (confirmationStatus.status === 200) {
              setStatusText(`${t('statusSuccess')}`);
              setIsSuccess(true);

              setTimeout(() => {
                router.push('/');
              }, 5000);
            } else {
              setStatusText(`${t('statusFail')}`);
            }
          }
        } else {
          setStatusText(`${t('statusSuccess')}`);
          setIsSuccess(true);

          setTimeout(() => {
            router.push('/');
          }, 5000);
        }
      }
    } catch (error) {
      console.log('Error:', error);
      displayNotification('Something Went Wrong Fetching Clients, Please Try Again !', 'error');
    }
  };

  useEffect(() => {
    updateConfirmationStatus();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Notice
      tag={isSuccess ? t('tag') : ''}
      title={statusText}
      subtitle={isSuccess ? t('subtitle') : ''}
      success={isSuccess}
    />
  );
};

export default SubscriberConfirmation;
