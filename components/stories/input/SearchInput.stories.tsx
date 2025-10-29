import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "../../common/input/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Common/Input/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- **기사님 찾기 페이지**: 검색창을 통해 이사업체(기사님)를 이름을 찾을 때 사용합니다.
- **견적 요청 페이지**: 출발지와 도착지를 입력받아 주소 검색 및 자동완성 기능과 함께 사용합니다.
- **받은 요청 페이지**: 요청 목록을 검색하거나 필터링할 때 사용합니다.

어떻게 사용하나
- placeholder, onSearch, onChange 등의 props를 통해 검색 입력창을 제어합니다.
- Enter 키 입력 또는 검색 아이콘 클릭 시 onSearch(value)가 호출되어 검색을 실행합니다.
- 초기화 아이콘을 눌러 입력 내용을 즉시 지울 수 있습니다.

사용 예시
- SearchInput placeholder="이사업체 이름을 검색하세요"
- SearchInput placeholder="출발지를 입력하세요" onSearch={(v) => alert("검색 실행: " + v)}

특징
- TailwindCSS 기반으로 border, background 등 자유롭게 커스터마이징 가능
- 검색 및 초기화 아이콘 포함
- 외부에서 onSearch, onChange 이벤트를 제어할 수 있음
- 다양한 페이지에서 동일한 UX로 일관된 검색 경험 제공
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

/* ------------------------------ 기본 상태 ------------------------------ */
export const Default: Story = {
  render: () => <SearchInput placeholder="검색어를 입력하세요" />,
};

/* ------------------------------ 검색 기능 ------------------------------ */
export const WithSearchAction: Story = {
  render: () => (
    <SearchInput
      placeholder="지역을 입력하세요"
      onSearch={(value) => alert(`검색 실행: ${value}`)}
    />
  ),
};

/* ------------------------------ 커스텀 스타일 ------------------------------ */
export const CustomStyle: Story = {
  render: () => (
    <SearchInput
      placeholder="커스텀 스타일 검색창"
      className="border border-gray-300 bg-gray-100"
    />
  ),
};
