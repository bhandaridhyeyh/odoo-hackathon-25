import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('rewear_token', token);
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="text-center mt-20 text-gray-700 text-lg">
      Redirecting...
    </div>
  );
};

export default OAuthRedirect;
