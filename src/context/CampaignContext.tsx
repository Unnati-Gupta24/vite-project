import React, { createContext, useContext, useState } from "react";

interface Campaign {
  id: string;
  title: string;
  summary: string;
  cause: string;
  location: string;
  proofType: string;
  amountRaised: string;
  goal: string;
  image: string;
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Education for Rural Children",
    summary: "Help provide education to children in rural areas",
    cause: "Education",
    location: "Global",
    proofType: "Documentation & Photos",
    amountRaised: "2.5 ETH",
    goal: "5 ETH",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Clean Water Initiative",
    summary: "Providing clean water to communities in need",
    cause: "Environment",
    location: "Global",
    proofType: "Documentation & Photos",
    amountRaised: "1.8 ETH",
    goal: "4 ETH",
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, "id" | "amountRaised">) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const addCampaign = (newCampaign: Omit<Campaign, "id" | "amountRaised">) => {
    setCampaigns((prev) => [
      ...prev,
      {
        ...newCampaign,
        id: Date.now().toString(),
        amountRaised: "0 ETH",
      },
    ]);
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaigns must be used within a CampaignProvider");
  }
  return context;
};
