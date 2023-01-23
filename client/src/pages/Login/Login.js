import { useState, } from 'react'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'

import { Link, useNavigate } from 'react-router-dom'


function Login() {

	const Navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {

		event.preventDefault()

		const response = await fetch('https://devops-dashboard-service.covatic.io/api-login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			})
		})

		const data = await response.json()

		if (data.user) {
			sessionStorage.setItem('token', data.user)
			console.log('successfull login')
			Navigate('/chartHomepage')
		} else {
			alert('invalid login')
		}
	}

	const token = sessionStorage.getItem("token");
	if (token) {
		sessionStorage.removeItem('token', token);
	}

	return (
		<div className='login'>
			<div class="container">
				<div className="cover"></div>
				<div class="forms">
					<div class="form-content">
						<div class="login-form">
							<div class="title">Login</div>
							<form  onSubmit={loginUser}>
								<div class="input-boxes">
									<div class="input-box">
									<i class="ri-mail-line"></i>
										<input
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											type="email"
											placeholder="Email"
										/>
									</div>
									<div class="input-box">
									<i class="ri-lock-unlock-fill"></i>
										<input
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type="password"
											placeholder="Password"
										/>
									</div>

									<div class="button input-box">
										<input type="submit" value="Sumbit" />
									</div>
									<div class="text sign-up-text">Don't have an account?<Link to='/'> <label for="flip">Sigup now</label></Link></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}


export default Login
