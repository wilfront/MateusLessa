import dotenv from 'dotenv'
import path from 'path'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

// Carrega variáveis do .env na raiz
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// Cria cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Função para criar usuário com senha criptografada
async function createUser(usuario, senha) {
  try {
    // Gera hash da senha
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(senha, salt)

    // Insere no banco
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ usuario, senha: hash }])

    // Verifica erro
    if (error) {
      console.error('Erro ao criar usuário:', error)
      return
    }

    console.log('Usuário criado com sucesso:', data)
  } catch (err) {
    console.error('Erro inesperado:', err)
  }
}

// Troque 'admin' e 'minhasenha123' pelo que quiser
createUser('admin', 'minhasenha123')
