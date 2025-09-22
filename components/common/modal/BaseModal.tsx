import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface BaseModalProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function BaseModal({
  trigger,
  title,
  description,
  children,
  className,
}: BaseModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className={`fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg ${
            className || ""
          }`}
        >
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          </Dialog.Close>

          {title && (
            <Dialog.Title className="text-lg font-bold mb-2">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="text-gray-500 mb-4">
              {description}
            </Dialog.Description>
          )}

          {children}

          <Dialog.Close asChild>
            <button className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">
              닫기
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// page.tsx 테스트 코드
//  <div className="p-10">
//       <BaseModal
//         trigger={
//           <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
//             base modal
//           </button>
//         }
//         title="Base Modal"
//       >
//         <p>이 모달에 추가해서 넣으면 됩니다</p>
//       </BaseModal>
//     </div>
