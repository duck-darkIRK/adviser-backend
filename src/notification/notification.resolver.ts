import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationEntity } from '../types';
import { GqlCurrentUser } from '../decorator/GqlCurrentUser.decorator';

@Resolver()
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService) {}

    @Query(() => [NotificationEntity], { name: 'USER_getNotifications' })
    async userGetNoti(@GqlCurrentUser() owner) {
        return await this.notificationService.userGetNotification(owner.Id);
    }

    @Mutation(() => Boolean, { name: 'USER_readNotification' })
    async readNotification(@GqlCurrentUser() owner) {
        try {
            await this.notificationService.userReadNotification(owner.Id);
        } catch (error) {
            return false;
        }
        return true;
    }
}
