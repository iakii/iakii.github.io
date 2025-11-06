import { defineAction, type SafeResult } from 'astro:actions';
import { z } from 'astro:schema';
import { getActionState } from '@astrojs/react/actions';

export const server = {
  like: defineAction({
    input: z.object({
      postId: z.string(),
    }),
    handler: async ({ postId }, ctx) => {
      const { data: currentLikes = 0, error } = await getActionState<SafeResult<any, number>>(ctx);

      // 处理错误
      if (error) throw error;

      // 写入数据库
      return currentLikes + 1;
    },
  })
};