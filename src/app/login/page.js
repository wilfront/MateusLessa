'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'
import supabase from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import './login.css'

const inputVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

const buttonHover = {
  scale: 1.05,
  boxShadow: '0 0 8px rgba(0, 123, 255, 0.8)'
}

const errorVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()

    const { data: usuarioDb, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('usuario', usuario)
      .single()

    if (error || !usuarioDb) {
      return setErro('Usuário não encontrado')
    }

    const senhaOk = await bcrypt.compare(senha, usuarioDb.senha)
    if (!senhaOk) {
      return setErro('Senha incorreta')
    }

    localStorage.setItem('logado', 'true')
    router.push('/dashboard')
  }

  return (
    <motion.div 
      className='login'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleLogin}>
        <motion.input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Usuário"
          required
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.1 }}
        />
        <motion.input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.3 }}
        />
        <AnimatePresence>
          {erro && (
            <motion.p
              key="erro"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ color: 'red', marginTop: '10px' }}
            >
              {erro}
            </motion.p>
          )}
        </AnimatePresence>
        <motion.button
          type="submit"
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: '15px' }}
        >
          Entrar
        </motion.button>
      </form>
    </motion.div>
  )
}
