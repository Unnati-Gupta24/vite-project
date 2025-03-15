import React from "react";

const mockDonations = [
  {
    id: "1",
    recipient: "Education for Rural Children",
    amount: "0.5 ETH",
    date: "2024-03-15",
    status: "Confirmed",
    txHash: "0x1234...5678",
  },
  {
    id: "2",
    recipient: "Clean Water Project",
    amount: "0.3 ETH",
    date: "2024-03-14",
    status: "Confirmed",
    txHash: "0x5678...9012",
  },
];

const Donations: React.FC = () => {
  return (
    <div className="bg-cyber-gray-dark rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-cyber-primary mb-6">
        Donation History
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cyber-primary/30">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-secondary uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-secondary uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-secondary uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyber-secondary uppercase tracking-wider">
                Transaction
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-primary/30">
            {mockDonations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {donation.recipient}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {donation.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {donation.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyber-primary/20 text-cyber-primary">
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyber-secondary hover:text-cyber-primary">
                  <a
                    href={`https://etherscan.io/tx/${donation.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {donation.txHash}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations;
