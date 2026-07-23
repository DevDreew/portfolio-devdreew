'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src: string;
  name: string;
  color: string;
}

/**
 * Ícone de tecnologia com fallback gracioso.
 *
 * Se o arquivo em /public/icons/ ainda não existir, em vez de quebrar
 * o layout com imagem quebrada, renderiza um monograma com a cor da
 * categoria. Isso permite publicar o site antes de ter todos os ícones.
 */
export function SkillIcon({ src, name, color }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-sm font-mono text-[13px] font-semibold"
        style={{ background: `${color}14`, color }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={32}
      height={32}
      className="h-8 w-8 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
      onError={() => setFailed(true)}
    />
  );
}
