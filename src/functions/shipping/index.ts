import schema from './schema';

export default {
  handler: 'src/functions/shipping/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'shipping/{country}',
        request: {
          parameters: {
            paths: {
              country: true
            }
          },
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
