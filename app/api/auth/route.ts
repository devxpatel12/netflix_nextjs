import ImageKit from "imagekit"
import { NextResponse } from "next/server";

console.log("Public Key:", process.env.NEXT_PUBLIC_PUBLIC_KEY);
console.log("Private Key:", process.env.PRIVATE_KEY);
console.log("URL Endpoint:", process.env.NEXT_PUBLIC_URL_ENDPOINT);

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET(request:Request) {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}