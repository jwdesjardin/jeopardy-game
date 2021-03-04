// answer object that i will be creating 
export interface Answer {
  id: number,
  response: string,
  correct: boolean
  value: number
  categoryIndex: number
  questionIndex: number
  answered_by: string
}

// data coming in from api
export interface Clue {
  id: number,
  answer: string,
  question: string,
  value: number, 
  airdate: srting,
  category_id: number,
  game_id: number | null,
  invalid_count: number | null
}


export interface Category {
  id: number,
  title: string,
  clues_count: number | null
  clues: Clue[]
}

export interface Game {
  categories: Category[]
  answers: Answer[]
}

export interface GameClue {
  clue: Clue,
  interval: NodeJS.Timeout | undefined
  location: {
    category: number,
    question: number
  }
}


