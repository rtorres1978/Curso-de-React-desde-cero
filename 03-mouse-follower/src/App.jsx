import { useEffect, useState } from "react"

const FolloMause = () => {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})
  useEffect(() => {
   const handleMove = (e) => {
   const {clientX, clientY} = e
   console.log('handleMove', {clientX, clientY})
   setPosition({x: clientX, y:clientY})
   }
   if(enable){
     window.addEventListener('pointermove', handleMove)
   }

   // Limpiar la inscripcion anterior
   return () => {
    window.removeEventListener('pointermove', handleMove)
   }

  },[enable])
  return (
    <>
      <div style={{ 
     position: 'absolute',
     backgroundColor: '#09f',
     borderRadius: '50%',
     opacity: 0.8,
     pointerEvents: 'none',
     left: -20,
     top: -20,
     width: 40,
     height: 40,
     transform: `translate(${position.x}px, ${position.y}px)`
      }}

     />
     <button onClick={() => setEnable(!enable)}>{enable ? 'Desactivar ': 'Activar'} Nuestro Puntero</button>
    </>
  )
}

function App() {
const [mounted, setMouted] = useState(true)
  return (
    <main>
   {mounted && <FolloMause/>}
   <button onClick={() => setMouted(!mounted)}>Touggend Mounted </button>
    </main>
  )
}

export default App
