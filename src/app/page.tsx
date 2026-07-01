'use client';
import SideRays from '@/_components/SideRays';
import { Link } from '@astryxdesign/core';
import { VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';

export default function Home() {
  return (
    <div className="relative min-h-dvh max-h-dvh flex items-center justify-start p-6 sm:p-12">
      <div className="absolute inset-0 z-0">
        <SideRays
          className="w-full h-full"
          speed={2.5}
          rayColor1="#3161ff"
          rayColor2="#7192ff"
          intensity={1.5}
          spread={2.9}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={1}
          falloff={1.8}
          opacity={1}
        />
      </div>
      <VStack gap={2} className="relative z-10">
        <Heading level={1}>1manuelcdev's portfolio</Heading>
        <Text>
          Este site está em construção, volte daqui a pouco...
        </Text>
        <Text type="supporting">
          Feito com danone, dúvidas e um pouco de fé por {' '} 
          <Link href='https://github.com/1manuelcdev' type='supporting'>
            @1manuelcdev
          </Link>
        </Text>
      </VStack>
    </div>
  );
}
