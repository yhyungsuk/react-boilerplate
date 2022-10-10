import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Sample from '../components/Sample'
import { userEvent } from '@storybook/testing-library'

export default {
  title: 'Sample/Toast',
  component: Sample,
  argTypes: {
    durationSeconds: { control: 'number' },
  },
} as ComponentMeta<typeof Sample>

const Template: ComponentStory<typeof Sample> = (args) => <Sample {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Alternative = Template.bind({})
Alternative.args = {
  backgroundColor: '#01084a',
}

export const Actionable = Template.bind({})
Actionable.args = {
  onClick: () => alert('clicked!'),
}
Actionable.play = async ({ canvasElement }) => {
  await userEvent.click(canvasElement)
}
