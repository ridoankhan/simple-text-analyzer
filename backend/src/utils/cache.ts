import redisClient from '../config/redis'

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redisClient.get(key)
  return data ? (JSON.parse(data) as T) : null
}

export async function setCache(
  key: string,
  value: any,
  ttlSeconds = 3600
): Promise<void> {
  await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds })
}

export async function delCache(keys: string | string[]): Promise<void> {
  if (Array.isArray(keys)) {
    await redisClient.del(...keys)
  } else {
    await redisClient.del(keys)
  }
}
