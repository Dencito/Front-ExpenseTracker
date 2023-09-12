import Wave from 'react-wavify'
import StartHome from '../components/StartHome'
import MidHome from '../components/MidHome'
import EndHome from '../components/EndHome'

const Home = () => {
  return (
    <>
    <div className='content-general col-12 col-xl-10 mx-auto'>
      <div>
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
    </>
  )
}

export default Home