import React, { useContext } from 'react'
import Wave from 'react-wavify'
import StartHome from '../components/StartHome'
import MidHome from '../components/MidHome'
import EndHome from '../components/EndHome'
import { UserProvider } from '../context/UserContext'

const Home = () => {
  const user = useContext(UserProvider)
  console.log(user)
  return (
    <div className='content-general col-10'>
      <div className="">
        <StartHome/>
        <MidHome/>
        <EndHome/>
      </div>
      <Wave fill='#d926a9'
        paused={false}
        options={{
          height: 80,
          amplitude: 40,
          speed: 0.15,
          points: 6
        }}
      />
    </div>
  )
}

export default Home