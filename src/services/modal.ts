import type { ModalService as IModalService, ModalState } from '@/interfaces';
import { reactive } from 'vue';

export class ModalService implements IModalService {
  private current = reactive<ModalState>({
    name: '',
    resolve: () => {},
    reject: () => {}
  });

  constructor() {}

  open(name: string): Promise<void> {
    this.current.name = name;

    return new Promise((resolve, reject) => {
      this.current.resolve = resolve;
      this.current.reject = reject;
    });
  }

  active(): string {
    return this.current.name;
  }

  accept(): void {
    this.current.resolve();
    this.current.name = '';
  }

  cancel(): void {
    this.current.reject();
    this.current.name = '';
  }
}

export const modalService = new ModalService();
