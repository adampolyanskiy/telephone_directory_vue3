import type { Contact } from '@/interfaces';

export interface ModalState {
  name: string;
  resolve: (value: boolean) => void;
  reject: (reason?: any) => void;
}

export interface ModalService {
  open(name: string): Promise<boolean>;
  active(): string;
  accept(): void;
  cancel(): void;
}

export interface ModalProps {
  name: string;
  message?: string;
  accept: string;
  cancel?: string;
  title?: string;
  acceptButtonEnabled: boolean;
}
