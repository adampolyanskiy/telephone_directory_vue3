export interface ModalState {
  name: string;
  resolve: (value: void) => void;
  reject: (reason?: any) => void;
}

export interface ModalService {
  open(name: string): Promise<void>;
  active(): string;
  accept(): void;
  cancel(): void;
}
