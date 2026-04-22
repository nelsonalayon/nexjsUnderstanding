import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import clsx from 'clsx';

type AcmeLogoProps = {
  className?: string;
};

export default function AcmeLogo({ className }: AcmeLogoProps) {
  return (
    <div
      className={clsx(
        lusitana.className,
        'flex flex-row items-center leading-none text-white',
        className,
      )}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
