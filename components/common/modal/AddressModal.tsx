import { useEstimateStore } from "@/store/estimateStore";
import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import Image from "next/image";
import { useAlertModal } from "./AlertModal";

interface AddressModalProps {
  type: "departure" | "destination";
  onClose: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const regionMap: Record<string, string> = {
  서울: "서울",
  경기: "경기",
  인천: "인천",
  부산: "부산",
  대전: "대전",
  대구: "대구",
  광주: "광주",
  울산: "울산",
  강원특별자치: "강원",
  충북: "충북",
  충남: "충남",
  전북특별자치: "전북",
  전남: "전남",
  경북: "경북",
  경남: "경남",
  제주특별자치: "제주",
  세종특별자치시: "세종",
};

const shortRegionMap: Record<string, string> = {
  세종특별자치시: "세종",
  강원특별자치도: "강원",
  전북특별자치도: "전북",
  제주특별자치도: "제주",
  서울: "서울",
  경기: "경기",
  인천: "인천",
  부산: "부산",
  대전: "대전",
  대구: "대구",
  광주: "광주",
  울산: "울산",
  강원특별자치: "강원",
  충북: "충북",
  충남: "충남",
  전북특별자치: "전북",
  전남: "전남",
  경북: "경북",
  경남: "경남",
  제주특별자치: "제주",
};

// 시/도 한 단어로 단축 (shortRegionMap 없으면 접미사 제거)
function toShortSido(raw?: string) {
  if (!raw) return "";
  if (shortRegionMap[raw]) return shortRegionMap[raw];
  return raw.replace(/(특별자치도|특별자치시|특별시|광역시|도)$/g, "");
}

// 풀 주소에서 맨 앞의 시/도만 짧게 바꿔주는 함수
function shortenSidoInAddress(full: string, r1Raw: string) {
  const short = toShortSido(r1Raw);
  return full.startsWith(r1Raw) ? short + full.slice(r1Raw.length) : full;
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
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const { alert, Modal } = useAlertModal();

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert({ title: "오류", message: "현재 위치를 사용할 수 없습니다." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
            },
          },
        );
        const data = await res.json();
        const addressInfo = data.documents[0]?.address;

        if (!addressInfo) {
          alert({
            title: "오류",
            message: "현재 위치를 찾을 수 없습니다.",
          });
          return;
        }

        // console.log(
        //   "addressInfo.region_1depth_name :",
        //   addressInfo.region_1depth_name,
        // );
        const region1 = addressInfo.region_1depth_name
          ?.replace("특별시", "")
          ?.replace("광역시", "")
          ?.replace("도", "")
          ?.replace("시", "")
          ?.replace("특별자치시", "")
          ?.replace("특별자치", "");
        console.log("replace 돈 이후 region_1depth_name", region1);
        const region2 = addressInfo.region_2depth_name;
        const region3 = addressInfo.region_3depth_name;
        const mainNo = addressInfo.main_address_no ?? "";
        const subNo = addressInfo.sub_address_no
          ? `-${addressInfo.sub_address_no}`
          : "";
        const modifiedRegion1 = "";
        const fullAddress = `${region1} ${region2} ${region3} ${mainNo}${subNo}`;
        console.log("fullAddress", fullAddress);
        const regionFinal = regionMap[region1] || "서울";
        console.log("regionFinal", regionFinal);

