import React from "react";
import { Github, Twitter} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-gray-dark border-t border-cyber-primary/30 mt-16">
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-cyber-primary font-bold text-lg mb-4">
              CyberDonate
            </h3>
            <p className="text-cyber-secondary">
              Decentralized donations for a better future. Powered by blockchain
              technology.
            </p>
          </div>
          <div>
            <h3 className="text-cyber-primary font-bold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/recipient"
                  className="text-cyber-secondary hover:text-cyber-primary transition-colors"
                >
                  Start a Campaign
                </a>
              </li>
              <li>
                <a
                  href="/donations"
                  className="text-cyber-secondary hover:text-cyber-primary transition-colors"
                >
                  View Donations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-cyber-primary font-bold text-lg mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-secondary hover:text-cyber-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-secondary hover:text-cyber-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-secondary hover:text-cyber-primary transition-colors"
              >
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cyber-primary/30 text-center text-cyber-secondary">
          <p>
            &copy; {new Date().getFullYear()} CyberDonate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
