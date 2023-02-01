import {useMemo, useState} from 'react'
import './App.css'

const easy = /^[a-zA-Z]|[?=.*\d]|[!@#\$%\^\&*\)\(+=._-]+$/
const medium = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]|(?=.*[A-Za-z])(?=.*[@$!%*#?&\)\(+=._-])[A-Za-z@$!%*#?&\)\(+=._-]|(?=.*\d)(?=.*[@$!%*#?&\)\(+=._-])[\d@$!%*#?&\)\(+=._-]+$/
const strong = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\)\(+=._-])[A-Za-z\d@$!%*#?&\)\(+=._-]+$/

function App() {
    const [password, setPassword] = useState('')

    const strength = useMemo(() => {
        if (password.length > 0 && password.length < 8) {
            return 'weak'
        } else if (password.length >= 8) {
            if (strong.test(password)) {
                return 'strong'
            } else if (medium.test(password)) {
                return 'medium'
            } else if (easy.test(password)) {
                return 'easy'
            }
        } else {
            return ''
        }
    }, [password])
    
  return (
    <div className="app">
        <h1 className="caption">Password strength check</h1>
        <input type="password"
               className="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}/>
        <div className="wrapper">
            <div className="underline" strength={strength}></div>
            <div className="underline" strength={strength !== 'easy' ? strength : null}></div>
            <div className="underline"
                 strength={strength === 'weak' ? strength : strength === 'strong' ? strength : null}></div>
        </div>
    </div>
  )
}

export default App
