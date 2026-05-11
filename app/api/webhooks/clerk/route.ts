import { createUser, deleteUser, updateUserCredits } from '@/lib/actions/user.actions';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET as string;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing WEBHOOK_SECRET environment variable' },
      { status: 500 },
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing Svix signature headers' }, { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  const { id } = event.data;
  const eventType = event.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = event.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      photo: image_url,
      firstName: first_name,
      lastName: last_name,
    };

    const newUser = await createUser(user);
    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 200 },
    );
  }
  if (eventType === 'user.updated') {
    const { image_url, first_name, last_name, username } = event.data;

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url,
    };

    if (!id) return new NextResponse('No ID provided', { status: 400 });
    await updateUserCredits(id, user);
    
    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  }

  if (eventType === 'user.deleted') {
    const { id } = event.data;
    if (!id) {
      return new NextResponse('Missing user ID', { status: 400 });
    }

    const deletedUser = await deleteUser(id);
    return NextResponse.json(
      { message: 'User deleted successfully', user: deletedUser },
      { status: 200 },
    );
  }

  return NextResponse.json({ message: 'Event type not handled' }, { status: 200 });
}
