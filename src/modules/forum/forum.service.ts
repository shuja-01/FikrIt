import { prisma } from '@/core/db';

export class ForumService {
  /**
   * Retrieves the top questions ordered by upvotes
   */
  static async getTopQuestions(take: number = 10) {
    try {
      return await prisma.question.findMany({
        take,
        orderBy: { upvotes: 'desc' },
        include: {
          author: { select: { name: true, image: true, badges: true } },
          _count: { select: { answers: true } },
        },
      });
    } catch (error) {
      console.error("ForumService.getTopQuestions error:", error);
      throw new Error("Failed to retrieve top questions.");
    }
  }

  /**
   * Creates a new question in the forum
   */
  static async createQuestion(data: { title: string; content: string; tags: string[]; authorId: string }) {
    return await prisma.question.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags,
        authorId: data.authorId,
      },
    });
  }

  /**
   * Retrieves a single question with its answers
   */
  static async getQuestionById(id: string) {
    return await prisma.question.findUnique({
      where: { id },
      include: {
        author: true,
        answers: {
          include: { author: true },
          orderBy: { upvotes: 'desc' },
        },
      },
    });
  }
}
