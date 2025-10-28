import type { Meta, StoryObj } from "@storybook/react";
import EstimateStatus from "@/components/common/card/EstimateStatus";

const meta: Meta<typeof EstimateStatus> = {
  title: "Common/Card/EstimateStatus",
  component: EstimateStatus,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`EstimateStatus`는 견적 상태를 표시하는 작은 상태 컴포넌트입니다. " +
          "`status` 값에 따라 `확정견적`(빨간색 체크 아이콘) 또는 `견적대기`(회색 텍스트)로 표시됩니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof EstimateStatus>;

/** 확정 상태 (confirmed) */
export const Confirmed: Story = {
  render: () => (
    <EstimateStatus
      status="confirmed"
      size={20}
      className="flex items-center justify-center"
    />
  ),
};

/** 대기 상태 (waiting) */
export const Waiting: Story = {
  render: () => (
    <EstimateStatus
      status="waiting"
      className="flex items-center justify-center"
    />
  ),
};

/** 아이콘 크기 조정 예시 */
export const CustomSize: Story = {
  render: () => (
    <EstimateStatus
      status="confirmed"
      size={30}
      className="flex items-center justify-center"
    />
  ),
};
