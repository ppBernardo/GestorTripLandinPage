import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'GestorTrip — Sistema de Gestão de Viagens | Solicite seu orçamento',
  description: 'Sistema desktop para agências de viagens. 100% offline, controle de clientes, pagamentos e relatórios. Entre em contato pelo WhatsApp.',
  keywords: ['gestão de viagens', 'agência de turismo', 'desktop', 'offline'],
  openGraph: {
    title: 'GestorTrip — Sistema de Gestão de Viagens',
    description: 'Aplicação desktop para gerenciamento de viagens corporativas com arquitetura offline-first.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