        setQuery(fullAddress);
        setSelectedAddress(fullAddress);
        setSelectedRegion(regionFinal);
        setResults([]);
      },
      (err) => {
        console.error(err);
        alert({
          title: "오류",
          message: "현재 위치를 불러올 수 없습니다.",
        });
      },
    );
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          query,
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
        },
      );
      const data = await res.json();
      setResults(data.documents || []);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: any) => {
    const road = item.road_address?.address_name;
    const building = item.road_address?.building_name;
    const jibun = item.address?.address_name;

    // const fullAddress = building ? `${road} (${building})` : road || jibun;

    // 화면 표기용 원본 주소(도로명 우선, 없으면 지번)
    const base = building ? `${road} (${building})` : road || jibun || "";

    // 카카오 원본 1뎁스(긴 이름) → 앞부분만 짧게 치환
    const r1Raw: string = item.address?.region_1depth_name || "";
    const fullAddress = shortenSidoInAddress(base, r1Raw)
      .trim()
      .replace(/\s+/g, " ");

    // const regionFinal = regionEnumMap[r1Raw] || toShortSido(r1Raw) || "서울";

    console.log("handle select fullAddress : ", fullAddress);
    const regionKorean =
      item.address?.region_1depth_name
        ?.replace("특별시", "")
        ?.replace("광역시", "")
        ?.replace("도", "") || "서울";
    // console.log("region_1depth_name", regionKorean);
    const regionFinal = regionMap[regionKorean] || "서울";
    console.log("regionFinal", regionFinal);

    setSelectedAddress(fullAddress);
    setSelectedRegion(regionFinal);
  };

  const handleConfirm = () => {
    if (!selectedAddress || !selectedRegion) return;

    if (type === "departure") {
      setDeparture(selectedAddress, selectedRegion);
    } else {
      setDestination(selectedAddress, selectedRegion);
    }
    onClose();
  };

  const isSelectedValid = Boolean(selectedAddress && selectedRegion);

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
      confirmText="확인"
      validate={() => isSelectedValid}
    >
      <div className="hidden md:block">
        <div className="relative mb-3">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedAddress("");
            }}
            placeholder="주소를 입력해 주세요"
            className="mb-3 w-full rounded border px-3 py-3"
          />
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="absolute right-2 mt-6 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src="/icons/ic_my_location.svg"
              alt="현재 위치"
              width={30}
              height={30}
            />
          </button>
        </div>

        <ul className="max-h-60 space-y-3 overflow-y-auto">
          {results.map((item, idx) => {
            // console.log("mapping item : ", item);
            const road = item.road_address?.address_name;
            const building = item.road_address?.building_name;
            const jibun = item.address?.address_name;
            const fullRoad = building ? `${road} (${building})` : road;
            // console.log("fullRoad : ", fullRoad);
            return (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
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
                    <span className="rounded-4xl bg-red-200 px-3 py-1 text-xs text-red-600">
                      도로명
                    </span>
                    <span className="text-sm">{fullRoad}</span>
                  </div>
                )}
                {jibun && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-4xl bg-red-200 px-4 py-1 text-xs text-red-600">
                      지번
                    </span>
                    <span className="text-sm">{jibun}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="block overflow-x-hidden md:hidden">
        <div className="mx-auto w-full px-4">
          <div className="sticky top-0 z-10 mb-3 bg-white pt-1 pb-3">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedAddress("");
                }}
                placeholder="주소를 입력해 주세요"
                className="w-full rounded border px-3 py-3"
              />
              <button
                type="button"
                onClick={handleCurrentLocation}
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              >
                <Image
                  src="/icons/ic_my_location.svg"
                  alt="현재 위치"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>

          <ul className="max-h-[232px] touch-pan-y space-y-3 overflow-y-auto overscroll-contain pr-1">
            {results.map((item, idx) => {
              const road = item.road_address?.address_name;
              const building = item.road_address?.building_name;
              const jibun = item.address?.address_name;
              const fullRoad = building ? `${road} (${building})` : road;

              return (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
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
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                      <span className="rounded-4xl bg-red-200 px-3 py-1 text-xs text-red-600">
                        도로명
                      </span>
                      <span className="text-sm break-words">{fullRoad}</span>
                    </div>
                  )}

                  {jibun && (
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                      <span className="rounded-4xl bg-red-200 px-4 py-1 text-xs text-red-600">
                        지번
                      </span>
                      <span className="text-sm break-words">{jibun}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <Modal />
      </div>
    </BaseModal>
  );
}
