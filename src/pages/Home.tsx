import React from "react";
import { Link } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";

const Home: React.FC = () => {
  const { campaigns } = useCampaigns();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            to={`/opportunity/${campaign.id}`}
            className="bg-cyber-gray-dark rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-cyber-primary mb-2">
                {campaign.title}
              </h2>
              <p className="text-cyber-secondary mb-4">{campaign.summary}</p>
              <div className="space-y-2">
                <div className="w-full bg-cyber-darker rounded-full h-2">
                  <div
                    className="bg-cyber-primary h-2 rounded-full"
                    style={{
                      width: `${
                        (parseFloat(campaign.amountRaised) /
                          parseFloat(campaign.goal)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-cyber-secondary">
                  <span>Raised: {campaign.amountRaised}</span>
                  <span>Goal: {campaign.goal}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
