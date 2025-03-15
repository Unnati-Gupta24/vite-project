import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Heart, Home, User, History, Menu, X } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-cyber-primary" />
                <span className="ml-2 text-lg md:text-xl font-bold text-cyber-secondary">
                  DonateChain
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-cyber-secondary hover:text-cyber-primary"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLinks />
              <WalletButton
                handleWalletClick={handleWalletClick}
                isLoading={isLoading}
                isConnected={isConnected}
                address={address}
              />
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden p-4 border-t border-cyber-primary/30">
            <div className="flex flex-col space-y-4">
              <NavLinks />
              <WalletButton
                handleWalletClick={handleWalletClick}
                isLoading={isLoading}
                isConnected={isConnected}
                address={address}
              />
            </div>
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

// Separate component for navigation links
const NavLinks = () => (
  <>
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
  </>
);

// Separate component for wallet button
const WalletButton = ({
  handleWalletClick,
  isLoading,
  isConnected,
  address,
}) => (
  <button
    onClick={handleWalletClick}
    disabled={isLoading}
    className={`w-full md:w-auto bg-cyber-primary text-white px-4 py-2 rounded-lg transition-all duration-300 ${
      isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-neon"
    }`}
  >
    {isLoading
      ? "Connecting..."
      : isConnected
      ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
      : "Connect Wallet"}
  </button>
);

export default Layout;
