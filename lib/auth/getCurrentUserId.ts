export async function getCurrentUserId(): Promise<string> {
  const userId = process.env.SEED_USER_ID;
  if (!userId) {
    throw new Error('缺少 SEED_USER_ID 环境变量，请先在 .env.local 里配置一个占位用户ID');
  }
  return userId;
}