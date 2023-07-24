export interface ModalState {
  name: string | null;
  resolve: (value: boolean) => void;
  reject: (reason?: any) => void;
}

export interface ModalService {
  open(name: string): Promise<boolean>;
  active(): string | null;
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
