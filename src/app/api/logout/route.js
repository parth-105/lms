import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(request) {
  cookies().delete('e-learninigtoken'); 
  return NextResponse.json({ message: 'Cookie deleted' });
}
