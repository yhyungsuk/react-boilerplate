import { spawnSync } from 'child_process'

export const execute = (args) =>
  spawnSync('yarn', args, {
    stdio: 'inherit',
  })

export const getExecutablePromise =
  (key, args = []) =>
  () =>
    new Promise((resolve) => {
      execute(args)
      resolve(key)
    })

export const runSyncPromises = async (promises) => {
  for await (const promise of promises) {
    promise()
  }
}
