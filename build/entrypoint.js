import inquirer from 'inquirer'
import { getExecutablePromise, runSyncPromises } from './runner.js'

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
          name: '[Build] Local',
          value: 'local',
        },
        {
          name: '[Build] Stage',
          value: 'stage',
        },
        {
          name: '[Build] Production',
          value: 'production',
        },
        {
          name: '[Storybook] Local',
          value: 'storybook-local',
        },
        {
          name: '[Storybook] Build',
          value: 'storybook-build',
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
          commands.push(getExecutablePromise(task, ['test', ...options]))
        }
        break
      case 'local':
        {
          commands.push(getExecutablePromise(task, ['dev']))
        }
        break
      case 'stage':
        {
          commands.push(getExecutablePromise(task, ['build', '--mode', 'stage']))
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
            commands.push(getExecutablePromise(subtask, ['serve']))
          }
        }
        break
      case 'production':
        {
          commands.push(getExecutablePromise(task, ['build']))
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
            commands.push(getExecutablePromise(subtask, ['serve']))
          }
        }
        break
      case 'storybook-local':
        {
          commands.push(getExecutablePromise(task, ['storybook']))
        }
        break
      case 'storybook-build':
        {
          commands.push(getExecutablePromise(task, ['build-storybook']))
        }
        break
      case 'prepare':
        {
          commands.push(getExecutablePromise(task, ['lint']))
          commands.push(getExecutablePromise(task, ['test', '--coverage']))
        }
        break
      default:
        break
    }

    await runSyncPromises(commands)
  })
