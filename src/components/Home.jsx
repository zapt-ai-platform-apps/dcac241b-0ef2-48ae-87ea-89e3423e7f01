import React from 'react';

export default function Home() {
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">مرحباً بك في New App</h1>
      <p className="text-lg">
        تطبيق مبتكر يدعم ذوي الاحتياجات الخاصة، خاصة المكفوفين.
        استكشف أدوات المساعدة، التعليم، والمجتمع التفاعلي.
      </p>
      <img
        src="#"
        alt="A welcoming high-contrast illustration for accessibility"
        data-image-request="abstract illustration depicting accessibility"
        className="max-w-full h-auto"
      />
    </div>
  );
}