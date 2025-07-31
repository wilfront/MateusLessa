import 'dotenv/config'; // lê o .env
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

async function testUpload() {
    const filePath = path.resolve('./teste.jpg'); // coloque uma imagem chamada teste.jpg na raiz
    const fileData = fs.readFileSync(filePath);

    const formData = new FormData();
    formData.append('file', new Blob([fileData]), 'teste.jpg');
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!res.ok) {
        const text = await res.text();
        console.error('Erro no upload:', text);
        return;
    }

    const data = await res.json();
    console.log('Upload OK! URL:', data.secure_url);
}

testUpload();
