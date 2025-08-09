import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

export default async function CheckoutPage() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  let total = 0
  if (cartId) {
    const cart = await prisma.cart.findUnique({ where: { id: cartId }, include: { items: true } })
    total = cart?.items.reduce((s, i) => s + i.priceAtAdd * i.quantity, 0) ?? 0
  }

  async function createOrder() {
    'use server'
    const cookieStore = await cookies()
    const cartId = cookieStore.get('cart_id')?.value
    if (!cartId) return { ok: false }
    const cart = await prisma.cart.findUnique({ where: { id: cartId }, include: { items: true } })
    if (!cart || cart.items.length === 0) return { ok: false }
    const order = await prisma.order.create({
      data: {
        email: 'guest@example.com',
        status: 'PENDING',
        subtotal: cart.items.reduce((s, i) => s + i.priceAtAdd * i.quantity, 0),
        grandTotal: cart.items.reduce((s, i) => s + i.priceAtAdd * i.quantity, 0),
        provider: 'paypal',
        currency: 'MAD'
      }
    })
    return { ok: true, id: order.id, total: order.grandTotal }
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Total: {(total/100).toFixed(2)} MAD</p>
      <form action={createOrder}>
        <button className="bg-brand text-white px-4 py-2 rounded-lg">Create Order</button>
      </form>
      <p className="text-sm text-gray-500">Next step: client adds PayPal button to approve & capture using our API endpoints.</p>
    </section>
  )
}
