import push from './push'
import { PixelMessage } from '../typings/events'

export async function sendExtraEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageView': {
      push({
        event: 'pageViewVirtual',
        location: e.data.pageUrl,
        page: e.data.pageUrl.replace(e.origin, ''),
        referrer: e.data.referrer,
        ...(e.data.pageTitle && {
          title: e.data.pageTitle,
        }),
      })

      return
    }

    case 'vtex:userData': {
      const { data } = e

      if (!data.isAuthenticated) {
        return
      }

      push({
        event: 'userData',
        userId: data.id,
      })

      break
    }

    default: {
      break
    }
  }
}
