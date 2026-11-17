import tracer from 'dd-trace'

tracer.init({
  service: `web`,
  appsec: process.env.DD_APPSEC_ENABLED === 'true',
  plugins: false,
  version: __APP_VERSION__,
  tags: {
    serverId: process.env.SERVER_ID
  },
  // Disable startup logs to prevent "Could not store tracer configuration" warnings in containerized environments
  startupLogs: process.env.DD_TRACE_STARTUP_LOGS === 'true'
})
tracer
  .use('ioredis')
  .use('http', {
    blocklist: ['/health', '/ready']
  })
  .use('pg')
