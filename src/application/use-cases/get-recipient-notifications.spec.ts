import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'this-exactly-recipient' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'this-exactly-recipient' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'this-exactly-recipient',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'this-exactly-recipient' }),
        expect.objectContaining({ recipientId: 'this-exactly-recipient' }),
      ]),
    );
  });
});
