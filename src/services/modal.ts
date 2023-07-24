import type { ModalService as IModalService, ModalState } from '@/interfaces';
import { reactive } from 'vue';

export class ModalService implements IModalService {
  private current = reactive<ModalState>({
    name: '',
    resolve: (value: boolean) => {},
    reject: (reason: any) => {}
  });

  constructor() {}

  open(name: string): Promise<boolean> {
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
    this.current.resolve(true);
    this.current.name = '';
  }

  cancel(): void {
    this.current.reject(false);
    this.current.name = '';
  }
}

export const modalService = new ModalService();
