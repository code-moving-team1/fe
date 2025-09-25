"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import TextArea from "../input/TextArea";
import CardRouteInfo from "../card/CardRouteInfo";
import CardDateInfo from "../card/CardDateInfo";
import { Buttons } from "../button";

interface BaseModalProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  departure?: string;
  destination?: string;
  moveDate?: string;
  textAreaLabel?: string;
  extraFields?: React.ReactNode;
  showRouteInfo?: boolean;
  showTextArea?: boolean;
  confirmText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
}

export default function BaseModal({
  trigger,
  title,
  description,
  children,
  className,
  departure,
  destination,
  moveDate,
  textAreaLabel = "내용을 입력해 주세요",
  extraFields,
  showRouteInfo = true,
  showTextArea = true,
  confirmText,
  open,
  onOpenChange,
  onConfirm,
}: BaseModalProps) {
  const [value, setValue] = useState("");

  const isValid = value.length >= 10;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setValue("");
        onOpenChange?.(nextOpen);
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className={`fixed top-1/2 left-1/2 flex w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-4xl bg-white p-6 shadow-lg ${className || ""}`}
        >
          <div className="flex items-center justify-between">
            {title && (
              <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <Cross2Icon className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="text-sm font-normal">
              {description}
            </Dialog.Description>
          )}

          {children}

          {showRouteInfo && (
            <div className="flex items-start justify-between gap-6 text-xs">
              <CardRouteInfo from={departure || ""} to={destination || ""} />
              <CardDateInfo movingDate={moveDate || ""} />
            </div>
          )}

          {extraFields}

          {showTextArea && (
            <TextArea
              id="textarea"
              label={textAreaLabel}
              placeholder="최소 10자 이상 입력해주세요"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}

          <Dialog.Close asChild>
            <Buttons
              disabled={showTextArea ? !isValid : false}
              className={`mt-4 w-full rounded-lg px-4 py-2 ${
                showTextArea
                  ? isValid
                    ? "cursor-pointer bg-orange-400 text-white hover:bg-orange-500"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "cursor-pointer bg-orange-400 text-white hover:bg-orange-500"
              }`}
              onClick={() => onConfirm?.()}
            >
              {confirmText || "확인"}
            </Buttons>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
