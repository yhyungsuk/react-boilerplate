import { spawnSync } from 'child_process'

export const execute = (key, cmd, ...args) => {
  spawnSync(cmd, args, {
    detached: false,
    stdio: 'inherit',
  })
}

export const getExecutablePromise =
  (key, cmd = [], options = []) =>
  () =>
    new Promise((resolve, reject) => {
      if (!Array.isArray(cmd)) {
        reject('Command list is not an array.')
        return
      }

      if (cmd.length > 0) {
        execute(key, ...cmd, ...options)
      }
      resolve(key)
    })

export const runSyncPromises = async (promises) => {
  for await (const promise of promises) {
    promise()
  }
}
