import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";

const Recipient: React.FC = () => {
  const navigate = useNavigate();
  const { addCampaign } = useCampaigns();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    goal: "",
    location: "Global",
    cause: "Other",
    proofType: "Documentation & Photos",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign({
      ...formData,
      goal: `${formData.goal} ETH`,
    });
    navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-cyber-gray-dark rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-cyber-primary mb-6">
        Become a Recipient
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-cyber-secondary mb-2">
            Organization Name
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg bg-cyber-darker border border-cyber-primary/30 text-white focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cyber-secondary mb-2">
            Project Description
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 rounded-lg bg-cyber-darker border border-cyber-primary/30 text-white focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cyber-secondary mb-2">
            Funding Goal (ETH)
          </label>
          <input
            type="number"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full p-2 rounded-lg bg-cyber-darker border border-cyber-primary/30 text-white focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyber-primary text-white px-4 py-2 rounded-lg hover:shadow-neon transition-all duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Recipient;
