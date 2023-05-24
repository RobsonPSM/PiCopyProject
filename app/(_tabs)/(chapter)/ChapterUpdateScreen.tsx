import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { updateChapter, getChapterById } from '../../../core/services/ChapterService';
import { Chapter } from '../../../models/ChapterInterface';

const ChapterUpdateScreen = () => {
  const [chapterId, setChapterId] = useState(0);
  const [chapterData, setChapterData] = useState<Chapter>({
    id: 0,
    nome: '',
    descricao: '',
    status: 0,
    usuarioId: '',
  });

  const handleGetChapter = async () => {
    try {
      const chapter = await getChapterById(chapterId);
      setChapterData(chapter);
    } catch (error) {
      console.error('Error buscando chapter:', error);
    }
  };

  const handleUpdateChapter = async () => {
    try {
      await updateChapter(chapterData);
      console.log('Chapter atualizado');
      // Adicione aqui a lógica adicional após a atualização bem-sucedida do capítulo
    } catch (error) {
      console.error('Erro atualizando chapter:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o ID do capítulo"
        keyboardType="numeric"
        value={chapterId.toString()}
        onChangeText={(text) => setChapterId(Number(text))}
      />
      <Button title="Buscar Capítulo" onPress={handleGetChapter} />
      {chapterData.id !== 0 && (
        <>
          <TextInput placeholder='Digite o novo nome do chapter.'
            style={styles.input}
            value={chapterData.nome}
            onChangeText={(text) => setChapterData({ ...chapterData, nome: text })}
          />
          <TextInput placeholder='Digite a nova descrição do chapter.'
            style={styles.input}
            value={chapterData.descricao}
            onChangeText={(text) => setChapterData({ ...chapterData, descricao: text })}
          />
          <Button title="Atualizar" onPress={handleUpdateChapter} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ChapterUpdateScreen;