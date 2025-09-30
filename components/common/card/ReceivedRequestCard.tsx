import React from "react";
import Card from "./Card";
import CardHeaderCustomer from "./CardHeaderCustomer";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import { Buttons } from "../button";
import Image from "next/image";
import { ServiceChip } from "../chip";
import { ServiceChipProps } from "../chip/presets";

interface ReceivedRequestCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  requestTime: string;
  requestType: string;
  className?: string;
  chips?: (Omit<ServiceChipProps, "iconSrc"> & {
    label: string;
    iconSrc: string;
  })[];
}

export default function ReceivedRequestCard({
  customerName,
  from,
  to,
  movingDate,
  requestTime,
  requestType,
  className,
  chips = [],
}: ReceivedRequestCardProps) {
  return (
    <Card className={`w-md space-y-3 ${className || ""}`}>
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

      <div className="py-3">
        <CardHeaderCustomer customerName={customerName} />
      </div>
      <div className="flex justify-between text-sm font-bold">
        <CardRouteInfo from={from} to={to} />
        <div>
          <CardDateInfo movingDate={movingDate} />
        </div>
      </div>

      <div className="flex gap-3 pt-3">
        <Buttons variant="outline" size="figma" state="active" className="w-48">
          반려하기
        </Buttons>
        <Buttons
          size="figma"
          flat
          className="w-48"
          rightIcon={
            <Image
              src="/icons/ic_writing.svg"
              alt=""
              width={25}
              height={25}
              aria-hidden
            />
          }
        >
          견적보내기
        </Buttons>
      </div>
    </Card>
  );
}
