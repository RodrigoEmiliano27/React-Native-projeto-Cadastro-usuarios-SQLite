import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, 
  TouchableOpacity, Keyboard,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from "./styles";
import CampoSenha from './componentes/CampoSenha';

import {
  createTable,
  obtemTodosContatos,
  adicionaContato,
  alteraContato,
  excluiContato,
  excluiTodosContatos,
  getTotal
} from './services/dbservice';
export default function App() {

  {/*  useState renderiza a tela mediante alteração na variavel */}

  {/*  icones podem ser encontrados aqui: https://icons.expo.fyi/Index */}
  
  const [codigo,setCodigo] = useState("")
  const [nome,setNome] = useState("")
  const [email,setEmail] = useState("")
  const [senha,setSenha] = useState("")
  const [confirmarSenha,setConfirmarSenha] = useState("")
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [isPasswordConfVisible, setisPasswordConfVisible] = useState(true)
  const [contatos, setContatos] = useState([]);
  const [total, setTotal] = useState(0);
  let tabelasCriadas = false;


  useEffect(() => {
     console.log('useeffect processado!');
     if (!tabelasCriadas)
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...

      VerificarTotal();
   }, [])


   async function VerificarTotal()
   {
      setTotal(await getTotal())
   }
   async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log("Verificando necessidade de criar tabelas...");
      tabelasCriadas = true;
      await createTable();
    }

    console.log("UseEffect...");
    await carregaDados();
    
  }
  
   function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function  carregaDados() {
    try {      
        let contatos = await obtemTodosContatos()
        setContatos(contatos);      
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function efetivaExclusao() {
    try {
      await excluiTodosContatos();
      await carregaDados();
    }
    catch (e) {
      Alert.alert(e);
    }
  }

  function removerElemento() {

    if(Number.parseInt(codigo)<=0)
    {
      Alert.alert("Codigo inválido!")
      return
    }
    Alert.alert('efetivaRemoverContato ' + codigo);

    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverContato(codigo),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverContato(identificador) {
    try {
      
      await excluiContato(identificador);
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
      Alert.alert('Contato apagado com sucesso!!!');
      setTotal(await getTotal())
    } catch (e) {
      Alert.alert(e);
    }
  }

  function editar(identificador) {
    const contato = contatos.find(contato => contato.id == identificador);

    if (contato != undefined) {
      setId(contato.id);
      setNome(contato.nome);
      setTelefone(contato.telefone);
    }

    console.log(contato);
  }

  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  function ValidaDados()
  {
    if(Number.parseInt(codigo)<=0)
    {
      Alert.alert("O codigo tem que ser maior que zero!!")
      return false;
    }

    if(nome==="")
    {
      Alert.alert("o nome não pode ser vazio!")
      return false;
    }
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

    if(!email.match(pattern))
    {
      Alert.alert("email invalido")
      return false;
    }

    if(!(senha===confirmarSenha))
    {
      Alert.alert("Senhas não são iguais!")
      return false;
    }
    if(!containsUppercase(senha))
    {
      Alert.alert("A senha deve conter ao menos uma letra maiúscula!")
      return false;
    }
    if(!hasNumber(senha))
    {
      Alert.alert("A senha deve conter ao menos um número!")
      return false;
    }
    if(senha.length<5)
    {
      Alert.alert("A senha deve conter pelo menos 5 caracteres!")
      returnfalse;
    }


    return true;
  }

  async function salvaDados() {
    let index = contatos.findIndex(c => c.id === codigo);
    let novoRegistro = true;

    if(index>=0)
      novoRegistro=false;

    let obj = {
      id: codigo,
      nome: nome,
      email: email,
      senha: senha
    };

    if(ValidaDados()===false)
      return;

    try {

      if (novoRegistro) {
        let resposta = (await adicionaContato(obj));

        if (resposta)
          Alert.alert('adicionado com sucesso!');
        else
          Alert.alert('Falhou miseravelmente!');
      }
      else {      
        let resposta = await alteraContato(obj);
        if (resposta)
          Alert.alert('Alterado com sucesso!');
        else
          Alert.alert('Falhou miseravelmente!');
      }
      
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e);
    }
  }

  
  function editar(identificador) {
    const contato = contatos.find(contato => contato.id == identificador);

    if (contato) {
      setCodigo(contato.id);
      setNome(contato.nome);
      setEmail(contato.email);
      setSenha(contato.senha)
      setConfirmarSenha(contato.confirmarSenha)
    }

    console.log(contato);
  }


  async function limparCampos() {
    setCodigo("");
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("")
    Keyboard.dismiss();
  }

  function apagarTudo() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os contatos?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            efetivaExclusaoTodosRegistros();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }
  function carregarUsuarios()
  {

    console.log("Carregar usuarios!")
    console.log(Number.parseInt(codigo))
    console.log(contatos)
    console.log("pesquisa feita")
     // Use the filter method to search for objects with the desired ID
    const matchingObjects = contatos.filter((obj) => obj.id === codigo);
    if(matchingObjects.length>0)
    {
      setNome(matchingObjects[0].nome)
      setEmail(matchingObjects[0].email)
      setSenha(matchingObjects[0].senha)
      Alert.alert("Usuário encontrado!")
    }
    else
      Alert.alert("Usuário não encontrado!")
    Keyboard.dismiss();
    

  }

  function btnMostraSenha()
  {
    console.log("apertou senha")
    setIsPasswordVisible(!isPasswordVisible)
    console.log(isPasswordVisible)

  }
  function btnMostraConfiSenha()
  {
    console.log("apertou senha")
    setisPasswordConfVisible(!isPasswordConfVisible)

  }

 

  return (
    <View style={styles.container}>
      <View style={[styles.containerTitulo,styles.sombra]}>
        <Text style={styles.titulo}>Cadastro de usuários</Text>
      </View>
      <View style={styles.containerCampoTexto}>
        <Text style={styles.legenda}>Código</Text>
        <TextInput 
          style={styles.caixaTexto}
          keyboardType='decimal-pad'
          onChangeText={(texto)=> setCodigo(texto)}
          value={codigo}
        >
        </TextInput>
      </View>

      <View style={styles.containerCampoTexto}>
        <Text style={styles.legenda}>Nome</Text>
        <TextInput 
          style={styles.caixaTexto}
          keyboardType='ascii-capable'
          onChangeText={(texto)=> setNome(texto)}
          value={nome}
        >
        </TextInput>
      </View>

      <View style={styles.containerCampoTexto}>
        <Text style={styles.legenda}>Email</Text>
        <TextInput 
          style={styles.caixaTexto}
          keyboardType='ascii-capable'
          onChangeText={(texto)=> setEmail(texto)}
          value={email}
        >
        </TextInput>
      </View>


      
      <View style={styles.containerRow}>
        <CampoSenha titulo='Senha' funcaoMostrarSenha={btnMostraSenha} senha={senha} 
          atualizaSenha={(texto)=>setSenha(texto)} isPasswordVisible={isPasswordVisible} />
        <CampoSenha titulo='Confirmar Senha' funcaoMostrarSenha={btnMostraConfiSenha} senha={confirmarSenha} 
          atualizaSenha={(texto)=>setConfirmarSenha(texto)} isPasswordVisible={isPasswordConfVisible} />      
      </View>

      <View style={styles.containerRow}>
        <TouchableOpacity style={[styles.botao,styles.sombra]} onPress={() => salvaDados()}> 
          <Text style={styles.legenda}>Salvar</Text>       
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao,styles.sombra]} onPress={() => carregarUsuarios()}> 
          <Text style={styles.legenda}>Carregar</Text>       
        </TouchableOpacity>
      </View>

      <View style={styles.containerRow}>
        <TouchableOpacity style={[styles.botao,styles.sombra]} onPress={() => apagarTudo()}> 
            <Text style={styles.legenda}>Limpar</Text>       
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao,styles.sombra]} onPress={() => removerElemento()}> 
          <Text style={styles.legenda}>Excluir usuário</Text>       
        </TouchableOpacity>
      </View>

      <Text style={styles.legendaResultado}>{"Total de registro(s) "+total}</Text>

      <StatusBar style="auto" />
    </View>
  );
}



