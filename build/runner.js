const { spawnSync } = require('child_process')

const execute = (key, cmd, ...args) => {
  spawnSync(cmd, args, {
    detached: false,
    stdio: 'inherit',
  })
}

const getExecutablePromise =
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

const runSyncPromises = async (promises) => {
  for await (const promise of promises) {
    promise()
  }
}

module.exports = {
  execute,
  getExecutablePromise,
  runSyncPromises,
}
