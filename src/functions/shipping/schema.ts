export default {
  type: 'object',
  properties: {
    dates: {
      type: 'array',
      items: {type: 'string'}
    }
  },
  required: ['dates']
} as const;
