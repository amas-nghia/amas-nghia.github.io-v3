import { create } from "zustand"
import type { Equipment, Enemy, ChestReward } from "./game-data"

export interface GameState {
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

  // Game progress
  currentSection: string
  claimedChests: string[]
  isInBattle: boolean
  currentEnemy: Enemy | null
  enemyHealth: number

  // Game state
  gamePhase: "journey" | "shop" | "battle" | "victory" | "defeat"
  isMoving: boolean

  // Actions
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  addExperience: (amount: number) => void
  equipItem: (item: Equipment) => void
  addToInventory: (item: Equipment) => void
  claimChest: (chestId: string, reward: ChestReward) => void
  setCurrentSection: (section: string) => void
  startBattle: (enemy: Enemy) => void
  takeDamage: (damage: number) => void
  dealDamage: (damage: number) => void
  setGamePhase: (phase: GameState["gamePhase"]) => void
  setIsMoving: (moving: boolean) => void
  resetGame: () => void
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
  currentSection: "hero",
  claimedChests: [],
  isInBattle: false,
  currentEnemy: null,
  enemyHealth: 0,
  gamePhase: "journey" as const,
  isMoving: false,
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
      return {
        experience: newExp,
        level: newLevel,
        maxHealth: 100 + (newLevel - 1) * 20,
        maxMana: 50 + (newLevel - 1) * 10,
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

  addToInventory: (item) =>
    set((state) => ({
      inventory: [...state.inventory, item],
    })),

  claimChest: (chestId, reward) =>
    set((state) => ({
      claimedChests: [...state.claimedChests, chestId],
      coins: state.coins + reward.coins,
      experience: state.experience + reward.experience,
    })),

  setCurrentSection: (section) => set({ currentSection: section }),

  startBattle: (enemy) =>
    set({
      isInBattle: true,
      currentEnemy: enemy,
      enemyHealth: enemy.stats.health,
      gamePhase: "battle",
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
      const newEnemyHealth = Math.max(0, state.enemyHealth - damage)
      return {
        enemyHealth: newEnemyHealth,
        gamePhase: newEnemyHealth <= 0 ? "victory" : state.gamePhase,
      }
    }),

  setGamePhase: (phase) => set({ gamePhase: phase }),

  setIsMoving: (moving) => set({ isMoving: moving }),

  resetGame: () => set(initialState),
}))
