import { create } from "zustand"
import type { Equipment, Enemy, ChestReward } from "./game-data"

interface GameState {
  // Player stats
  coins: number
  experience: number
  level: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number

  // Equipment
  equippedWeapon: Equipment | null
  equippedArmor: Equipment | null
  inventory: Equipment[]

  // Game state
  gamePhase: "journey" | "shop" | "battle" | "victory" | "defeat"
  currentEnemy: Enemy | null
  enemyHealth: number
  claimedChests: string[]
  isMoving: boolean
  scrollProgress: number

  // Actions
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  addExperience: (amount: number) => void
  equipItem: (item: Equipment) => void
  buyItem: (item: Equipment) => boolean
  claimChest: (chestId: string, reward: ChestReward) => void
  setGamePhase: (phase: GameState["gamePhase"]) => void
  startBattle: (enemy: Enemy) => void
  takeDamage: (damage: number) => void
  dealDamage: (damage: number) => void
  resetGame: () => void
  setIsMoving: (moving: boolean) => void
  setScrollProgress: (progress: number) => void
}

const initialState = {
  coins: 0,
  experience: 0,
  level: 1,
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  equippedWeapon: null,
  equippedArmor: null,
  inventory: [],
  gamePhase: "journey" as const,
  currentEnemy: null,
  enemyHealth: 0,
  claimedChests: [],
  isMoving: false,
  scrollProgress: 0,
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

  spendCoins: (amount) => {
    const state = get()
    if (state.coins >= amount) {
      set({ coins: state.coins - amount })
      return true
    }
    return false
  },

  addExperience: (amount) =>
    set((state) => {
      const newExp = state.experience + amount
      const newLevel = Math.floor(newExp / 100) + 1
      const healthIncrease = newLevel > state.level ? 20 : 0
      const manaIncrease = newLevel > state.level ? 10 : 0

      return {
        experience: newExp,
        level: newLevel,
        maxHealth: state.maxHealth + healthIncrease,
        maxMana: state.maxMana + manaIncrease,
        health: Math.min(state.health + healthIncrease, state.maxHealth + healthIncrease),
        mana: Math.min(state.mana + manaIncrease, state.maxMana + manaIncrease),
      }
    }),

  equipItem: (item) =>
    set((state) => {
      if (item.type === "weapon") {
        return { equippedWeapon: item }
      } else if (item.type === "armor") {
        return { equippedArmor: item }
      }
      return state
    }),

  buyItem: (item) => {
    const state = get()
    if (state.coins >= item.price) {
      set({
        coins: state.coins - item.price,
        inventory: [...state.inventory, item],
      })
      return true
    }
    return false
  },

  claimChest: (chestId, reward) =>
    set((state) => {
      if (state.claimedChests.includes(chestId)) return state

      return {
        claimedChests: [...state.claimedChests, chestId],
        coins: state.coins + reward.coins,
        experience: state.experience + reward.experience,
      }
    }),

  setGamePhase: (phase) => set({ gamePhase: phase }),

  startBattle: (enemy) =>
    set({
      gamePhase: "battle",
      currentEnemy: enemy,
      enemyHealth: enemy.stats.health,
    }),

  takeDamage: (damage) =>
    set((state) => {
      const newHealth = Math.max(0, state.health - damage)
      return {
        health: newHealth,
        gamePhase: newHealth <= 0 ? "defeat" : state.gamePhase,
      }
    }),

  dealDamage: (damage) =>
    set((state) => {
      if (!state.currentEnemy) return state

      const newEnemyHealth = Math.max(0, state.enemyHealth - damage)
      return {
        enemyHealth: newEnemyHealth,
        gamePhase: newEnemyHealth <= 0 ? "victory" : state.gamePhase,
      }
    }),

  resetGame: () => set(initialState),

  setIsMoving: (moving) => set({ isMoving: moving }),

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}))
