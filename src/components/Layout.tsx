import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Heart, Home, User, History } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

const Layout: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, error: connectError, isLoading } = useConnect();
  const { disconnect } = useDisconnect();

  const handleWalletClick = async () => {
    try {
      if (isConnected) {
        await disconnect();
      } else {
        await connect({ connector: injected() });
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  // Show error message if connection failed
  React.useEffect(() => {
    if (connectError) {
      console.error("Connection error:", connectError);
    }
  }, [connectError]);

  return (
    <div className="min-h-screen bg-cyber-dark text-white font-cyber">
      <nav className="bg-cyber-gray-dark border-b border-cyber-primary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Heart className="h-8 w-8 text-cyber-primary" />
                <span className="ml-2 text-xl font-bold text-cyber-secondary">
                  DonateChain
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-cyber-secondary hover:text-cyber-primary flex items-center transition-colors"
              >
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              <Link
                to="/recipient"
                className="text-cyber-secondary hover:text-cyber-primary flex items-center transition-colors"
              >
                <User className="h-5 w-5 mr-1" />
                <span>Recipient</span>
              </Link>
              <Link
                to="/donations"
                className="text-cyber-secondary hover:text-cyber-primary flex items-center transition-colors"
              >
                <History className="h-5 w-5 mr-1" />
                <span>History</span>
              </Link>
              <button
                onClick={handleWalletClick}
                disabled={isLoading}
                className={`bg-cyber-primary text-white px-4 py-2 rounded-lg transition-all duration-300 ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-neon"
                }`}
              >
                {isLoading
                  ? "Connecting..."
                  : isConnected
                  ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
