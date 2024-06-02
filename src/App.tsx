import { TonConnectButton } from "@tonconnect/ui-react";
import { fromNano } from "@ton/core";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from "@twa-dev/sdk";
import "./App.css";

function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>Connect to the wallet:</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TonConnectButton />
        </div>
      </div>
      <br />
      <div>
        <div className="Card">
          <b>{WebApp.platform}</b>
          <br />
          <b>{WebApp.colorScheme}</b>
          <br />
          <b>Contract address:</b>
          <div className="Hint">{contract_address ?? "loading..."}</div>
          <br />
          <b>Contract balance:</b>
          {contract_balance && (
            <div className="Hint">{fromNano(contract_balance)} TON</div>
          )}
        </div>
        <br />
        <div className="Card">
          <b>Counter value:</b>
          {counter_value && <div>{counter_value.toString()}</div>}
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div>
          {connected && (
            <button
              onClick={() => {
                showAlert();
              }}
            >
              Show alert
            </button>
          )}
        </div>
        <div>
          {connected && (
            <button
              onClick={() => {
                sendIncrement();
              }}
            >
              Increment by 1
            </button>
          )}
        </div>
        <div>
          {connected && (
            <button
              onClick={() => {
                sendDeposit();
              }}
            >
              Request deposit of 1 TON
            </button>
          )}
        </div>
        <div>
          {connected && (
            <button
              onClick={() => {
                sendWithdrawalRequest();
              }}
            >
              Request 0.7 TON withdrawal
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
