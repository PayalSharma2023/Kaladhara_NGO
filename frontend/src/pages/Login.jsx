const { useState } = require("react")
const {useLogin} = require('../hooks/useLogin')

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-96 m-auto bg-blue-50 p-10 h-auto border border-gray-300 border-r-2">
            <h3 className="font-semibold text-lg text-center mb-16 bg-gray-800 text-white rounded  pt-2 pb-2">Login</h3>

            <label className="ml-1 font-medium">Email</label>
            <input
            type="email"
            className="p-2 rounded m-1 mb-6"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />

            <label  className="ml-1 font-medium">Password</label>
            <input
            type="password"
             className="p-2 rounded m-1 mb-6"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

            <button disabled={isLoading} className="bg-green-300 text-green-900 border border-green-400 font-medium m-auto mt-16 w-2/5  p-2 rounded">Login</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Login;