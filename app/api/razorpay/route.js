import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { amount } = await req.json();

    // Initialize Razorpay (We will add these keys to your .env file later)
    const razorpay = new Razorpay({
      key_id: "rzp_test_Ssh07Cpt50OJvT" || 'rzp_test_dummy_key', 
      key_secret: "8gm9nlq50ZUjVeabbNizUmJA" || 'dummy_secret',
    });

    // Create an order in Razorpay's system
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay calculates in paise, so multiply by 100
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}