import React from "react";
import Card from "./Card";
import CardHeaderCustomer from "./CardHeaderCustomer";
import CardRouteInfo from "./CardRouteInfo";
import CardDateInfo from "./CardDateInfo";
import { Buttons } from "../button";
import Image from "next/image";
import { ServiceChip } from "../chip";

interface ReceivedRequestCardProps {
  customerName: string;
  from: string;
  to: string;
  movingDate: string;
  requestTime: string;
  moveType: string;
  requestType: string;
  className?: string;
}

export default function ReceivedRequestCard({
  customerName,
  from,
  to,
  movingDate,
  requestTime,
  moveType,
  requestType,
  className,
}: ReceivedRequestCardProps) {
  return (
    <Card className={`w-md space-y-3 ${className || ""}`}>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <ServiceChip iconSrc="/icons/ic_box.svg" size="sm">
            소형이사
          </ServiceChip>
          <ServiceChip iconSrc="/icons/ic_document.svg" size="sm">
            지정 견적 요청
          </ServiceChip>
        </div>
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
