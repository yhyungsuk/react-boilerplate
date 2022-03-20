import { fireEvent, render } from '@testing-library/react'
import Sample from './components/Sample'

jest.mock('./components/Sample')

describe('basic', () => {
  let App
  beforeEach(() => {
    const RealSample = jest.requireActual('./components/Sample').default
    Sample.mockImplementation(() => <RealSample />)
    App = require('./App').default
  })

  it('render', () => {
    // Jest times out after 5 seconds by default.
    // Waiting for setTimeouts, setIntervals can be avoided by using fake timers provided by Jest.
    // setTimeout, setIntervals are "mocked" by Jest so useFakeTimers should be called before rendering the target code/component.
    // Use "act" to flush out any remaining changes needed to be made by the React component if needed.
    jest.useFakeTimers()

    const app = render(<App />)

    expect(app.getByAltText('logo')).toBeInTheDocument()
    expect(app.getByText('Hello Vite + React!')).toBeInTheDocument()
    expect(app.getByRole('button', { name: 'count is: 0' })).toBeInTheDocument()
    expect(app.getByText('Edit and save to test HMR updates.')).toBeInTheDocument()
    expect(app.getByText('App.jsx')).toBeInTheDocument()
    expect(app.getByRole('link', { name: 'Learn React' })).toBeInTheDocument()
    expect(app.getByRole('link', { name: 'Vite Docs' })).toBeInTheDocument()
    const sampleBoldText = app.getByText('/___service_backend___')
    expect(sampleBoldText).toBeInTheDocument()
    const sampleContainerClassList = sampleBoldText.parentNode.parentNode.classList
    expect(sampleContainerClassList.contains('show')).toBe(true)
    jest.advanceTimersByTime(5000)
    expect(sampleContainerClassList.contains('show')).toBe(false)
  })

  it('click counter', () => {
    const app = render(<App />)

    fireEvent.click(app.getByRole('button'))

    expect(app.getByText('count is: 1')).toBeInTheDocument()
  })
})

describe('substituting react component using jest.mock', () => {
  it('should render app with plain DOM', () => {
    Sample.mockImplementation(() => <div data-testid="sample">Some Sample</div>)
    const App = require('./App').default

    const app = render(<App />)

    expect(app.getByTestId('sample')).toBeInTheDocument()
    expect(app.getByText('Some Sample')).toBeInTheDocument()
  })

  it('should render app with with sample component', () => {
    const RealSample = jest.requireActual('./components/Sample').default
    Sample.mockImplementation(() => (
      <div data-testid="sample2">
        <RealSample />
      </div>
    ))
    const App = require('./App').default

    const app = render(<App />)

    expect(app.getByTestId('sample2')).toBeInTheDocument()
    expect(app.getByText(/Backend running on/)).toBeInTheDocument()
  })
})

xdescribe('substituting react component without using jest.mock', () => {
  // the following tests should be executed after removing line 4 `jest.mock('./components/Sample')`
  // this suite does not pass when both tests are executed at the same time
  // reason: could not find a way to restore mock before each test
  // related issue: https://github.com/facebook/jest/issues/2649
  it('should render app with plain DOM', () => {
    // jest.mock gets hoisted, therefore using require instead of import is key
    // use doMock before render occurs
    jest.doMock('./components/Sample', () => () => <div data-testid="sample">Some Sample</div>)
    const { default: App } = require('./App')

    const app = render(<App />)

    expect(app.getByText('Some Sample')).toBeInTheDocument()
    expect(app.getByTestId('sample')).toBeInTheDocument()
  })

  it('should render app with with sample component', () => {
    const RealSample = jest.requireActual('./components/Sample').default
    jest.doMock('./components/Sample', () => () => (
      <div data-testid="sample2">
        <RealSample />
      </div>
    ))
    const App = require('./App').default

    const app = render(<App />)

    expect(app.getByText(/Backend running on/)).toBeInTheDocument()
    expect(app.getByTestId('sample2')).toBeInTheDocument()
  })
})
