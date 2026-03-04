const { webcrypto } = require("crypto");
const crypto = require("crypto");


(async () => {

    const data = new TextEncoder().encode("Hello Web Crypto");
    const hashBuffer = await webcrypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log("SHA-256 Hash:", hashHex);
    const secret = new TextEncoder().encode("mySecretKey");
  const key = await webcrypto.subtle.importKey(
    'raw',
    secret,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const hmacBuffer = await webcrypto.subtle.sign('HMAC', key, data);
  const hmacArray = Array.from(new Uint8Array(hmacBuffer));
  const hmacHex = hmacArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log("HMAC Signature:", hmacHex);

  // 3️⃣ AES-GCM Encryption / Decryption
  const aesKey = await webcrypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = crypto.randomBytes(12); // initialization vector
  const encryptedBuffer = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    data
  );
  console.log("Encrypted (hex):", Buffer.from(encryptedBuffer).toString('hex'));

  const decryptedBuffer = await webcrypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    encryptedBuffer
  );
  console.log("Decrypted text:", new TextDecoder().decode(decryptedBuffer));

}) ();