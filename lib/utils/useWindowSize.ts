import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.outerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

export default useWindowSize

/**
 * HOW TO USE EXAMPLE
 * function ShowWindowDimensions(props) {
      const [width, height] = useWindowSize();
      return <span>Window size: {width} x {height}</span>;
   }
 */
