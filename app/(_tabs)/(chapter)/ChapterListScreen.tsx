import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fetchChapters, deleteChapter, updateChapter } from '../../../core/services/ChapterService';
import { Chapter } from '../../../models/ChapterInterface';

const ChapterListScreen = () => {
  const navigation = useNavigation();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editChapterName, setEditChapterName] = useState('');
  const [editChapterDescription, setEditChapterDescription] = useState('');

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    try {
      const chaptersData = await fetchChapters();
      setChapters(chaptersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateChapter = () => {
    navigation.navigate('ChapterCreate');
  };

  const handleEditChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setEditChapterName(chapter.nome);
    setEditChapterDescription(chapter.descricao);
    setEditModalVisible(true);
  };

  const handleUpdateChapter = async () => {
    if (selectedChapter) {
      const updatedChapter: Chapter = {
        ...selectedChapter,
        nome: editChapterName,
        descricao: editChapterDescription,
      };
      try {
        await updateChapter(updatedChapter);
        loadChapters();
        setEditModalVisible(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteChapter = async (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setConfirmationModalVisible(true);
  };

  const confirmDeleteChapter = async () => {
    if (selectedChapter) {
      try {
        await deleteChapter(selectedChapter.id);
        loadChapters();
      } catch (error) {
        console.error(error);
      }
    }
    setConfirmationModalVisible(false);
  };

  const cancelDeleteChapter = () => {
    setSelectedChapter(null);
    setConfirmationModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={handleCreateChapter}>
        <Text style={styles.createButton}>Criar Capítulo</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {chapters.map((chapter) => (
          <View key={chapter.id} style={styles.card}>
            <Text style={styles.title}>Nome: {chapter.nome}</Text>
            <Text style={styles.description}>Descrição: {chapter.descricao}</Text>
            <TouchableOpacity onPress={() => handleEditChapter(chapter)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteChapter(chapter)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal visible={isConfirmationModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja excluir o capítulo "{selectedChapter?.nome}"?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={confirmDeleteChapter}>
                <Text style={styles.confirmButton}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelDeleteChapter}>
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isEditModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Editar Capítulo</Text>
            <TextInput
              value={editChapterName}
              onChangeText={setEditChapterName}
              placeholder="Nome"
              style={styles.input}
            />
            <TextInput
              value={editChapterDescription}
              onChangeText={setEditChapterDescription}
              placeholder="Descrição"
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleUpdateChapter}>
                <Text style={styles.confirmButton}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleCreateChapter}>
        <Text style={styles.createButton}>Criar Capítulo</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    color: 'green',
    fontWeight: 'bold',
    marginRight: 16,
  },
  cancelButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  editButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  createButton: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default ChapterListScreen;