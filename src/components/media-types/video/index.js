import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'

export const VideoComponent = ({ src, interactive, inView }) => {
  const domElement = useRef()

  useEffect(() => {
    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    let promise
    if (inView) {
      promise = domElement.current.play()
    } else {
      if (promise !== undefined) {
        promise
          .then(() => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            domElement.current.pause()
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
          })
      }
    }
  }, [inView])

  return (
    <div className={styles.container}>
      <video
        ref={domElement}
        className={styles.video}
        autoPlay={interactive}
        muted
        loop
        controls={interactive}
        src={src}
      />
    </div>
  )
}
