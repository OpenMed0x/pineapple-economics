"use client";

import { SWRConfig } from 'swr';

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,      // 关键：窗口重新聚焦时不自动重新拉取
        revalidateOnReconnect: false,  // 网络重连时不自动重新拉取
        revalidateIfStale: false,      // 数据"过期"也不主动重新拉取，只在手动 mutate() 时刷新
        dedupingInterval: 3000,
      }}
    >
      {children}
    </SWRConfig>
  );
}