import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createChapter } from '../../../core/services/ChapterService';
import { Chapter } from '../../../models/ChapterInterface';

const ChapterCreateScreen = () => {
  const [chapterData, setChapterData] = useState<Chapter>({
    id: 0,
    nome: '',
    descricao: '',
    status: 0,
    usuarioId: ''
  });

  const handleCreateChapter = async () => {
    if (!chapterData.nome || !chapterData.descricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    try {
      await createChapter(chapterData);
      console.log('Chapter criado com sucesso');
    } catch (error) {
      console.error('Erro criando o chapter:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={chapterData.nome}
        onChangeText={(text) => setChapterData({ ...chapterData, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={chapterData.descricao}
        onChangeText={(text) => setChapterData({ ...chapterData, descricao: text })}
      />
      <Button title="Criar Capítulo" onPress={handleCreateChapter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ChapterCreateScreen;