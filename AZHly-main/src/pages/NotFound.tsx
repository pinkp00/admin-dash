import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl gradient-purple-pink flex items-center justify-center shadow-brand-md">
          <AlertCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">404</h1>
        <p className="text-xl font-semibold mb-2">Page Not Found</p>
        <p className="text-muted-foreground text-sm mb-6">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 gradient-purple-pink text-white font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
