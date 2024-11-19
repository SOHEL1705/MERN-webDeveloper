import { useNavigate } from 'react-router-dom';
import './Error404.css';

export const Error404 = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="error-page">
            <div className="error-content">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>We can&apos;t find the page you&apos;re looking for. It might have been removed, changed, or is temporarily unavailable.</p>
                <button onClick={goHome} className="home-button">Go Home</button>
            </div>
            {/* <div className="error-image">
                <img src="https://via.placeholder.com/300x200" alt="404 Illustration" />
            </div> */}
        </div>
    );
};

