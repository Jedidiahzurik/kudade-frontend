import {useState} from 'react'
import styles from '../styles/login.module.scss'
import {useHistory} from 'react-router-dom'

const LoginPage = ({userToken}) => {

    const[userName, setUserName] = useState('');
    const[passWord, setPassWord] = useState('');
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false)

    const history = useHistory()      

    function handleLogIn(){
        console.log({userName, passWord})
        setError(false)
        setLoading(true)
        fetch(`http://localhost:8181/login`,{
            method: 'POST',
            body: JSON.stringify({
                username: userName,
                password: passWord
            }),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }).then((res) => {
            return res.json()
        }).then(data => {
            setLoading(false)
            console.log(data)
            userToken(data)
            history.push(`order/${userName}`)
        }).catch(err => {
            setError(true)
            console.error('Failed to fetch', err)
        })
    }

    return ( <div className={styles.login}>
        <div className={`${styles.form} form border rounded-1 py-4 px-3`}>
            <div className="col-12 d-flex flex-column mb-3">
                    <label htmlFor="" className="form-text w-100 text-light">Username</label>
                    <input type="text" className="form-control my-2" placeholder="Put in your Username" value={userName} onChange={(e) => {
                        setUserName(e.target.value)
                    }}/>
            </div>
            <div className="col-12 d-flex flex-column mb-3">
                    <label htmlFor="" className="form-text w-100 text-light">Password</label>
                    <input type="text" className="form-control my-2" placeholder="Put in your Password" value={passWord} onChange={(e) => {
                        setPassWord(e.target.value)
                    }}/>
            </div>
                <button type="submit" value="" onClick={handleLogIn} className='btn btn-dark text-light'>Log In</button>
                {loading && <h2>Loading</h2>}
                {error && <h2>Check username/password</h2>}

        </div>
    </div> );
}
 
export default LoginPage;