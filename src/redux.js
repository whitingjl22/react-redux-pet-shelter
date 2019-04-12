import { createStore } from "redux"

//ACTIONS
export const retrieveProducts = () => ({
  type: "RETRIEVE_PRODUCTS"
})
export const deletePet = (id) => ({
  type: "DELETE_PET",
  id
})
export const deleteQuote = (quoteId, authorId) => ({
  type: "DELETE_QUOTE",
  quoteId,
  authorId
})
export const createPet = (newPet) => ({
  type: "CREATE_PET",
  newPet
})
export const createQuote = (newQuote) => ({
  type: "CREATE_QUOTE",
  newQuote
})
export const updatePet = (id, updatedPet) => ({
  type: "UPDATE_PET",
  id,
  updatedPet
})

///REDUCERS
export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "RETRIEVE_PRODUCTS":
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- RETRIEVE_PRODUCTS | state: ", state)
      console.log(" -- REDUCER -- RETRIEVE_PRODUCTS | action", action)
      return state.products

    case "DELETE_PET":
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- DELETE_PET | state: ", state)
      console.log(" -- REDUCER -- DELETE_PET | action", action)
      let deleteIndex = state.pets.findIndex((obj) => obj["id"] === action.id)
      return {
        ...state,
        pets: [...state.pets.slice(0, deleteIndex), ...state.pets.slice(deleteIndex + 1)]
      }

    case "DELETE_QUOTE": // Nested Object
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- DELETE_QUOTE | state: ", state)
      console.log(" -- REDUCER -- DELETE_QUOTE | action", action)

      return {
        ...state,
        authors: [
          ...state.authors.map((author) => {
            console.log("AUTHOR/QUOTE CHECK: ", author.id, action.authorId)
            if (author.id === action.authorId) {
              console.log("AUTHOR/QUOTE FOUND: ", author.id, action.authorId)

              let deleteIndex = author.quotes.findIndex((obj) => obj["id"] === action.id)

              console.log("delete index: ", deleteIndex)
              if (deleteIndex >= 0) {
                return {
                  ...author,
                  quotes: [...author.quotes.slice(0, deleteIndex), ...author.quotes.slice(deleteIndex + 1)]
                }
              }
            }
            return author
          })
        ]
      }
    // 	...state,
    // 	products: [...state.products.slice(0, deleteIndex), ...state.products.slice(deleteIndex + 1)]
    // }

    case "CREATE_PET":
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- CREATE_PET | state: ", state)
      console.log(" -- REDUCER -- CREATE_PET | action", action)
      console.log(" -- REDUCER -- CREATE_PET | id ", id)
      id++
      return {
        ...state,
        pets: [
          ...state.pets,
          {
            id,
            name: action.newPet.name,
            type: action.newPet.type,
            description: action.newPet.description,
            likes: 0,
            skill_1: action.newPet.skill_1,
            skill_2: action.newPet.skill_2,
            skill_3: action.newPet.skill_3
          }
        ]
      }

    case "CREATE_QUOTE": // Nested Object
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- CREATE_QUOTE | state: ", state)
      console.log(" -- REDUCER -- CREATE_QUOTE | action", action)
      console.log(" -- REDUCER -- CREATE_QUOTE | id ", id)
      id++
      return {
        ...state,
        authors: [
          ...state.authors.map((author) => {
            console.log("AUTHOR CHECK: ", author.id, action.newQuote.id)
            if (author.id === action.newQuote.id) {
              console.log("AUTHOR FOUND: ", author.id, action.newQuote.id)
              return {
                ...author,
                quotes: [
                  ...author.quotes,
                  {
                    id,
                    quote: action.newQuote.quote,
                    votes: 0
                  }
                ]
              }
            }
            return author
          })
        ]
      }

    case "UPDATE_PET":
      console.log(" -- REDUCER -- UPDATE_PET | state: ", state)
      console.log(" -- REDUCER -- UPDATE_PET | action", action)
      return {
        ...state,
        pets: state.pets.map((pet) => {
          if (pet.id === action.id) {
            return {
              ...pet,
              name: action.updatedPet.name,
              type: action.updatedPet.type,
              description: action.updatedPet.description,
              skill_1: action.updatedPet.skill_1,
              skill_2: action.updatedPet.skill_2,
              skill_3: action.updatedPet.skill_3
            }
          }
          return pet
        })
      }

    default:
      return state
  }
}

// Initial State
let id = 2
const initialState = {
  pets: [
    {
      id: 1,
      name: "Snoopy",
      type: "Dog",
      description: "Fun and friendly",
      skill_1: "Run fast.",
      skill_2: "Swim far.",
      skill_3: "Good listener.",
      likes: 5
    },
    {
      id: 2,
      name: "Kermit",
      type: "Frog",
      description: "Green and outgoing",
      skill_1: "Eat a lot.",
      skill_2: "Good singer.",
      skill_3: "Excellent at catching flys.",
      likes: 10
    }
  ]
}

// STORE -- store.js
export function configureStore(initialState = initialState) {
  const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  console.log(store)
  return store
}

export const store = configureStore()
