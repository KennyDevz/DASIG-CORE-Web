import React from 'react';
import Sidebar from '../core/sidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      display: 'flex', 
      width: '100%',        /* Changed from 100vw to fix x-axis overflow */
      height: '100vh', 
      overflow: 'hidden'    /* Keeps the overall container locked in place */
    }}>
      {/* Sidebar on the left (remains static) */}
      <Sidebar />
      
      {/* Content panel on the right (handles its own scrolling cleanly) */}
      <main style={{ 
        flex: 1, 
        padding: '24px', 
        backgroundColor: '#ffffff', 
        overflowY: 'auto',  /* Permits normal vertical scrolling for long content pages */
        overflowX: 'hidden'  /* Eliminates accidental horizontal shifts */
      }}>
        {children}
      </main>
    </div>
  );
}