import { FC, useEffect, useRef } from 'react'
import { BACKEND_BASEURL, RUNNING_MODE } from '../config'
import './Sample.scss'

type SampleProps = {
  durationSeconds?: number
  backgroundColor?: string
  onClick?: () => void
}

const Sample: FC<SampleProps> = ({ durationSeconds = 5, backgroundColor, onClick }: SampleProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.classList?.add('show')
    containerRef.current?.classList?.remove('hide')
    setTimeout(() => {
      containerRef.current?.classList?.remove('show')
      containerRef.current?.classList?.add('hide')
    }, durationSeconds * 1000)
  }, [])

  return (
    <div ref={containerRef} id="sample" style={{ backgroundColor }} onClick={onClick}>
      <div>
        Backend running on: <strong>{BACKEND_BASEURL}</strong>
      </div>
      <div>
        Mode: <strong>{RUNNING_MODE}</strong>
      </div>
    </div>
  )
}

export default Sample
