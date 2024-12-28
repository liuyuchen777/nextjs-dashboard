import Icon from '@mdi/react';
import { mdiPenguin } from '@mdi/js';
import { lusitana } from '@/app/ui/fonts';

export default function PenguinLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Icon path={mdiPenguin} size={2} />
      <p className="text-[30px]">企鹅</p>
    </div>
  );
}
