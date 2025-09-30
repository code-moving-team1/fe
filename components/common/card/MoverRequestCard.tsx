"use client";

import Image from "next/image";
import { Buttons } from "../button";
import CardDateInfo from "./CardDateInfo";
import CardRouteInfo from "./CardRouteInfo";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";
import CardHeaderCustomer from "./CardHeaderCustomer";
import MoverMessage from "./Mover/MoverMessage";
import MoverDescription from "./Mover/MoverDescription";

interface MoverRequestProps {
  customerName: string;
  description: string;
  from: string;
  to: string;
  movingDate: string;
  isQuoted?: boolean;
  onClick?: () => void;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function MoverRequest({
  customerName,
  description,
  from,
  to,
  movingDate,
  isQuoted = false,
  onClick,
  chips = [],
}: MoverRequestProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src="/icons/ic_profile.svg"
          alt="고객 프로필"
          width={99}
          height={99}
          className="rounded-4xl"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="flex items-center [&_*]:border-0">
              <CardHeaderCustomer customerName={customerName} />
            </div>
          </div>
          <div>
            <MoverDescription description={description} />
          </div>
          <div className="space-y-3">
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {chips.map((chip, idx) => (
                  <ServiceChip key={idx} iconSrc={chip.iconSrc} size="sm">
                    {chip.label}
                  </ServiceChip>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between gap-3 text-sm font-bold">
            <CardRouteInfo from={from} to={to} />
            <div className="ml-5">
              <CardDateInfo movingDate={movingDate} />
            </div>
          </div>
        </div>
      </div>
      {onClick ? (
        <Buttons size="figma" flat className="mt-25 w-30" onClick={onClick}>
          견적보내기
        </Buttons>
      ) : (
        <div className="mt-25 rounded-lg border border-red-400 bg-red-50 px-4 py-2 font-semibold text-red-500">
          고객 확인 대기 중
        </div>
      )}
    </div>
  );
}
