'use client';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/verify-email/verify');
  return null;
}