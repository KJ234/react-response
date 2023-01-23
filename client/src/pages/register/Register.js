import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import './register.css'
import image from './undraw_data_re_80ws.svg'



import { RiLoginCircleFill } from 'react-icons/ri'

function App() {

	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api-register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate('/login')
		} else {
			alert(data.error + ' !!!')
		}
	}

	return (
		<div className="register">
			<div class="container">
				<div className="cover"></div>
				<div class="forms">
					<div class="form-content">
						<div class="signup-form">
							<div class="title">Register</div>
							<form onSubmit={registerUser}>
								<div class="input-boxes">
									<div class="input-box">
										<i class="ri-passport-line"></i>
										<input
											value={name}
											onChange={(e) => setName(e.target.value)}
											type="text"
											placeholder="Name"
											className='col-25'
										/>
									</div>
									<div class="input-box">
										<i class="ri-mail-line"></i>
										<input
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											type="email"
											placeholder="Email"
											className='col-25'
											pattern=".+@covatic.com"
										/>
									</div>
									<div class="input-box">
										<i class="ri-lock-unlock-fill"></i>
										<input
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type="password"
											placeholder="Password"
											className='col-25'
										/>
									</div>
									<div class="button input-box">
										<input type="submit" value="Sumbit" />
									</div>
									<div class="text sign-up-text">Already registered?<Link to='/login'> <br /><RiLoginCircleFill id='login-icon' /></Link></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App


