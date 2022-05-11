import { useNativeBalance } from "react-moralis";

function NativeBalance() {
  const {
    getBalances,
    data: balance,
    nativeToken,
    error,
    isLoading,
  } = useNativeBalance({ chain: "bsc" });

  console.log(nativeToken);
  return <div>{balance.formatted}</div>;
}

export default NativeBalance;
