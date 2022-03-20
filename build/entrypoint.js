const inquirer = require('inquirer')
const { getExecutablePromise, runSyncPromises } = require('./runner')

inquirer
  .prompt([
    {
      type: 'list',
      name: 'task',
      message: '\n[SELECT TASK]\n',
      choices: [
        {
          name: 'Test',
          value: 'test',
        },
        {
          name: 'Local Build',
          value: 'local',
        },
        {
          name: 'Stage Build',
          value: 'stage',
        },
        {
          name: 'Production Build',
          value: 'production',
        },
        {
          name: 'Prepare Commit',
          value: 'prepare',
        },
      ],
    },
  ])
  .then(async ({ task }) => {
    const commands = []

    switch (task) {
      case 'test':
        {
          const { options } = await inquirer.prompt([
            {
              type: 'checkbox',
              name: 'options',
              message: '\n[SELECT TEST OPTIONS]\n',
              choices: [
                { name: 'Watch', value: '--watchAll' },
                { name: 'Print Coverage', value: '--coverage' },
              ],
            },
          ])
          commands.push(getExecutablePromise(task, ['yarn', 'test'], options))
        }
        break
      case 'local':
        {
          commands.push(getExecutablePromise(task, ['yarn', 'dev']))
        }
        break
      case 'stage':
        {
          commands.push(getExecutablePromise(task, ['yarn', 'build'], ['--mode', 'stage']))
          const { subtask } = await inquirer.prompt([
            {
              type: 'list',
              name: 'subtask',
              message: '\n[SELECT PREVIEW OPTION]\n',
              choices: [
                {
                  name: 'Preview',
                  value: 'preview',
                },
                {
                  name: 'None',
                  value: 'no-preview',
                },
              ],
            },
          ])
          if (subtask === 'preview') {
            commands.push(getExecutablePromise(subtask, ['yarn', 'serve']))
          }
        }
        break
      case 'production':
        {
          commands.push(getExecutablePromise(task, ['yarn', 'build']))
          const { subtask } = await inquirer.prompt([
            {
              type: 'list',
              name: 'subtask',
              message: '\n[SELECT PREVIEW OPTION]\n',
              choices: [
                {
                  name: 'Preview',
                  value: 'preview',
                },
                {
                  name: 'None',
                  value: 'no-preview',
                },
              ],
            },
          ])
          if (subtask === 'preview') {
            commands.push(getExecutablePromise(subtask, ['yarn', 'serve']))
          }
        }
        break
      case 'prepare':
        {
          commands.push(getExecutablePromise(task, ['yarn', 'lint']))
          commands.push(getExecutablePromise(task, ['yarn', 'test'], ['--coverage']))
        }
        break
      default:
        break
    }

    await runSyncPromises(commands)
  })
