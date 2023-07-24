import type { ModalService as IModalService, ModalState } from '@/interfaces';
import { reactive } from 'vue';

export class ModalService implements IModalService {
  private current = reactive<ModalState>({
    name: null,
    resolve: () => {},
    reject: () => {}
  });

  constructor() {}

  open(name: string): Promise<boolean> {
    this.current.name = name;

    return new Promise((resolve, reject) => {
      this.current.resolve = resolve;
      this.current.reject = reject;
    });
  }

  active(): string | null {
    return this.current.name;
  }

  accept(): void {
    this.current.resolve(true);
    this.current.name = null;
  }

  cancel(): void {
    this.current.reject(false);
    this.current.name = null;
  }
}

export const modalService = new ModalService();
