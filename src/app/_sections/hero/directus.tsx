/**
 * Exemple d'adaptateur pour une section Hero Directus
 * Remplace le composant Hero existant pour consommer directement Directus
 */

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/common/button';
import { Heading } from '@/common/heading';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
  image?: {
    url: string;
    alt: string;
  };
}

/**
 * Composant Hero qui consomme les données Directus
 */
export function HeroFromDirectus({ hero }: { hero: HeroProps }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative min-h-[630px] overflow-hidden pb-10">
      {/* Decorations */}
      <div className="border-border dark:border-dark-border absolute top-0 left-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="border-border dark:border-dark-border col-span-1 flex h-full items-center justify-center border-x" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>

      {/* Background blurs */}
      <figure className="bg-accent-500/40 pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]" />
      <figure className="bg-surface-primary dark:bg-dark-surface-primary pointer-events-none absolute top-[64px] left-[4vw] z-20 hidden aspect-square w-[32vw] rounded-full opacity-50 blur-[100px] md:block" />
      <figure className="bg-surface-primary dark:bg-dark-surface-primary pointer-events-none absolute right-[7vw] bottom-[-50px] z-20 hidden aspect-square w-[30vw] rounded-full opacity-50 blur-[100px] md:block" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end gap-8 px-4 py-12 text-center">
        {/* Title and description */}
        <div className="mx-auto max-w-3xl">
          <Heading level={1} className="mb-4 text-4xl md:text-5xl lg:text-6xl">
            {hero.title}
          </Heading>

          {hero.subtitle && (
            <p className="mb-4 text-lg text-neutral-600 dark:text-neutral-400">
              {hero.subtitle}
            </p>
          )}

          {hero.description && (
            <p className="text-neutral-600 dark:text-neutral-400">
              {hero.description}
            </p>
          )}
        </div>

        {/* CTA Button */}
        {hero.cta_text && (
          <div className="mt-4">
            <Button
              href={hero.cta_link || '#'}
              size="lg"
            >
              {hero.cta_text}
            </Button>
          </div>
        )}

        {/* Hero Image */}
        {hero.image && (
          <div className="relative mt-8 max-w-2xl">
            <img
              src={hero.image.url}
              alt={hero.image.alt}
              className={`w-full rounded-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Exemple d'utilisation côté serveur avec Directus
 * 
 * import { getItem } from '@/lib/directus/api';
 * import { HeroFromDirectus } from '@/app/_sections/hero/directus';
 * 
 * export default async function Page() {
 *   const hero = await getItem('sections', 'hero-section-1', {
 *     fields: ['*', 'image.*']
 *   });
 * 
 *   return <HeroFromDirectus hero={hero} />;
 * }
 */
