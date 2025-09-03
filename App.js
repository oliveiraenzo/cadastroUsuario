import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  // Define os estados para o nome, telefone, email e senha
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  // Função para verificar se o código é > 0
  function verificarCodigo() {
    if (codigo.length == 0) {
      Alert.alert("Por favor, preencha o código.");
      return false;
    }
    return true;
  }

  // Função para ver se tem o nome
  function verificarNome() {
    if (nome.length == 0) {
      Alert.alert("Por favor, preencha o nome.");
      return false;
    }
    return true;
  }

  // Função para verificar se o email é valido usando regex
  function verificarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      Alert.alert("Por favor, preencha um email válido.");
      return false;
    }
    return true;
  }

  // Função para verificar se a senha tem ao menos 1 caractere maiúsculo, 1 numero e ao menos 5 digitos
  function verificarSenha() {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/;
    if (!regex.test(senha)) {
      Alert.alert("A senha deve ter pelo menos 5 caracteres, 1 letra maiúscula e 1 número.");
      return false;
    }
    return true;
  }

  // Função para verificar se a confirmação da senha é igual à senha
  function verificarConfirmaSenha() {
    if (confirmaSenha !== senha) {
      Alert.alert("A confirmação da senha não coincide com a senha.");
      return false;
    }
    return true;
  }

  function validar() {
    if (verificarCodigo() &&
        verificarNome() &&
        verificarEmail() &&
        verificarSenha() &&
        verificarConfirmaSenha()) {
      return true;
    }
    return false;
  }

  // Função para limpar os campos
  function limpar() {
    setNome("");
    setCodigo("");
    setEmail("");
    setSenha("");
    setConfirmaSenha("");
  }

  // Função assíncrona para salvar um usuario
  async function salvar() {
    if (validar()) {
      // Cria um objeto com os dados do usuario
      let objusuario = {
        nome: nome,
        codigo: codigo,
        email: email,
        senha: senha,
      };

      // Converte o objeto para uma string JSON
      const stringJson = JSON.stringify(objusuario);

      // Salva a string JSON no AsyncStorage com a chave "@usuario"
      await AsyncStorage.setItem("@usuario", stringJson);
      Alert.alert("Salvo com sucesso!!!"); // Exibe um alerta de sucesso
    }
  }

  // Função assíncrona para carregar um usuario salvo
  async function carregar() {
    // Carrega a string JSON do AsyncStorage com a chave "@usuario"
    const conteudoJson = await AsyncStorage.getItem("@usuario");

    // Verifica se há dados salvos
    if (conteudoJson != null) {
      // Converte a string JSON de volta para um objeto
      const objusuario = JSON.parse(conteudoJson);

      // Define os estados de nome e telefone com os dados carregados
      setNome(objusuario.nome);
      setCodigo(objusuario.codigo);
      setEmail(objusuario.email);
      setSenha(objusuario.senha);
      setConfirmaSenha(objusuario.senha); // Preenche a confirmação de senha também
    } else {
      // Exibe um alerta se não houver dados cadastrados
      Alert.alert("Nenhum dado encontrado.");
    }
  }

  // Renderiza a interface do usuário
  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Cadastro de Usuário</Text>

      {/* Área de cadastro de usuarios  */}
      <View style={styles.areaCadastro}>
        <View style={styles.areaCodigo}>
          <Text style={styles.texto}>Codigo:</Text>
          <TextInput
            style={styles.campoCodigo}
            onChangeText={setCodigo} // Atualiza o estado do codigo quando o texto muda
            value={codigo} // Define o valor do campo como o estado do codigo
            keyboardType="numeric"
          />
        </View>

        <View style={styles.areaNome}>
          <Text style={styles.texto}>Nome:</Text>
          <TextInput
            style={styles.campoNome}
            onChangeText={setNome} // Atualiza o estado do nome quando o texto muda
            value={nome} // Define o valor do campo como o estado do nome
          />
        </View>

        <View style={styles.areaEmail}>
          <Text style={styles.texto}>Email:</Text>
          <TextInput
            style={styles.campoEmail}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.areaSenha}>
          <Text style={styles.texto}>Senha:</Text>
          <TextInput
            style={styles.campoSenha}
            onChangeText={setSenha}
            value={senha}
            secureTextEntry
          />
        </View>

        <View style={styles.areaConfirmaSenha}>
          <Text style={styles.texto}>Confirma Senha:</Text>
          <TextInput
            style={styles.campoSenha}
            onChangeText={setConfirmaSenha}
            value={confirmaSenha}
            secureTextEntry
          />
        </View>


        {/* Área de botões */}
        <View style={styles.areaBotoes}>
          <TouchableOpacity style={styles.botao} onPress={salvar}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={carregar}>
            <Text style={styles.textoBotao}>Carregar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={limpar}>
            <Text style={styles.textoBotao}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de status */}
        <StatusBar style="auto" />
      </View>
      {/* Fecha a View de areaCadastro */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz o container ocupar toda a tela
    backgroundColor: '#f0f0f0', // Define a cor de fundo
    alignItems: 'center', // Centraliza os itens horizontalmente
    justifyContent: 'center', // Centraliza os itens verticalmente
    padding: 20, // Adiciona um espaçamento interno
  },
  tituloPrincipal: {
    fontSize: 24, // Define o tamanho da fonte
    fontWeight: 'bold', // Deixa o texto em negrito
    marginBottom: 20, // Adiciona uma margem na parte inferior
  },
  areaCadastro: {
    width: '100%', // Faz a área ocupar 100% da largura
    alignItems: 'center', // Centraliza os itens horizontalmente
  },
  areaCodigo: {
    flexDirection: 'row', // Alinha os itens em linha (lado a lado)
    alignItems: 'center', // Alinha os itens verticalmente ao centro
    marginBottom: 10, // Adiciona uma margem na parte inferior
  },
  texto: {
    fontSize: 16, // Define o tamanho da fonte
    marginRight: 10, // Adiciona uma margem à direita
    width: 80, // Define uma largura fixa para alinhar os campos
  },
  campoCodigo: {
    flex: 1, // Faz o campo ocupar o espaço restante na linha
    borderWidth: 1, // Adiciona uma borda
    borderColor: '#ccc', // Define a cor da borda
    padding: 10, // Adiciona um espaçamento interno
    borderRadius: 5, // Arredonda as bordas
    backgroundColor: '#fff', // Define a cor de fundo
  },
  areaNome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  campoNome: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  areaEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  campoEmail: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  areaSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  campoSenha: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  areaConfirmaSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  areaBotoes: {
    flexDirection: 'row', // Alinha os botões em linha
    justifyContent: 'space-around', // Distribui o espaço entre os botões
    width: '100%', // Faz a área ocupar 100% da largura
  },
  botao: {
    backgroundColor: '#007bff', // Define a cor de fundo do botão
    paddingVertical: 10, // Adiciona espaçamento vertical interno
    paddingHorizontal: 20, // Adiciona espaçamento horizontal interno
    borderRadius: 5, // Arredonda as bordas
  },
  textoBotao: {
    color: '#fff', // Define a cor do texto
    fontSize: 16, // Define o tamanho da fonte
    textAlign: 'center', // Centraliza o texto
  },
});
