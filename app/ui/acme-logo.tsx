import Icon from '@mdi/react';
import { mdiPenguin } from '@mdi/js';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Icon path={mdiPenguin} size={5} />
      <p className="text-[44px]">企鹅</p>
    </div>
  );
}
