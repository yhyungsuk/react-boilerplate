import { FC, useEffect, useRef } from 'react'
import './Sample.css'
import { BACKEND_BASEURL, RUNNING_MODE } from '../config'

const Sample: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.classList?.add('show')
    containerRef.current?.classList?.remove('hide')
    setTimeout(() => {
      containerRef.current?.classList?.remove('show')
      containerRef.current?.classList?.add('hide')
    }, 5000)
  }, [])

  return (
    <div ref={containerRef} id="sample">
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
