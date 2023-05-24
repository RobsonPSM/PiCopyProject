import axios from 'axios';
import { Chapter } from '../../models/ChapterInterface';

const BASE_URL = 'http://academico3.rj.senac.br/api';

export const fetchChapters = async (): Promise<Chapter[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/Chapter`);
        return response.data;
    } catch (error) {
        throw new Error('Erro listando chapters');
    }
};

export const createChapter = async (chapterData: Chapter): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/Chapter`, chapterData);
    } catch (error) {
        throw new Error('Erro criando chapter');
    }
};

export const updateChapter = async (chapter: Chapter): Promise<void> => {
    try {
        await axios.put(`${BASE_URL}/Chapter/${chapter.id}`, chapter);
    } catch (error) {
        throw new Error('Erro atualizando chapter');
    }
};

export const getChapterById = async (chapterId: number): Promise<Chapter> => {
    try {
        const response = await axios.get(`${BASE_URL}/Chapter/${chapterId}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro encontrando chapter');
    }
};

export const deleteChapter = async (chapterId: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/Chapter/${chapterId}`);
    } catch (error) {
        throw new Error('Erro ao excluir chapter');
    }
};