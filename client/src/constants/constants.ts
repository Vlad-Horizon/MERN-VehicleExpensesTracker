// ----------------------------------------------------------------------

const protocol = {
  http: 'http',
  https: 'https',
  ws: 'ws',
}

const url = {
  localHost: '127.0.0.1:3002',
  api_1: '192.168.43.197:3002'
}

const CLEAN_API = `${protocol.http}://${url.api_1}`

// export const API = `${CLEAN_API}/api`
export const API = `${CLEAN_API}`

// ----------------------------------------------------------------------

export enum PAGE_NAMES {
  // drive
  Drive = 'test',
}

// ----------------------------------------------------------------------