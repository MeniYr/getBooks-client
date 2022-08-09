import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { API_URL, BOOKS } from "../../constants/globalinfo/URL`S"


import { doApiGet, doApiMethod, TOKEN_NAME, USER_PROP } from "../../services/apiService"



export const addBook = createAsyncThunk(
    'books/addBook', async (_dataBody) => {
        try {
            let data = await (await doApiMethod(`${BOOKS}/add`, "POST", _dataBody)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)
export const getBooks = createAsyncThunk(
    'books/getBooks', async () => {
        try {
            let data = await (await doApiGet(BOOKS)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)


const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        userBooks: [],
        currentBook: null,
        bookJustLoaded: null,
        status: "idle",
        error: null
    },

    reducers: {
        myBooks: (state, action) => {
            const user_ID = action.payload
            if (user_ID) {
                state.userBooks = state.books.filter(item =>
                    item.userID?._id === user_ID
                )
            }
            else{
                state.userBooks = []
            }

        }
    },


    extraReducers(builder) {
        builder

            .addCase(addBook.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })

            .addCase(addBook.fulfilled, (state, action) => {

                if (action.payload) {
                    state.status = 'succeeded';
                    state.error = null;
                    state.books.push(action.payload)
                    state.bookJustLoaded = action.payload

                    console.log(action.payload)
                    console.log(state.status)
                }
            })

            .addCase(addBook.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })

            .addCase(getBooks.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)

            })

            .addCase(getBooks.fulfilled, (state, action) => {

                if (action.payload) {
                    state.status = 'succeeded';
                    state.error = null;
                    state.books = action.payload

                    console.log(action.payload)
                    console.log(state.status)

                }
            })

            .addCase(getBooks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })


    }
})


export const bookStatus = (state) => state.books.status
export const getAllBooks = (state) => state.books.books
export const getMyBooks = (state) => state.books.userBooks

export const { myBooks } = booksSlice.actions
export default booksSlice.reducer;