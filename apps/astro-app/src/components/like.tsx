import { actions } from 'astro:actions';
import { withState } from '@astrojs/react/actions';
import { useActionState } from "react";

export function LikeComponent({ postId }: { postId: string }) {
  const [state, action, pending] = useActionState(
    withState(actions.like),
    { data: 0, error: undefined }, // 初始点赞和错误
  );

  return (
    <form action={action}>
      <input type="hidden" name="postId" value={postId} />
      <button disabled={pending}>{state.data} ❤️</button>
    </form>
  );
}