import logo from './logo.svg'
import './App.css'

import * as Rox from 'rox-browser'

import {
  useCallback,
  useEffect,
  useState,
} from "react"

const envId = '612f5d0a30c0b442ab612c3c'

// Create a Roxflag in the flags container class
const flags = {
  enableTutorial: new Rox.Flag(),
  titleColors: new Rox.RoxString('White', ['White', 'Blue', 'Green', 'Yellow']),
  titleSize: new Rox.RoxNumber(12, [12, 14, 18, 24])
}

function App() {

  const [values, setValues] = useState({})

  const roxSetup = useCallback(async () => {
    try {
      console.log("Initializing SDK")
      Rox.register(flags)
      await Rox.setup(envId, {
        configurationFetchedHandler: (fetcherResult: RoxFetcherResult) => {
          if(fetcherResult.hasChanges) {
            console.log('Received new flag values.')
            // setState({featureFlags: { ...FeatureFlags }})
            setValues({
              enableTutorial: flags.enableTutorial.getValue(),
              titleColors: flags.titleColors.getValue(),
              titleSize: flags.titleSize.getValue(),
            })
          }
        },
      })
      setValues({
              enableTutorial: flags.enableTutorial.getValue(),
              titleColors: flags.titleColors.getValue(),
              titleSize: flags.titleSize.getValue(),
            })
      console.log("Rox was initialized")

    } catch (err) {
      console.error("Rox initialization failed", err)
    }
  }, [])


  useEffect(() => {
    roxSetup()
  }, [roxSetup])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <p>enableTutorial: {values.enableTutorial}</p>
          <p>titleColors: {values.titleColors}</p>
          <p>titleSize: {values.titleSize}</p>
        </div>
      </header>
    </div>
  )
}

export default App
