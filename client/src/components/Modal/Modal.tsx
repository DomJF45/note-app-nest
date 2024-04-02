import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, useState, SetStateAction, Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, setIsOpen, title, children }: ModalProps) => {
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel>
              <Dialog.Title>{title}</Dialog.Title>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
