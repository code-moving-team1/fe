import type { Meta, StoryObj } from "@storybook/react";
import DesignationEstimateModal from "../../common/modal/DesignationEstimateModal";

const meta: Meta<typeof DesignationEstimateModal> = {
  title: "Common/Modal/DesignationEstimateModal",
  component: DesignationEstimateModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "지정 견적 요청용 모달. BaseModal을 사용해 기본 틀을 그대로 가져온 간단한 버전입니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof DesignationEstimateModal>;

export const Default: Story = {
  render: () => <DesignationEstimateModal />,
};
