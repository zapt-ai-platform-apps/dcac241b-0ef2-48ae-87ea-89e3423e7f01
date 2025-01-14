import React from 'react';

export default function Rewards() {
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">نظام المكافآت</h2>
      <p>
        ازدد تفاعلاً في المجتمع واستخدم الأدوات المتوفرة لتحصل على نقاط وبادجات تشجيعية!
      </p>
      <div className="border border-white p-2">
        <p>حساب النقاط: <span className="font-bold">0</span></p>
        <p>البادجات: <span>لا يوجد حتى الآن</span></p>
        <p className="text-sm italic">(المزيد من التطوير لاحقاً)</p>
      </div>
    </div>
  );
}