import { createServerFn } from '@tanstack/react-start'
import supabase from './client'
import type { LeaderboardEntry } from './types'
import { z } from 'zod'

const TOP_SCORES_LIMIT = 5

export const submitScore = createServerFn({ method: 'POST' })
  .validator(z.object({
    username: z.string(),
    score: z.number()
  }))
  .handler(async ({ data }) => {
    try {
      const { data: result, error } = await supabase
        .from('leaderboard')
        .insert({
          username: data.username,
          score: data.score
        })
        .select()
        .single()

      if (error) throw error
      console.log('Score submitted successfully:', result)
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting score:', error)
      return { success: false, error: 'Failed to submit score' }
    }
  })

export const getLeaderboard = createServerFn({ method: 'GET' })
  .handler(async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('username, score, created_at')
        .order('score', { ascending: false })
        .limit(TOP_SCORES_LIMIT)

      if (error) throw error
      console.log('Leaderboard fetched successfully:', data)
      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error fetching top scores:', error)
      return { success: false, error: 'Failed to fetch leaderboard' }
    }
  })

  export const getUserBest = createServerFn({ method: 'GET' })
  .validator(z.object({
    username: z.string()
  }))
  .handler(async ({ data }) => {
    try {
      const { data: result, error } = await supabase
        .from('leaderboard')
        .select('username, score, created_at')
        .eq('username', data.username)
        .order('score', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
      console.log('User best fetched successfully:', result)
      return { success: true, data: result || null }
    } catch (error) {
      console.error('Error fetching user best:', error)
      return { success: false, error: 'Failed to fetch personal best' }
    }
  })