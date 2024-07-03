const LoginForm = ({ handleLogin, username, password, setPassword, setUsername }) => (
  <form onSubmit={handleLogin}>
    <div>
        username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        data-testid='username'
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        data-testid='password'
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm