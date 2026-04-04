'use server';

import { ForumService } from './forum.service';

/**
 * Controller Action for fetching top questions
 * Can be used directly in Server Components
 */
export async function fetchTopQuestionsAction(limit: number = 10) {
  try {
    const questions = await ForumService.getTopQuestions(limit);
    return { success: true, data: questions };
  } catch (error) {
    return { success: false, error: "Failed to fetch top questions." };
  }
}

/**
 * Controller Action for submitting a new question
 * Can be used by Client Components via form actions
 */
export async function submitQuestionAction(formData: FormData) {
  // In a real app, you would resolve authorId via NextAuth session
  // const session = await auth(); 
  // const authorId = session.user.id;
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const tagsString = formData.get('tags') as string;
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()) : [];
  
  // Dummy author id for compilation sake
  const dummyAuthorId = "dummy-auth-123";

  if (!title || !content) {
    return { success: false, error: "Title and content are required." };
  }

  try {
    const newQuestion = await ForumService.createQuestion({
      title,
      content,
      tags,
      authorId: dummyAuthorId,
    });
    return { success: true, data: newQuestion };
  } catch (error) {
    return { success: false, error: "Failed to submit question." };
  }
}
