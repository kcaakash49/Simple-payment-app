import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [notification, setNotification] = useState(null);
  return (
    <div className="flex justify-center items-center bg-[#f8fafc] h-screen">
      <div className="w-80 bg-white p-4 shadow-lg rounded-md">
        <div className="text-2xl font-bold pb-10 text-center">Send Money</div>
        <div className="flex items-center pb-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
          </div>
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>
        <div className="text-sm pb-1">Amount (Rs)</div>
        <div className="pb-4">
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter Amount"
            className="border w-full px-2 py-1 rounded-xl text-sm"
          />
        </div>
        <div>
          <button
            className="bg-green-500 w-full text-white rounded-lg text-sm p-1"
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/accounts/transfer",
                  {
                    to: id,
                    amount: amount,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                setNotification({
                  type: "success",
                  message: response.data.message || "Transfer successful",
                });
              } catch (error) {
                setNotification({
                  type: "error",
                  message:
                    error.response?.data?.message ||
                    "Failed to initiate transfer",
                });
              }
            }}
          >
            Initiate transfer
          </button>
        </div>
        {notification && (
          <div className={`mt-4 p-2 rounded ${notification.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMoney;
