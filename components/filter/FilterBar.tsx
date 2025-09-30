"use client";

import { useState } from "react";
import { MoveRequestFilter } from "@/lib/api/moveRequest";
import Image from "next/image";

interface FilterBarProps {
  onFilterChange: (filters: MoveRequestFilter) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<MoveRequestFilter>({
    page: 1,
    pageSize: 10,
  });
  const [open, setOpen] = useState<"from" | "to" | "service" | "sort" | null>(
    null,
  );

  const [selectedFromLabel, setSelectedFromLabel] = useState("출발 지역");
  const [selectedToLabel, setSelectedToLabel] = useState("도착 지역");
  const [selectedServiceLabel, setSelectedServiceLabel] = useState("서비스");
  const [selectedSortLabel, setSelectedSortLabel] = useState("정렬");

  const REGIONS = [
    "전체",
    "서울",
    "경기",
    "인천",
    "부산",
    "대전",
    "대구",
    "광주",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];
  const services = ["전체", "소형이사", "가정이사", "사무실이사"];
  const sorts = [
    { label: "날짜 순", field: "moveDate", order: "asc" },
    { label: "마감일 순", field: "moveDate", order: "desc" },
    { label: "등록 최신 순", field: "createdAt", order: "desc" },
  ];

  const handleSelect = (key: keyof MoveRequestFilter, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getButtonClass = (selectedLabel: string, openKey: string) => {
    const isActive =
      selectedLabel !== "출발 지역" &&
      selectedLabel !== "도착 지역" &&
      selectedLabel !== "서비스" &&
      selectedLabel !== "정렬" &&
      selectedLabel !== "전체";

    const isOpen = open === openKey;

    return `flex w-32 items-center justify-between rounded-lg  border px-4 py-2 text-sm font-semibold transition
      ${
        isActive || isOpen
          ? "border-red-400 bg-red-50 text-red-500"
          : "border-gray-300 text-gray-700 bg-white"
      }`;
  };

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <Image
      src={isOpen ? "/icons/ic_chevron-up.svg" : "/icons/ic_chevron-down.svg"}
      alt="드롭다운"
      width={20}
      height={20}
    />
  );

  return (
    <div className="relative z-50 flex w-full items-center justify-between">
      <div className="flex gap-3">
        <div className="relative">
          <button
            onClick={() => setOpen(open === "from" ? null : "from")}
            className={getButtonClass(selectedFromLabel, "from")}
          >
            {selectedFromLabel}
            <ChevronIcon isOpen={open === "from"} />
          </button>
          {open === "from" && (
            <div className="absolute left-0 z-50 w-64 translate-y-2 rounded-xl border border-gray-300 bg-white shadow-lg">
              <ul className="scrollbar-hide grid max-h-60 grid-cols-2 gap-1 overflow-y-auto p-2">
                {REGIONS.map((region) => (
                  <li
                    key={region}
                    onClick={() => {
                      setSelectedFromLabel(region);
                      handleSelect(
                        "departureRegions",
                        region === "전체" ? [] : [region],
                      );
                      setOpen(null);
                    }}
                    className={`cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                      selectedFromLabel === region
                        ? "bg-red-50 text-red-500"
                        : ""
                    }`}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen(open === "to" ? null : "to")}
            className={getButtonClass(selectedToLabel, "to")}
          >
            {selectedToLabel}
            <ChevronIcon isOpen={open === "to"} />
          </button>
          {open === "to" && (
            <div className="absolute left-0 z-50 w-64 translate-y-2 rounded-xl border border-gray-300 bg-white shadow-lg">
              <ul className="scrollbar-hide grid max-h-60 grid-cols-2 gap-1 overflow-y-auto p-2">
                {REGIONS.map((region) => (
                  <li
                    key={region}
                    onClick={() => {
                      setSelectedToLabel(region);
                      handleSelect(
                        "destinationRegions",
                        region === "전체" ? [] : [region],
                      );
                      setOpen(null);
                    }}
                    className={`cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                      selectedToLabel === region ? "bg-red-50 text-red-500" : ""
                    }`}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(open === "service" ? null : "service")}
            className={getButtonClass(selectedServiceLabel, "service")}
          >
            {selectedServiceLabel}
            <ChevronIcon isOpen={open === "service"} />
          </button>
          {open === "service" && (
            <div className="absolute left-0 z-50 w-40 translate-y-2 rounded-xl border border-gray-300 bg-white shadow-lg">
              <ul>
                {services.map((service) => (
                  <li
                    key={service}
                    onClick={() => {
                      setSelectedServiceLabel(service);
                      handleSelect(
                        "serviceTypes",
                        service === "전체"
                          ? []
                          : [
                              service === "소형이사"
                                ? "SMALL"
                                : service === "가정이사"
                                  ? "FAMILY"
                                  : "OFFICE",
                            ],
                      );
                      setOpen(null);
                    }}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                      selectedServiceLabel === service
                        ? "bg-red-50 text-red-500"
                        : ""
                    }`}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(open === "sort" ? null : "sort")}
          className={getButtonClass(selectedSortLabel, "sort")}
        >
          {selectedSortLabel}
          <ChevronIcon isOpen={open === "sort"} />
        </button>
        {open === "sort" && (
          <div className="absolute right-0 z-50 w-40 translate-y-2 rounded-xl border border-gray-300 bg-white shadow-lg">
            <ul>
              {sorts.map((sort) => (
                <li
                  key={sort.label}
                  onClick={() => {
                    setSelectedSortLabel(sort.label);
                    handleSelect("sort", {
                      field: sort.field,
                      order: sort.order,
                    });
                    setOpen(null);
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    selectedSortLabel === sort.label
                      ? "bg-red-50 text-red-500"
                      : ""
                  }`}
                >
                  {sort.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
