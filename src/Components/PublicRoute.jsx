// Blocks logged-in users from accessing login/register pages
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
    const voter = sessionStorage.getItem('voter')

    if (voter) {
        return <Navigate to="/landingOn" replace />  // already logged in → go home
    }

    return children  // not logged in → show the page
}

export default PublicRoute