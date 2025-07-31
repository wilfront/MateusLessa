'use client';

import { motion } from 'framer-motion';
import './biografia.css';

export default function BiografiaPage() {
  return (
    <main className="biografia-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Biografia
      </motion.h1>

      <div className="bio-container">
        <motion.div
          className="bio-conteudo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            <strong>Mateus Lessa</strong> Cantor, músico e compositor. Essa é a definição do artista sertanejo Mateus Lessa. O autodidata da cidade de Bauru/SP que toca violão, viola, guitarra, bateria, baixo e sanfona, chegou ao mercado fonográfico com notoriedade: Mateus é o responsável por dar o tom a diversas canções sertanejas que fazem sucesso nas paradas de todo o País. Com uma estreia surpreendente, o jovem tem orgulho da sua trajetória como músico.
            Mateus, que já cantou na Folia de Reis com seu pai, saiu de casa aos nove anos de idade para trilhar sua carreira ao lado de seus irmãos com quem formava uma banda. O artista, que também já fez dupla sertaneja com um amigo, deu início a sua carreira solo aos 18 anos. Hoje, carrega em sua bagagem mais de 150 composições originais. Preservando sua origem e raízes simples, Mateus Lessa segue com a bagagem de quem domina a arte de compor, tocar e cantar, conquistando cada vez mais seu espaço, sempre com muito carisma e seu jeito humilde de ser.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
