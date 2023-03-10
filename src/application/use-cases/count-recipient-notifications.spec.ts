import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'this-exactly-recipient',
    });

    expect(count).toEqual(2);
  });
});
