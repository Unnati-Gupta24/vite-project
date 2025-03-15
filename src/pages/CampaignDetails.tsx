import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { useCampaigns } from "../context/CampaignContext";

const CampaignDetails: React.FC = () => {
  const { id } = useParams();
  const { campaigns } = useCampaigns();
  const { address, isConnected } = useAccount();
  const [donationAmount, setDonationAmount] = useState("");
  const [isTransacting, setIsTransacting] = useState(false);

  // The fixed recipient address
  const RECIPIENT_ADDRESS = "0x4caBd60046B96B2b5c81b43F05d82cF87a28FFB0";

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return <div className="text-cyber-primary">Campaign not found</div>;
  }

  const handleDonate = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    try {
      setIsTransacting(true);

      // Use the ethereum object from window to send the transaction
      const provider = window.ethereum;

      if (!provider) {
        alert(
          "No Ethereum wallet detected. Please install MetaMask or another wallet."
        );
        setIsTransacting(false);
        return;
      }

      // Request account access if needed
      await provider.request({ method: "eth_requestAccounts" });

      // Create the transaction parameters
      const transactionParameters = {
        to: RECIPIENT_ADDRESS,
        from: address, // User's address from wagmi
        value: "0x" + (parseFloat(donationAmount) * 10 ** 18).toString(16), // Convert ETH to Wei in hex
      };

      // Send the transaction
      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log(`Transaction sent! Hash: ${txHash}`);
      alert(
        `Thank you for your donation of ${donationAmount} ETH to campaign ${campaign.title}`
      );
      setDonationAmount("");
    } catch (error) {
      console.error("Error making donation:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsTransacting(false);
    }
  };

  return (
    <div className="bg-cyber-gray-dark rounded-xl shadow-md overflow-hidden">
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-cyber-primary mb-4">
          {campaign.title}
        </h1>
        <p className="text-cyber-secondary mb-6">{campaign.summary}</p>

        <div className="mb-8">
          <div className="w-full bg-cyber-darker rounded-full h-2 mb-2">
            <div
              className="bg-cyber-primary h-2 rounded-full"
              style={{
                width: `${
                  (parseFloat(campaign.amountRaised) /
                    parseFloat(campaign.goal)) *
                  100
                }%`,
              }}
            />
          </div>
          <div className="flex justify-between text-sm text-cyber-secondary">
            <span>Raised: {campaign.amountRaised}</span>
            <span>Goal: {campaign.goal}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-cyber-primary">
            Make a Donation
          </h2>
          <div className="flex gap-4">
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Amount in ETH"
              className="flex-1 p-2 rounded-lg bg-cyber-darker border border-cyber-primary/30 text-white focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
              min="0"
              step="0.01"
              disabled={isTransacting}
            />
            <button
              onClick={handleDonate}
              disabled={!isConnected || !donationAmount || isTransacting}
              className={`px-6 py-2 rounded-lg ${
                isConnected && !isTransacting
                  ? "bg-cyber-primary hover:shadow-neon transition-all duration-300"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {isTransacting
                ? "Processing..."
                : isConnected
                ? "Donate"
                : "Connect Wallet to Donate"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-cyber-darker rounded-lg">
            <span className="block text-cyber-secondary mb-1">Location</span>
            <span className="text-white">{campaign.location}</span>
          </div>
          <div className="p-4 bg-cyber-darker rounded-lg">
            <span className="block text-cyber-secondary mb-1">Cause</span>
            <span className="text-white">{campaign.cause}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
