'use client'

import { usePathname } from 'next/navigation'
import { BottomNavigation } from '@/components/bottom-navigation'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideBottomNav = pathname === '/login'

  return (
    <>
      <div className='pb-20'>{children}</div>
      {!hideBottomNav && <BottomNavigation />}
    </>
  )
}
