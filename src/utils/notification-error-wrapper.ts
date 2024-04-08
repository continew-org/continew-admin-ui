import { Notification, type NotificationReturn } from '@arco-design/web-vue'

let notificationInstance: NotificationReturn | null
const notificationErrorWrapper = (options: any) => {
  if (notificationInstance) {
    notificationInstance.close()
  }
  notificationInstance = Notification.error(options)
}

export default notificationErrorWrapper
