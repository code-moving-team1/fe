import { useEstimateStore } from "@/store/estimateStore";
import { useState } from "react";
import BaseModal from "./BaseModal";

interface AddressModalProps {
  type: "departure" | "destination";
  onClose: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddressModal({
  type,
  onClose,
  open,
  onOpenChange,
}: AddressModalProps) {
  const { setDeparture, setDestination } = useEstimateStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) return setResults([]);

    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(value)}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
        },
      },
    );
    const data = await res.json();
    setResults(data.documents || []);
  };

  const handleConfirm = () => {
    if (!selectedAddress) return;
    if (type === "departure") setDeparture(selectedAddress);
    else setDestination(selectedAddress);
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      showRouteInfo={false}
      showTextArea={false}
      title={
        type === "departure" ? "출발지를 선택해주세요" : "도착지를 선택해주세요"
      }
      trigger={undefined}
      onConfirm={handleConfirm}
    >
      <input
        type="text"
        value={selectedAddress || query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedAddress("");
          handleSearch(e.target.value);
        }}
        placeholder="주소를 입력해 주세요"
        className="mb-3 w-full rounded border px-3 py-3"
      />

      <ul className="max-h-60 space-y-3 overflow-y-auto">
        {results.map((item, idx) => {
          const road = item.road_address?.address_name;
          const building = item.road_address?.building_name;
          const jibun = item.address?.address_name;

          const fullRoad = building ? `${road} (${building})` : road;

          return (
            <li
              key={idx}
              onClick={() => setSelectedAddress(fullRoad || jibun)}
              className={`cursor-pointer rounded-lg border p-3 hover:bg-gray-50 ${
                selectedAddress === (fullRoad || jibun)
                  ? "border-red-500 bg-red-100"
                  : ""
              }`}
            >
              <p className="text-sm font-semibold">
                {item.road_address?.zone_no}
              </p>

              {road && (
                <div className="flex items-center gap-2">
                  <span className="rounded-4xl bg-red-200 px-3 py-1 text-xs whitespace-nowrap text-red-600">
                    도로명
                  </span>
                  <span className="text-sm">{fullRoad}</span>
                </div>
              )}

              {jibun && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-4xl bg-red-200 px-4 py-1 text-xs whitespace-nowrap text-red-600">
                    지번
                  </span>
                  <span className="text-sm">{jibun}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </BaseModal>
  );
}
